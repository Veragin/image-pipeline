import { makeObservable, observable, runInAction } from "mobx";

import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { ImageCollection } from "../../ImageColection";
import { Tube } from "../Tube";
import { TubeLoadComp } from "../../TubeComponents/TubeLoadComp";
import { applyDeepPartial } from "react-utils/basic/misc";
import { FileLoadSource, LoadSource, RemoteLoadSource } from "./LoadSource";

export class TubeLoad extends Tube<TTubeLoadConfig> {
    id = 0;
    name = "Load";
    readonly group = "none";
    description = [
        _(
            "Load images into service. This tube cannot be removed, added more times and is the first tube in the pipeline."
        ),
        _("Selected image file will be used as a preview."),
        _("While you start the pipeline, all loaded files will be proccessed."),
        _("!! Using image with high resolution as an preview will may slow down configuration !!"),
    ];
    icon = DriveFolderUploadRoundedIcon;
    comp = TubeLoadComp;

    sources: LoadSource[] = [];
    selectedIndex: null | number = null;
    preview: ImageData | null = null;
    previewName: string = "default";

    constructor(private onStart: () => void) {
        super({
            source: [],
            numberOfImgsTogether: 0,
        });
        makeObservable(this, {
            sources: observable,
            preview: observable,
            previewName: observable,
        });
    }

    do = async (imgCol: ImageCollection) => {};

    setConfig(config: DeepPartial<TTubeLoadConfig>) {
        this.config = applyDeepPartial(this.config, config);
        const source = config?.source?.filter((s) => !!s) as string[] | undefined;
        if (source && source.length > 0) {
            this.loadRemote(source);
        }
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
            this.sources = newSources;
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
                this.preview = null;
                this.selectedIndex = null;
            });
            return;
        }

        this.selectedIndex = index;
        const source = this.sources[index];
        const preview = await source.getImageData();

        runInAction(() => {
            this.preview = preview;
            this.previewName = source.getName();
        });

        this.onStart();
    };

    getSourceNames = () => {
        return this.sources.map((s) => s.getName());
    };
}

export type TTubeLoadConfig = {
    source: string[];
    numberOfImgsTogether: number;
};
