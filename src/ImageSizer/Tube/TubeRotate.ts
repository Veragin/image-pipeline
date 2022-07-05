import { ImageCollection } from "../ImageColection";
import Rotate90DegreesCwRoundedIcon from "@mui/icons-material/Rotate90DegreesCwRounded";
import { Tube } from "./Tube";
import { TubeRotateComp } from "../TubeComponents/TubeRotateComp";
import { rotatePixels } from "../functions/transformPixels";

export class TubeRotate extends Tube<TTubeRotateConfig> {
    name = "Rotate";
    group = "transform" as const;
    description = "Rotate image by degree. ";
    icon = Rotate90DegreesCwRoundedIcon;
    comp = TubeRotateComp;

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

export type TTubeRotateConfig = {
    angle: number;
};
