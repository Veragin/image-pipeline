import { ImageCollection, TImageItem } from "../ImageColection";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Tube } from "./Tube";
import { TubeDownloadComp } from "../TubeComponents/TubeDownloadComp";
import { getCanvasWithImageData } from "../functions/imageHandler";

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
        });
    }

    show = async (imgCol: ImageCollection) => {};

    do = async (imgCol: ImageCollection) => {
        imgCol.stack.forEach((item) => {
            const link = this.getImageUrl(item);
            this.downloadImage(link, item.name);
        });
    };

    private getImageUrl = (item: TImageItem) => {
        const { canvas } = getCanvasWithImageData(item.data);

        const format = this.config.format === "default" ? item.format : this.config.format;

        return canvas.toDataURL("image/" + format, this.config.quality);
    };

    private downloadImage = (imageLink: string, name: string) => {
        const tmpLink = document.createElement("a");
        tmpLink.download = name;
        tmpLink.href = imageLink;

        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    };
}

export type TTubeDownloadConfig = {
    format: TTubeDownloadFormat;
    quality: number;
};

export type TTubeDownloadFormat = "default" | "png" | "jpeg";
