import FitScreenRoundedIcon from "@mui/icons-material/FitScreenRounded";
import { ImageCollection } from "../ImageColection";
import { Tech } from "./Tech";
import { TechScaleComp } from "../TechComponents/TechScaleComp";
import { scalePixels } from "../functions/transformPixels";

export class TechScale extends Tech<TTechScaleConfig> {
    name = "Scale";
    group = "transform" as const;
    description =
        "Scale image. Box ... scale to given size. Padding ... add/remove amout of pixel from size. Percent ... scale by given ratio.";
    icon = FitScreenRoundedIcon;
    comp = TechScaleComp;

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
                        width: Math.max(0, item.data.width * this.config.percent.width),
                        height: Math.max(0, item.data.height * this.config.percent.height),
                    };
                    break;
            }

            item.data = scalePixels(item.data, size);
        });

        await Promise.all(promises);
    };
}

export type TTechScaleType = "box" | "padding" | "percent";

export type TTechScaleConfig = {
    type: TTechScaleType;
    box: TSize;
    padding: TSize;
    percent: TSize;
};
