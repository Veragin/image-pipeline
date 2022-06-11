import AbcRoundedIcon from "@mui/icons-material/AbcRounded";
import { ImageCollection } from "../ImageColection";
import { Tech } from "./Tech";
import { TechRenameComp } from "../TechComponents/TechRenameComp";

export class TechRename extends Tech<TTechRenameConfig> {
    name = "Rename";
    description =
        "Rename images (for save). Use regExp to modify oldName. Name pattern: use {name} to insert new name, {index} to insert index of image, {width} width of image, {height} height og image";
    icon = AbcRoundedIcon;
    comp = TechRenameComp;

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

export type TTechRenameConfig = {
    regExp: string;
    namePattern: string;
};
