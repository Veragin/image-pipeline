import { getCanvas } from "react-utils/canvas";

export interface LoadSource {
    getName: () => string;
    getImageData: () => Promise<ImageData | null>;
}

export class FileLoadSource implements LoadSource {
    constructor(private file: File) {}

    getName = () => this.file.name;
    getImageData = async () => {
        const btm = await createImageBitmap(this.file);
        return getImageData(btm);
    };
}

export class RemoteLoadSource implements LoadSource {
    constructor(private url: string) {}

    getName = () => this.url;
    getImageData = async () => {
        const img = new Image();

        const promise = new Promise((resolve) => (img.onload = resolve));
        img.src = this.url;
        img.crossOrigin = "Anonymous";
        await promise;

        return getImageData(img);
    };
}

const getImageData = (img: ImageBitmap | HTMLImageElement) => {
    const canvas = getCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0);

    return ctx.getImageData(0, 0, img.width, img.height);
};
