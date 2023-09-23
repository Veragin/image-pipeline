import AbcRoundedIcon from "@mui/icons-material/AbcRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeRenameComp } from "../TubeComponents/TubeRenameComp";

export class TubeRename extends Tube<TTubeRenameConfig> {
    name = "Rename";
    description = [
        _("Rename images and folder (used in download download)."),
        _("Use regular expression to modify name of the loaded image file."),
        _("By NAME PATTERN define new name for image. You can use:"),
        _("{name} to insert REGEXP NAME"),
        _(
            "{index} to insert piece index of the image (image could be cutted into pieces via tube cut)(can be used only in IMAGE NAME)"
        ),
        _(
            "{width} pixel width of the image, {height} pixel height of the image (can be used only in IMAGE NAME)"
        ),
        _("{pieceCount} number of pieces (can be used only in FOLDER NAME)"),
    ];
    icon = AbcRoundedIcon;
    comp = TubeRenameComp;

    constructor() {
        super({
            folder: {
                regExp: "\\",
                pattern: "{name}",
            },
            image: {
                regExp: "\\",
                pattern: "{name}",
            },
        });
    }

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            const newName = this.processName(item.name, this.config.image);
            item.name = newName
                .replaceAll("{width}", String(item.data.width))
                .replaceAll("{height}", String(item.data.height))
                .replaceAll("{index}", String(item.index));
        });

        const newName = this.processName(imgCol.folderName, this.config.folder);
        imgCol.folderName = newName.replaceAll("{pieceCount}", String(imgCol.stack.length));
    };

    private processName = (name: string, namePattern: TNamePattern) => {
        try {
            const regExp = new RegExp(namePattern.regExp);
            name = regExp.exec(name)?.[0] ?? "";
        } catch {}

        return namePattern.pattern.replaceAll("{name}", name);
    };
}

type TNamePattern = {
    regExp: string;
    pattern: string;
};

export type TTubeRenameConfig = {
    folder: TNamePattern;
    image: TNamePattern;
};
