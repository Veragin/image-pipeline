import { ImageCollection } from "../ImageColection";
import Rotate90DegreesCwRoundedIcon from "@mui/icons-material/Rotate90DegreesCwRounded";
import { Tube } from "./Tube";
import { TubeRotateComp } from "../TubeComponents/TubeRotateComp";
import { rotatePixels } from "../functions/transformPixels";

export class TubeRotate extends Tube<TTubeRotateConfig> {
    name = "Rotate";
    readonly group = "transform";
    description = _("Rotate image by degree. Angle should be number between 0 and 360");
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
