import AbcRoundedIcon from "@mui/icons-material/AbcRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeRenameComp } from "../TubeComponents/TubeRenameComp";

export class TubeRename extends Tube<TTubeRenameConfig> {
    name = "Rename";
    description = [
        _("Rename images (for download)."),
        _("Use regExp to modify oldName. In Name pattern you can use:"),
        _(
            "{name} to insert new name, {index} to insert index of image, {width} width of image, {height} height of image"
        ),
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
