import FitScreenRoundedIcon from "@mui/icons-material/FitScreenRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeScaleComp } from "../TubeComponents/TubeScaleComp";
import { scalePixels } from "../functions/transformPixels";

export class TubeScale extends Tube<TTubeScaleConfig> {
    name = "Scale";
    readonly group = "transform";
    description = [
        _("Scale image."),
        _("Box ... scale to fixed size. "),
        _("Padding ... add/remove amout of pixel from the final size."),
        _("Percent ... scale by given ratio."),
    ];
    icon = FitScreenRoundedIcon;
    comp = TubeScaleComp;

    constructor() {
        super({
            type: "box",
            box: { width: 50, height: 50 },
            padding: { width: 20, height: 20 },
            percent: { width: 2, height: 2 },
        });
    }

    do = async (imgCol: ImageCollection) => {
        const promises = imgCol.stack.map(async (item) => {
            let size: TSize;

            switch (this.config.type) {
                case "box":
                    size = {
                        width: Math.max(0, this.config.box.width),
                        height: Math.max(0, this.config.box.height),
                    };
                    break;
                case "padding":
                    size = {
                        width: Math.max(0, item.data.width + this.config.padding.width),
                        height: Math.max(0, item.data.height + this.config.padding.height),
                    };
                    break;
                case "percent":
                    size = {
                        width: Math.max(0, Math.ceil(item.data.width * this.config.percent.width)),
                        height: Math.max(
                            0,
                            Math.ceil(item.data.height * this.config.percent.height)
                        ),
                    };
                    break;
            }

            item.data = scalePixels(item.data, size);
        });

        await Promise.all(promises);
    };
}

export type TTubeScaleType = "box" | "padding" | "percent";

export type TTubeScaleConfig = {
    type: TTubeScaleType;
    box: TSize;
    padding: TSize;
    percent: TSize;
};
