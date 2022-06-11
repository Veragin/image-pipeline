import { TTechBBConfig, applyFitToRect, applyPaddingToRect, getBoundingBoxOfRects } from "../functions/rectTricks";
import { selectionFromRectToSelection, selectionToRect } from "../functions/rectSelection";

import CropRoundedIcon from "@mui/icons-material/CropRounded";
import { ImageCollection } from "../ImageColection";
import { Tech } from "./Tech";
import { TechCropComp } from "../TechComponents/TechCropComp";
import { cutImageDataByRect } from "../functions/cutter";

export class TechCrop extends Tech<TTechCropConfig> {
    name = "Crop";
    group = "transform" as const;
    description = "Crop or cut image based on selection/objects.";
    icon = CropRoundedIcon;
    comp = TechCropComp;

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

export type TTechCropType = "image" | "box" | "selection" | "objects";

export type TTechCropConfig = {
    type: TTechCropType;
    box: TRect;
    bbConfig: TTechBBConfig;
};
