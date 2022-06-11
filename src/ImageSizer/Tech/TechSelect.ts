import { addSelection, interSelection, inverseSelection, subSelection } from '../functions/selections';
import {
    alphaToSelection,
    colorToSelection,
    neighborToSelection,
    neighborToSelectionByBaseColor,
    neighborToSelectionByColor,
} from '../functions/colorSelection';

import { COLOR } from 'Service/Editor/Const';
import { ImageCollection } from 'ImageSIzer/ImageColection';
import PhotoSizeSelectLargeRoundedIcon from '@mui/icons-material/PhotoSizeSelectLargeRounded';
import { TImageItem } from './../ImageColection';
import { Tech } from './Tech';
import { TechSelectComp } from '../TechComponents/TechSelectComp/TechSelectComp';
import { rectToSelection } from 'ImageSIzer/functions/rectSelection';
import { throttle } from 'react-utils/throttle';

export class TechSelect extends Tech<TTechSelectConfig> {
    name = 'Select';
    description = 'Select area that you want to edit.';
    icon = PhotoSizeSelectLargeRoundedIcon;
    comp = TechSelectComp;

    constructor() {
        super(initConfig({ width: 500, height: 500 }));
    }

    setConfigColor = throttle((config: Partial<TTechSelectConfig['color']>) =>
        this.setConfig({ color: { ...this.config.color, ...config } })
    );
    setConfigNeighbor = throttle((config: Partial<TTechSelectConfig['neighbor']>) =>
        this.setConfig({ neighbor: { ...this.config.neighbor, ...config } })
    );

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            let sel = this.computeSelection(item);

            if (this.config.inverse) {
                sel = inverseSelection(sel, item.data.width * item.data.height);
            }

            switch (this.config.mode) {
                case 'modifyAdd':
                    sel = addSelection(item.selection, sel);
                    break;
                case 'modifySub':
                    sel = subSelection(item.selection, sel);
                    break;
                case 'modifyInter':
                    sel = interSelection(item.selection, sel);
                    break;
            }

            item.selection = sel;
        });
    };

    computeSelection = (item: TImageItem) => {
        switch (this.config.type) {
            case 'box':
                return rectToSelection(this.config.box, item.data);
            case 'color':
                if (this.config.color.type === 'color') {
                    return colorToSelection(this.config.color.pivot, this.config.color.threshold, item.data);
                } else {
                    return alphaToSelection(this.config.color.alpha, this.config.color.threshold, item.data);
                }
            case 'neighbor':
                if (this.config.neighbor.type === 'pixel') {
                    return neighborToSelection(
                        { x: this.config.neighbor.x, y: this.config.neighbor.y },
                        this.config.neighbor.threshold,
                        item.data
                    );
                } else if (this.config.neighbor.type === 'color') {
                    return neighborToSelectionByColor(
                        this.config.neighbor.color,
                        this.config.neighbor.threshold,
                        item.data
                    );
                } else {
                    return neighborToSelectionByBaseColor(this.config.neighbor.threshold, item.data);
                }
            case 'old':
                return item.selection;
        }
    };
}

export type TTechSelectMode = 'newSelect' | 'modifyAdd' | 'modifySub' | 'modifyInter';
export type TTechSelectType = 'box' | 'color' | 'neighbor' | 'old';

export type TTechSelectConfig = {
    mode: TTechSelectMode;
    type: TTechSelectType;
    inverse: boolean;

    box: TRect;
    color: {
        type: 'color' | 'alpha';
        pivot: TColor;
        alpha: number;
        threshold: number;
    };
    neighbor: {
        type: 'pixel' | 'color' | 'baseColor';
        x: number;
        y: number;
        color: TColor;
        threshold: number;
    };
};

const initConfig = (size: TSize): TTechSelectConfig => ({
    mode: 'newSelect',
    type: 'box',
    inverse: false,
    box: {
        x: 0,
        y: 0,
        ...size,
    },
    color: {
        type: 'color',
        pivot: COLOR.WHITE,
        alpha: 0,
        threshold: 0,
    },
    neighbor: {
        type: 'pixel',
        x: 0,
        y: 0,
        color: COLOR.WHITE,
        threshold: 0,
    },
});
