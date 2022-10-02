import { ImageCollection, TImageItem } from "../ImageColection";

import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded";
import { Tube } from "./Tube";
import { TubeJoinComp } from "../TubeComponents/TubeJoinComp";
import { joinPixels } from "../functions/join";

export class TubeJoin extends Tube<TTubeJoinConfig> {
    name = "Join";
    readonly group = "object";
    description = [
        _(
            "Join pieces/images together into one (or multiple) images. (you can create pieces via cut or duplicate)"
        ),
        _("Group by === 0 means join all images together."),
        _("Image count in row === 0 means no limit in number of images in row."),
        _("Max Width === 0 means no limit on max pixel width of new image."),
    ];
    icon = AutoAwesomeMosaicRoundedIcon;
    comp = TubeJoinComp;

    constructor() {
        super({
            groupBy: 0,
            imageCountInRow: 4,
            maxWidth: 500,
            verticalGap: 0,
            horizontalGap: 0,
        });
    }

    do = async (imgCol: ImageCollection) => {
        const newStack: TImageItem[] = [];
        const groups: TImageItem[][] = [];

        // create group of TImageItems
        if (this.config.groupBy === 0) {
            groups.push(imgCol.stack);
        } else {
            let group: TImageItem[] = [];
            for (let item of imgCol.stack) {
                if (group.length < this.config.groupBy) {
                    group.push(item);
                } else {
                    groups.push(group);
                    group = [item];
                }
            }
            groups.push(group);
        }

        // do the join by groups
        let index = 0;
        for (let group of groups) {
            newStack.push({
                name: group[0].name,
                format: group[0].format,
                index,
                data: joinPixels(
                    group.map((item) => item.data),
                    this.config
                ),
                objects: [],
                selection: [],
            });
            index++;
        }

        imgCol.stack = newStack;
    };
}

export type TTubeJoinConfig = {
    groupBy: number;
    imageCountInRow: number;
    maxWidth: number;
    verticalGap: number;
    horizontalGap: number;
};
