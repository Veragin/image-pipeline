import FitScreenRoundedIcon from '@mui/icons-material/FitScreenRounded';
import { ImageCollection } from '../ImageColection';
import { Tube } from './Tube';
import { TubeScaleComp } from '../TubeComponents/TubeScaleComp';
import { scalePixels } from '../functions/transformPixels';
import { scalePixelsGPU } from 'ImagePipeline/functions/transformPixelsGPU';

export class TubeScale extends Tube<TTubeScaleConfig> {
    name = 'Scale';
    readonly group = 'transform';
    description = [
        _('Scale image.'),
        _('!!! This action will unselect all pixels and remove all objects !!!'),
        _('Box ... scale to fixed size. '),
        _('Padding ... add/remove amout of pixel from the final size.'),
        _('Percent ... scale by given ratio.'),
    ];
    icon = FitScreenRoundedIcon;
    comp = TubeScaleComp;

    constructor() {
        super({
            type: 'box',
            box: { width: 50, height: 50 },
            padding: { width: 20, height: 20 },
            percent: { width: 2, height: 2 },
        });
    }

    show = (imgCol: ImageCollection) => this.doGPU(imgCol);

    do = async (imgCol: ImageCollection) => {
        const promises = imgCol.stack.map(async (item) => {
            const size = this.computeSize(item.data);
            item.data = scalePixels(item.data, size);
            item.selection = [];
            item.objects = [];
        });

        await Promise.all(promises);
    };

    doGPU = async (imgCol: ImageCollection) => {
        const promises = imgCol.stack.map(async (item) => {
            const size = this.computeSize(item.data);
            item.data = scalePixelsGPU(item.data, size);
            item.selection = [];
            item.objects = [];
        });

        await Promise.all(promises);
    };

    private computeSize = (imgData: ImageData): TSize => {
        switch (this.config.type) {
            case 'box':
                return {
                    width: Math.max(0, this.config.box.width),
                    height: Math.max(0, this.config.box.height),
                };
            case 'padding':
                return {
                    width: Math.max(0, imgData.width + this.config.padding.width),
                    height: Math.max(0, imgData.height + this.config.padding.height),
                };
            case 'percent':
                return {
                    width: Math.max(0, Math.ceil(imgData.width * this.config.percent.width)),
                    height: Math.max(0, Math.ceil(imgData.height * this.config.percent.height)),
                };
        }
    };
}

export type TTubeScaleType = 'box' | 'padding' | 'percent';

export type TTubeScaleConfig = {
    type: TTubeScaleType;
    box: TSize;
    padding: TSize;
    percent: TSize;
};
