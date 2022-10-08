import AbcRoundedIcon from "@mui/icons-material/AbcRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeRenameComp } from "../TubeComponents/TubeRenameComp";

export class TubeRename extends Tube<TTubeRenameConfig> {
    name = "Rename";
    description = [
        _("Rename images (for download)."),
        _("Use regular expression to modify name of the loaded image file."),
        _("By NAME PATTERN define new name for image. You can use:"),
        _(
            "{name} to insert REGEXP NAME, {index} to insert pice index of the image (image could be cutted into pieces via tube cut)"
        ),
        _("{width} pixel width of the image, {height} pixel height of the image"),
    ];
    icon = AbcRoundedIcon;
    comp = TubeRenameComp;

    constructor() {
        super({
            regExp: "\\",
            namePattern: "{name}",
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            let name = item.name;
            try {
                const regExp = new RegExp(this.config.regExp);
                name = regExp.exec(item.name)?.[0] ?? "";
            } catch {}

            item.name = this.config.namePattern
                .replaceAll("{name}", name)
                .replaceAll("{width}", String(item.data.width))
                .replaceAll("{height}", String(item.data.height))
                .replaceAll("{index}", String(item.index));
        });
    };
}

export type TTubeRenameConfig = {
    regExp: string;
    namePattern: string;
};
