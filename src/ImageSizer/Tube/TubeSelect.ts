import {
    addSelection,
    interSelection,
    inverseSelection,
    subSelection,
} from "../functions/selections";
import {
    alphaToSelection,
    colorToSelection,
    neighborToSelection,
    neighborToSelectionByBaseColor,
    neighborToSelectionByColor,
} from "../functions/colorSelection";

import { COLOR } from "react-utils/Const/Color";
import { ImageCollection } from "../ImageColection";
import PhotoSizeSelectLargeRoundedIcon from "@mui/icons-material/PhotoSizeSelectLargeRounded";
import { TImageItem } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeSelectComp } from "../TubeComponents/TubeSelectComp/TubeSelectComp";
import { rectToSelection } from "../functions/rectSelection";
import { throttle } from "react-utils/basic/throttle";

export class TubeSelect extends Tube<TTubeSelectConfig> {
    name = "Select";
    description = _("Select pixels that you want to edit.");
    icon = PhotoSizeSelectLargeRoundedIcon;
    comp = TubeSelectComp;

    constructor() {
        super(initConfig({ width: 500, height: 500 }));
    }

    setConfigColor = throttle((config: Partial<TTubeSelectConfig["color"]>) =>
        this.setConfig({ color: { ...this.config.color, ...config } })
    );
    setConfigNeighbor = throttle((config: Partial<TTubeSelectConfig["neighbor"]>) =>
        this.setConfig({ neighbor: { ...this.config.neighbor, ...config } })
    );

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            let sel = this.computeSelection(item);

            if (this.config.inverse || this.config.method === "old") {
                sel = inverseSelection(sel, item.data.width * item.data.height);
            }

            if (this.config.method !== "old") {
                switch (this.config.mode) {
                    case "modifyAdd":
                        sel = addSelection(item.selection, sel);
                        break;
                    case "modifySub":
                        sel = subSelection(item.selection, sel);
                        break;
                    case "modifyInter":
                        sel = interSelection(item.selection, sel);
                        break;
                }
            }

            item.selection = sel;
        });
    };

    computeSelection = (item: TImageItem) => {
        switch (this.config.method) {
            case "box":
                return rectToSelection(this.config.box, item.data);
            case "color":
                if (this.config.color.type === "color") {
                    return colorToSelection(
                        this.config.color.pivot,
                        this.config.color.threshold,
                        item.data
                    );
                } else {
                    return alphaToSelection(
                        this.config.color.alpha,
                        this.config.color.threshold,
                        item.data
                    );
                }
            case "neighbor":
                if (this.config.neighbor.type === "pixel") {
                    return neighborToSelection(
                        {
                            x: this.config.neighbor.x,
                            y: this.config.neighbor.y,
                        },
                        this.config.neighbor.threshold,
                        item.data
                    );
                } else if (this.config.neighbor.type === "color") {
                    return neighborToSelectionByColor(
                        this.config.neighbor.color,
                        this.config.neighbor.threshold,
                        item.data
                    );
                } else {
                    return neighborToSelectionByBaseColor(
                        this.config.neighbor.threshold,
                        item.data
                    );
                }
            case "old":
                return item.selection;
        }
    };
}

export type TTubeSelectMode = "newSelect" | "modifyAdd" | "modifySub" | "modifyInter";
export type TTubeSelectMethod = "box" | "color" | "neighbor" | "old";

export type TTubeSelectConfig = {
    mode: TTubeSelectMode;
    method: TTubeSelectMethod;
    inverse: boolean;

    box: TRect;
    color: {
        type: "color" | "alpha";
        pivot: TColor;
        alpha: number;
        threshold: number;
    };
    neighbor: {
        type: "pixel" | "color" | "baseColor";
        x: number;
        y: number;
        color: TColor;
        threshold: number;
    };
};

const initConfig = (size: TSize): TTubeSelectConfig => ({
    mode: "newSelect",
    method: "box",
    inverse: false,
    box: {
        x: 0,
        y: 0,
        ...size,
    },
    color: {
        type: "color",
        pivot: COLOR.WHITE,
        alpha: 0,
        threshold: 0,
    },
    neighbor: {
        type: "pixel",
        x: 0,
        y: 0,
        color: COLOR.WHITE,
        threshold: 0,
    },
});
