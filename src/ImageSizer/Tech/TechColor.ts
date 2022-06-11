import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import COLOR from '../../Service/Editor/Const/Color';
import { ImageCollection } from 'ImageSIzer/ImageColection';
import { Tech } from './Tech';
import { TechColorComp } from '../TechComponents/TechColorComp';
import { applyColorToImage } from 'ImageSIzer/functions/pixelUtils';

export class TechColor extends Tech<TTechColorConfig> {
    name = 'Color';
    description = 'Change color of selected pixels.';
    icon = BrushRoundedIcon;
    comp = TechColorComp;

    constructor() {
        super({ color: COLOR.BLACK });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            applyColorToImage(item.data, item.selection, this.config.color);
        });
    };
}

export type TTechColorConfig = {
    color: TColor;
};
