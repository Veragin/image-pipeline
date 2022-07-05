import FlipRoundedIcon from "@mui/icons-material/FlipRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeMirrorComp } from "../TubeComponents/TubeMirrorComp";
import { mirrorPixels } from "../functions/transformPixels";

export class TubeMirror extends Tube<TTubeMirrorConfig> {
    name = "Mirror";
    group = "transform" as const;
    description = "Mirror image vertically and horizontally. ";
    icon = FlipRoundedIcon;
    comp = TubeMirrorComp;

    constructor() {
        super({
            vertical: false,
            horizontal: false,
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            item.data = mirrorPixels(
                item.data,
                this.config.vertical,
                this.config.horizontal
            );
        });
    };
}

export type TTubeMirrorConfig = {
    vertical: boolean;
    horizontal: boolean;
};
