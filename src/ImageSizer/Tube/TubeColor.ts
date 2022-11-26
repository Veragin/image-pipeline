import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeColorComp } from "../TubeComponents/TubeColorComp";
import { applyColorToImage, invertColorInImage } from "../functions/pixelUtils";

export class TubeColor extends Tube<TTubeColorConfig> {
    name = "Color";
    description = [
        _("Change color of selected pixels."),
        _("In the future change only opacity, hue, lightness"),
    ];
    icon = BrushRoundedIcon;
    comp = TubeColorComp;

    constructor() {
        super({
            mode: "color",
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
            if (this.config.mode === "color") {
                applyColorToImage(item.data, item.selection, this.config.color);
            } else {
                invertColorInImage(item.data, item.selection);
            }
        });
    };
}

export type TTubeColorMode = "color" | "invert";

export type TTubeColorConfig = {
    mode: TTubeColorMode;
    color: TColor;
};
