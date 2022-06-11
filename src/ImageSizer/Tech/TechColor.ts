import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import { ImageCollection } from "../ImageColection";
import { Tech } from "./Tech";
import { TechColorComp } from "../TechComponents/TechColorComp";
import { applyColorToImage } from "../functions/pixelUtils";

export class TechColor extends Tech<TTechColorConfig> {
    name = "Color";
    description = "Change color of selected pixels.";
    icon = BrushRoundedIcon;
    comp = TechColorComp;

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

export type TTechColorConfig = {
    color: TColor;
};
