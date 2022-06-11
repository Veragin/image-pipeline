import { ImageCollection, TImageItem } from "../ImageColection";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Tech } from "./Tech";
import { TechDownloadComp } from "../TechComponents/TechDownloadComp";
import { getCanvasWithImageData } from "../functions/imageHandler";

export class TechDownload extends Tech<TTechDownloadConfig> {
    name = "Download";
    description = "Download images into your computer.";
    icon = DownloadRoundedIcon;
    comp = TechDownloadComp;

    constructor() {
        super({
            type: "default",
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

        const format = this.config.type === "default" ? item.format : this.config.type;

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

export type TTechDownloadConfig = {
    type: TTechDownloadType;
    quality: number;
};

export type TTechDownloadType = "default" | "png" | "jpeg";
