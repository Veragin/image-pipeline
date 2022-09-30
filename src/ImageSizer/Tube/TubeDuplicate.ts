import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { inverseSelection } from "ImageSizer/functions/selections";
import { TubeDuplicateComp } from "ImageSizer/TubeComponents/TubeDuplicateComp";
import { copyImageColection, ImageCollection, TImageItem } from "../ImageColection";
import { Tube } from "./Tube";

export class TubeDuplicate extends Tube<TTubeDuplicateConfig> {
    name = "Duplicate";
    readonly group = "object";
    description = "Mirror image vertically and horizontally. ";
    icon = ContentCopyRoundedIcon;
    comp = TubeDuplicateComp;

    constructor() {
        super({
            count: 2,
            inverseSelection: false,
        });
    }

    do = async (imgCol: ImageCollection) => {
        const newCopies: TImageItem[] = [];
        imgCol.stack.forEach((item) => {
            for (let i = 1; i < this.config.count; i++) {
                const newCollection = copyImageColection(imgCol);
                newCopies.push(...newCollection.stack);
            }
        });

        if (this.config.inverseSelection) {
            newCopies.forEach(
                (item) =>
                    (item.selection = inverseSelection(
                        item.selection,
                        item.data.width * item.data.height
                    ))
            );
        }

        imgCol.stack.push(...newCopies);
    };
}

export type TTubeDuplicateConfig = {
    count: number;
    inverseSelection: boolean;
};
