import { cutImageDataByFixed, cutImageDataByPercent } from 'ImageSIzer/functions/cutter';

import CarpenterRoundedIcon from '@mui/icons-material/CarpenterRounded';
import { ImageCollection } from 'ImageSIzer/ImageColection';
import { Tech } from './Tech';
import { TechCutComp } from '../TechComponents/TechCutComp/TechCutComp';
import { cutImageDataByObjects } from '../functions/cutter';

export class TechCut extends Tech<TTechCutConfig> {
    name = 'Cut';
    group = 'object' as const;
    description = `Cut the image to the pieces. \n
        Fixed ... split into pixel fixed pieces. \n
        Object ... split based by objects \n
        Percent ... not implemented yet`;
    icon = CarpenterRoundedIcon;
    comp = TechCutComp;

    constructor() {
        super({
            type: 'fixed',
            fixed: {
                width: 24,
                height: 24,
            },
            percent: {
                columns: [],
                rows: [],
            },
        });
    }

    do = async (imgCol: ImageCollection) => {
        const collection = new ImageCollection();

        switch (this.config.type) {
            case 'fixed':
                for (let imageItem of imgCol.stack) {
                    collection.stack.push(...cutImageDataByFixed(imageItem, this.config.fixed).stack);
                }
                break;
            case 'object':
                for (let imageItem of imgCol.stack) {
                    collection.stack.push(...cutImageDataByObjects(imageItem).stack);
                }
                break;
            case 'percent':
                for (let imageItem of imgCol.stack) {
                    collection.stack.push(...cutImageDataByPercent(imageItem, this.config.percent).stack);
                }
                break;
            default:
                collection.stack = imgCol.stack;
        }

        imgCol.stack = collection.stack;
    };
}

export type TTechCutConfig = {
    type: TTechCutType;
    fixed: TSize;
    percent: TPercentConfig;
};

export type TTechCutType = 'fixed' | 'percent' | 'object';

type TPercentConfig = {
    columns: number[];
    rows: number[];
};
