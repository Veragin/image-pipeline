import {
    TTubeBBConfig,
    applyFitToRect,
    applyPaddingToRect,
    getBoundingBoxOfRects,
} from "../functions/rectTricks";
import { selectionFromRectToSelection, selectionToRect } from "../functions/rectSelection";

import CropRoundedIcon from "@mui/icons-material/CropRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeCropComp } from "../TubeComponents/TubeCropComp";
import { cutImageDataByRect } from "../functions/cutter";

export class TubeCrop extends Tube<TTubeCropConfig> {
    name = "Crop";
    readonly group = "transform";
    description = [
        _("Crop the image"),
        _(
            "Choose what will be default size and than fit size into box or apply some fixed padding"
        ),
        _("Image ... default size is whole image"),
        _("Box ... default size is defined box"),
        _("Selection ... default size is bounding box of selected pixels"),
        _("Objects ... default size is bounding box of all object in the image"),
    ];
    icon = CropRoundedIcon;
    comp = TubeCropComp;

    constructor() {
        super({
            type: "image",
            box: { x: 0, y: 0, width: 500, height: 500 },
            bbConfig: {
                isFitActive: false,
                fitTo: {
                    width: 10,
                    height: 10,
                    vertical: "center",
                    horizontal: "center",
                },
                padding: { top: 0, bottom: 0, left: 0, right: 0 },
            },
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            const size = {
                width: item.data.width,
                height: item.data.height,
            };

            let rect: TRect;
            switch (this.config.type) {
                case "image":
                    rect = { x: 0, y: 0, ...size };
                    break;
                case "selection":
                    rect = selectionToRect(item.selection, size);
                    break;
                case "box":
                    rect = { ...this.config.box };
                    break;
                case "objects":
                    rect = getBoundingBoxOfRects(item.objects.map((o) => o.rect));
                    break;
            }
            rect = this.modifyRect(rect);

            item.data = cutImageDataByRect(rect, item.data);

            item.selection = selectionFromRectToSelection(item.selection, size, {
                x: 0,
                y: 0,
                width: item.data.width,
                height: item.data.height,
            });
        });
    };

    modifyRect = (rect: TRect) => {
        if (this.config.bbConfig.isFitActive) {
            rect = applyFitToRect(rect, this.config.bbConfig.fitTo);
        }

        return applyPaddingToRect(rect, this.config.bbConfig.padding);
    };
}

export type TTubeCropType = "image" | "box" | "selection" | "objects";

export type TTubeCropConfig = {
    type: TTubeCropType;
    box: TRect;
    bbConfig: TTubeBBConfig;
};
