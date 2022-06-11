import { ImageCollection } from "../ImageColection";
import Rotate90DegreesCwRoundedIcon from "@mui/icons-material/Rotate90DegreesCwRounded";
import { Tech } from "./Tech";
import { TechRotateComp } from "../TechComponents/TechRotateComp";
import { rotatePixels } from "../functions/transformPixels";

export class TechRotate extends Tech<TTechRotateConfig> {
    name = "Rotate";
    group = "transform" as const;
    description = "Rotate image by degree. ";
    icon = Rotate90DegreesCwRoundedIcon;
    comp = TechRotateComp;

    constructor() {
        super({
            angle: 0,
        });
    }

    do = async (imgCol: ImageCollection) => {
        const angle = (this.config.angle / 180) * Math.PI;

        imgCol.stack.forEach((item) => {
            item.data = rotatePixels(item.data, angle);
        });
    };
}

export type TTechRotateConfig = {
    angle: number;
};
