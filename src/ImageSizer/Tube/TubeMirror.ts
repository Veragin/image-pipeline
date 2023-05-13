import FlipRoundedIcon from "@mui/icons-material/FlipRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeMirrorComp } from "../TubeComponents/TubeMirrorComp";
import { mirrorPixels } from "../functions/transformPixels";
import { mirrorPixelsGPU } from "ImageSizer/functions/transformPixelsGPU";

export class TubeMirror extends Tube<TTubeMirrorConfig> {
    name = "Mirror";
    readonly group = "transform";
    description = _("Mirror image vertically and horizontally.");
    icon = FlipRoundedIcon;
    comp = TubeMirrorComp;

    constructor() {
        super({
            vertical: false,
            horizontal: false,
        });
    }

    show = (imgCol: ImageCollection) => this.doGPU(imgCol);

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            item.data = mirrorPixels(item.data, this.config.vertical, this.config.horizontal);
        });
    };

    doGPU = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            item.data = mirrorPixelsGPU(item.data, this.config.vertical, this.config.horizontal);
        });
    };
}

export type TTubeMirrorConfig = {
    vertical: boolean;
    horizontal: boolean;
};
