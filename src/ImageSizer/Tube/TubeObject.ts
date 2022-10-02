import { TTubeBBConfig, applyPaddingToRect, floorRect } from "../functions/rectTricks";
import {
    countPixelsInSelection,
    getObjectsFromSelection,
    sortObjects,
} from "../functions/objectFind";

import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import { ImageCollection } from "../ImageColection";
import { TSelection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeObjectComp } from "../TubeComponents/TubeObjectComp";
import { applyFitToRect } from "../functions/rectTricks";
import { selectionToRect } from "../functions/rectSelection";

export class TubeObject extends Tube<TTubeObjectConfig> {
    name = "Object";
    readonly group = "object";
    description = [
        _(
            "Find objects in selection. Compact selected pixels defines an object that is bounding box of them."
        ),
        _("Define requirements for an object or modify its bounderies"),
        _("Objects can be used in cut or crop tube."),
    ];
    icon = DataObjectRoundedIcon;
    comp = TubeObjectComp;

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

            const selectionGroups = getObjectsFromSelection(
                item.selection,
                { ...size },
                this.config.compactDistance
            );

            const largeSelectionGroups = selectionGroups.filter(
                (o) => countPixelsInSelection(o) >= this.config.minimalPixelCount
            );

            const objects = largeSelectionGroups.map((o) => ({
                selection: o,
                rect: this.createRect(o, size),
            }));

            item.objects = objects.filter(
                (o) =>
                    o.rect.width >= this.config.minimalWidth &&
                    o.rect.height >= this.config.minimalHeight
            );

            item.objects = sortObjects(item.objects);
        });
    };

    createRect = (sel: TSelection, size: TSize) => {
        let rect = selectionToRect(sel, size);

        if (this.config.bbConfig.isFitActive) {
            rect = applyFitToRect(rect, this.config.bbConfig.fitTo);
        }

        rect = applyPaddingToRect(rect, this.config.bbConfig.padding);
        return floorRect(rect);
    };
}

export type TTubeObjectConfig = {
    compactDistance: number;

    minimalPixelCount: number;
    minimalWidth: number;
    minimalHeight: number;

    bbConfig: TTubeBBConfig;
};
