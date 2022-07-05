import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeColorComp } from "../TubeComponents/TubeColorComp";
import { applyColorToImage } from "../functions/pixelUtils";

export class TubeColor extends Tube<TTubeColorConfig> {
    name = "Color";
    description = "Change color of selected pixels.";
    icon = BrushRoundedIcon;
    comp = TubeColorComp;

    constructor() {
        super({
            color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
            },
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            applyColorToImage(item.data, item.selection, this.config.color);
        });
    };
}

export type TTubeColorConfig = {
    color: TColor;
};
