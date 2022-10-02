import { action, makeObservable, observable } from "mobx";

import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { ImageCollection } from "../ImageColection";
import { Tube } from "./Tube";
import { TubeLoadComp } from "../TubeComponents/TubeLoadComp";
import { getCanvas } from "react-utils/canvas";

export class TubeLoad extends Tube<{}> {
    id = 0;
    name = "Load";
    description = [_("Load images to service."), _("First image will be used as a preview.")];
    icon = DriveFolderUploadRoundedIcon;
    comp = TubeLoadComp;

    files: FileList | null = null;
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
        if (files?.length) {
            const file = files[0];
            this.preview = await this.readFile(file);
            this.previewName = file.name;
            this.onStart();
        } else {
            this.preview = null;
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
