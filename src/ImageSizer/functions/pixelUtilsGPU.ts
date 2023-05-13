import { COLOR } from "react-utils/Const/Color";
import { TColor } from "../../react-utils/Const/Types";

export function pixelIndexGPU(x: number, y: number, width: number) {
    return (y * width + x) * 4;
}

export function getPixelFormPosGPU(i: number, width: number) {
    return [i % width, Math.floor(i / width)];
}

export const colorFromPixelGPU = (pixel: TPoint, imgData: ImageData): TColor => {
    if (pixel.x >= imgData.width || pixel.y >= imgData.height) return COLOR.INVISIBLE;
    const index = pixelIndexGPU(pixel.x, pixel.y, imgData.width);
    return {
        r: imgData.data[index],
        g: imgData.data[index + 1],
        b: imgData.data[index + 2],
        a: imgData.data[index + 3],
    };
};

export const getRandomColorGPU = () => ({
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
    a: Math.random(),
});
