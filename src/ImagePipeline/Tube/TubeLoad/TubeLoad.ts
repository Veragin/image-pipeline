import { makeObservable, observable, runInAction } from 'mobx';

import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import { ImageCollection, TImageItem } from '../../ImageColection';
import { Tube } from '../Tube';
import { TubeLoadComp } from '../../TubeComponents/TubeLoadComp';
import { applyDeepPartial } from 'react-utils/basic/misc';
import { FileLoadSource, LoadSource, RemoteLoadSource } from './LoadSource';

export class TubeLoad extends Tube<TTubeLoadConfig> {
    id = 0;
    name = 'Load';
    readonly group = 'none';
    description = [
        _(
            'Load images into service. This tube cannot be removed, added more times and is the first tube in the pipeline.'
        ),
        _('Selected image file will be used as a preview.'),
        _('While you start the pipeline, all loaded files will be proccessed.'),
        _('!! Using image with high resolution as an preview will may slow down configuration !!'),
    ];
    icon = DriveFolderUploadRoundedIcon;
    comp = TubeLoadComp;

    sources: LoadSource[] = [];
    selectedIndex: null | number = null;
    previewCol: ImageCollection | null = null;

    constructor(private onStart: () => void) {
        super({
            source: [],
            numberOfImgsTogether: 0,
        });
        makeObservable(this, {
            sources: observable,
            previewCol: observable,
        });
    }

    do = async (imgCol: ImageCollection) => {};

    setConfig(config: DeepPartial<TTubeLoadConfig>) {
        this.config = applyDeepPartial(this.config, config);

        const source = config?.source?.filter((s) => !!s) as string[] | undefined;
        if (source && source.length > 0) {
            this.loadRemote(source);
            return;
        }

        this.switchPreview(0);
    }

    load = async (files: FileList | null) => {
        const newSources: LoadSource[] = [];
        if (files !== null) {
            for (let i = 0; i < files.length; i++) {
                newSources.push(new FileLoadSource(files[i]));
            }
        }

        runInAction(() => {
            this.config.source = [];
            this.sources = [...this.sources, ...newSources];
        });

        await this.switchPreview(0);
    };

    loadRemote = async (urls: string[]) => {
        const newSources: LoadSource[] = [];

        for (let url of urls) {
            newSources.push(new RemoteLoadSource(url));
        }

        runInAction(() => {
            this.sources = newSources;
        });

        await this.switchPreview(0);
    };

    switchPreview = async (index: number) => {
        if (index >= this.sources.length) {
            runInAction(() => {
                this.previewCol = null;
                this.selectedIndex = null;
            });
            return;
        }

        this.selectedIndex = index;
        const newCol = await this.createCollection(index);

        runInAction(() => {
            this.previewCol = newCol;
        });

        this.onStart();
    };

    deleteSource = (index: number) => {
        runInAction(() => {
            this.sources = this.sources.filter((_, i) => i !== index);
        });
    };

    getSourceNames = () => {
        return this.sources.map((s) => s.getName());
    };

    createCollection = async (index: number) => {
        const col = new ImageCollection();

        const batchSize = Math.max(1, Math.floor(this.config.numberOfImgsTogether));
        const imgIndex = Math.floor(index / batchSize) * batchSize;
        const maxIndex = Math.min(imgIndex + batchSize, this.sources.length);

        const promises: Promise<TImageItem>[] = [];
        for (let i = imgIndex; i < maxIndex; i++) {
            promises.push(this.createImageItemFromIndex(i));
        }

        const items = await Promise.all(promises);
        col.stack.push(...items);
        col.folderName = items[0]?.name ?? 'none';

        return col;
    };

    private createImageItemFromIndex = async (index: number): Promise<TImageItem> => {
        const data = await this.sources[index].getImageData();

        const fileNameSplit = this.sources[index].getName().split('.');
        const format = fileNameSplit.pop() ?? 'png';
        const name = fileNameSplit.join('.');

        return {
            data,
            index,
            name,
            format,
            selection: [],
            objects: [],
        };
    };
}

export type TTubeLoadConfig = {
    source: string[];
    numberOfImgsTogether: number;
};
