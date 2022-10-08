import { action, makeObservable, observable } from "mobx";

import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeLoadComp } from "../TubeComponents/TubeLoadComp";
import { getCanvas } from "react-utils/canvas";

export class TubeLoad extends Tube<{}> {
    id = 0;
    name = "Load";
    description = [
        _(
            "Load images into service. This tube cannot be removed, added more times and is the first tube in the pipeline."
        ),
        _("Selected image file will be used as a preview."),
        _("While you start the pipeline, all loaded files will be proccessed."),
    ];
    icon = DriveFolderUploadRoundedIcon;
    comp = TubeLoadComp;

    files: FileList | null = null;
    selectedIndex: null | number = null;
    preview: ImageData | null = null;
    previewName: string = "default";

    constructor(private onStart: () => void) {
        super({});
        makeObservable(this, {
            files: observable,
            preview: observable,
            previewName: observable,
            load: action,
        });
    }

    do = async (imgCol: ImageCollection) => {};

    load = async (files: FileList | null) => {
        this.files = files;
        await this.switchPreview(0);
    };

    switchPreview = async (index: number) => {
        if (this.files?.length && index < this.files?.length) {
            this.selectedIndex = index;
            const file = this.files[index];
            this.preview = await this.readFile(file);
            this.previewName = file.name;
            this.onStart();
        } else {
            this.preview = null;
            this.selectedIndex = null;
        }
    };

    readFile = async (file: File) => {
        const btm = await createImageBitmap(file);

        const canvas = getCanvas(btm.width, btm.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        ctx.drawImage(btm, 0, 0);

        return ctx.getImageData(0, 0, btm.width, btm.height);
    };

    getFileNames = () => {
        if (this.files === null) return [];

        const names: string[] = [];
        for (let i = 0; i < this.files.length; i++) {
            names.push(this.files[i].name);
        }

        return names;
    };
}
