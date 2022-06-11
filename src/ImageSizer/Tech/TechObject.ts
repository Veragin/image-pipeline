import { TTechBBConfig, applyPaddingToRect } from "../functions/rectTricks";
import { countPixelsInSelection, getObjectsFromSelection } from "../functions/objectFind";

import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import { ImageCollection } from "../ImageColection";
import { TSelection } from "../ImageColection";
import { Tech } from "./Tech";
import { TechObjectComp } from "../TechComponents/TechObjectComp";
import { applyFitToRect } from "../functions/rectTricks";
import { selectionToRect } from "../functions/rectSelection";

export class TechObject extends Tech<TTechObjectConfig> {
    name = "Object";
    group = "object" as const;
    description = "Find objects from selection.";
    icon = DataObjectRoundedIcon;
    comp = TechObjectComp;

    constructor() {
        super({
            compactDistance: 0,
            minimalHeight: 0,
            minimalPixelCount: 0,
            minimalWidth: 0,
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

            const selectionGroups = getObjectsFromSelection(item.selection, item.data, this.config.compactDistance);

            const largeSelectionGroups = selectionGroups.filter(
                (o) => countPixelsInSelection(o) >= this.config.minimalPixelCount
            );

            const objects = largeSelectionGroups.map((o) => ({
                selection: o,
                rect: this.createRect(o, size),
            }));

            item.objects = objects.filter(
                (o) => o.rect.width >= this.config.minimalWidth && o.rect.height >= this.config.minimalHeight
            );
        });
    };

    createRect = (sel: TSelection, size: TSize) => {
        let rect = selectionToRect(sel, size);

        if (this.config.bbConfig.isFitActive) {
            rect = applyFitToRect(rect, this.config.bbConfig.fitTo);
        }

        return applyPaddingToRect(rect, this.config.bbConfig.padding);
    };
}

export type TTechObjectConfig = {
    compactDistance: number;

    minimalPixelCount: number;
    minimalWidth: number;
    minimalHeight: number;

    bbConfig: TTechBBConfig;
};
