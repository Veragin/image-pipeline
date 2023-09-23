import { cutImageDataByFixed, cutImageDataByPercent } from "../functions/cutter";

import CarpenterRoundedIcon from "@mui/icons-material/CarpenterRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeCutComp } from "../TubeComponents/TubeCutComp/TubeCutComp";
import { cutImageDataByObjects } from "../functions/cutter";

export class TubeCut extends Tube<TTubeCutConfig> {
    name = "Cut";
    readonly group = "object";
    description = [
        _("Cut the image to the pieces."),
        _("Fixed ... split into pixel fixed size pieces."),
        _("Object ... split based on objects"),
        _(
            'Percent ... split percentually, define columns and rows as numbers separeted by ",", eg.: "1,1,2" will split as 25% 25% 50%'
        ),
    ];
    icon = CarpenterRoundedIcon;
    comp = TubeCutComp;

    constructor() {
        super({
            type: "fixed",
            fixed: {
                width: 24,
                height: 24,
            },
            percent: {
                columns: [],
                rows: [],
            },
            sort: "none",
        });
    }

    do = async (imgCol: ImageCollection) => {
        const collection = new ImageCollection();

        switch (this.config.type) {
            case "fixed":
                for (let imageItem of imgCol.stack) {
                    collection.stack.push(
                        ...cutImageDataByFixed(imageItem, this.config.fixed).stack
                    );
                }
                break;
            case "object":
                for (let imageItem of imgCol.stack) {
                    collection.stack.push(...cutImageDataByObjects(imageItem).stack);
                }
                break;
            case "percent":
                for (let imageItem of imgCol.stack) {
                    collection.stack.push(
                        ...cutImageDataByPercent(imageItem, this.config.percent).stack
                    );
                }
                break;
            default:
                collection.stack = imgCol.stack;
        }

        imgCol.stack = collection.stack;
    };
}

export type TTubeCutConfig = {
    type: TTubeCutType;
    fixed: TSize;
    percent: TPercentConfig;
    sort: TTubeCutSort;
};

type TTubeCutSort = "none" | "random" | "vertical";

export type TTubeCutType = "fixed" | "percent" | "object";

type TPercentConfig = {
    columns: number[];
    rows: number[];
};
