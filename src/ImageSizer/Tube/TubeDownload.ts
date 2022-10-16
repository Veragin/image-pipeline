import { ImageCollection, TImageItem } from "../ImageColection";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Tube } from "./Tube";
import { TubeDownloadComp } from "../TubeComponents/TubeDownloadComp";
import { getCanvasWithImageData } from "../functions/imageHandler";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export class TubeDownload extends Tube<TTubeDownloadConfig> {
    name = "Download";
    description = [
        _("Download images into your computer."),
        _("Multiple download tubes can be used in the pipeline."),
        _(
            "Choose format of the generated output image. Default format means that the format of the loaded image will be used."
        ),
    ];
    icon = DownloadRoundedIcon;
    comp = TubeDownloadComp;

    constructor() {
        super({
            format: "default",
            quality: 1,
            zip: false,
        });
    }

    show = async (imgCol: ImageCollection) => {};

    do = async (imgCol: ImageCollection) => {
        const globalZip: any | null = null;

        if (globalZip !== null) {
            let zip = globalZip;
            if (this.config.zip) {
                zip = globalZip.folder("name");
            }
            await this.addImagesToZipFolder(zip, imgCol);
            return;
        }

        if (this.config.zip) {
            return await this.downloadZip(imgCol);
        }

        imgCol.stack.forEach((item) => this.downloadImage(item));
    };

    private downloadImage = (item: TImageItem) => {
        const { canvas } = getCanvasWithImageData(item.data);
        const url = canvas.toDataURL(`image/${this.getFormat(item)}`, this.config.quality);
        saveAs(url, item.name);
    };

    private downloadZip = async (imgCol: ImageCollection) => {
        const zip = new JSZip();

        await this.addImagesToZipFolder(zip, imgCol);
        const blob = await zip.generateAsync({ type: "blob" });

        const fileName = "name";
        saveAs(blob, `${fileName}.zip`);
    };

    private addImagesToZipFolder = (zip: JSZip, imgCol: ImageCollection) => {
        return Promise.all(imgCol.stack.map((item) => this.addImageToZipFolder(zip, item)));
    };

    private addImageToZipFolder = async (zip: any, item: TImageItem) => {
        const blob = await this.imageToBlob(item);
        await zip.file(`${item.name}.${this.getFormat(item)}`, blob);
    };

    private imageToBlob(item: TImageItem): Promise<Blob> {
        return new Promise((resolve) => {
            const { canvas } = getCanvasWithImageData(item.data);
            canvas.toBlob((blob) => resolve(blob as Blob), `image/${this.getFormat(item)}`);
        });
    }

    private getFormat = (item: TImageItem) =>
        this.config.format === "default" ? item.format : this.config.format;
}

export type TTubeDownloadConfig = {
    format: TTubeDownloadFormat;
    quality: number;
    zip: boolean;
};

export type TTubeDownloadFormat = "default" | "png" | "jpeg";
