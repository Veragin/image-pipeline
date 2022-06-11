import FlipRoundedIcon from "@mui/icons-material/FlipRounded";
import { ImageCollection } from "../ImageColection";
import { Tech } from "./Tech";
import { TechMirrorComp } from "../TechComponents/TechMirrorComp";
import { mirrorPixels } from "../functions/transformPixels";

export class TechMirror extends Tech<TTechMirrorConfig> {
    name = "Mirror";
    group = "transform" as const;
    description = "Mirror image vertically and horizontally. ";
    icon = FlipRoundedIcon;
    comp = TechMirrorComp;

    constructor() {
        super({
            vertical: false,
            horizontal: false,
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            item.data = mirrorPixels(item.data, this.config.vertical, this.config.horizontal);
        });
    };
}

export type TTechMirrorConfig = {
    vertical: boolean;
    horizontal: boolean;
};
