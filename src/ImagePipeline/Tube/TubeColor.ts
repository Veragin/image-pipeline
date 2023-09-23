import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeColorComp } from "../TubeComponents/TubeColorComp";
import {
    applyColorToImage,
    applyHsvToImage,
    invertColorInImage,
    shiftColorInImage,
    shiftHsvInImage,
} from "../functions/colorModify";
import { THsvColor } from "react-utils/color";

export class TubeColor extends Tube<TTubeColorConfig> {
    name = "Color";
    description = [
        _("Change color of image/selected pixels."),
        _("Change the color to fixed one, shift it to different one or invert it"),
        _("Rgba or Hsv formats supported"),
    ];
    icon = BrushRoundedIcon;
    comp = TubeColorComp;

    constructor() {
        super({
            area: "selection",
            mode: "fixed",
            type: "rgba",
            rgba: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
            },
            hsva: {
                h: 0,
                v: 0,
                s: 0,
                a: 0,
            },
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            const area = this.config.area === "selection" ? item.selection : null;

            switch (this.config.mode) {
                case "fixed":
                    if (this.config.type === "rgba") {
                        applyColorToImage(item.data, area, this.config.rgba);
                    } else {
                        applyHsvToImage(item.data, area, this.config.hsva);
                    }
                    break;
                case "shift":
                    if (this.config.type === "rgba") {
                        shiftColorInImage(item.data, area, this.config.rgba);
                    } else {
                        shiftHsvInImage(item.data, area, this.config.hsva);
                    }
                    break;
                case "invert":
                    invertColorInImage(item.data, area);
                    break;
            }
        });
    };

    setRgba = (rgba: Partial<TColor>) => {
        this.setConfig({ rgba: { ...this.config.rgba, ...rgba } });
    };
    setHvsa = (hsva: Partial<THsvColor>) => {
        this.setConfig({ hsva: { ...this.config.hsva, ...hsva } });
    };
}
export type TTubeColorArea = "image" | "selection";
export type TTubeColorMode = "fixed" | "shift" | "invert";
export type TTubeColorColorType = "rgba" | "hsva";

export type TTubeColorConfig = {
    area: TTubeColorArea;
    mode: TTubeColorMode;
    type: TTubeColorColorType;
    rgba: TColor;
    hsva: THsvColor;
};
