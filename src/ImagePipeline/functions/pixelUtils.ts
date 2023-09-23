import { COLOR } from "react-utils/Const/Color";
import { TColor } from "../../react-utils/Const/Types";

export const pixelIndex = (pixel: TPoint, width: number) => (pixel.y * width + pixel.x) * 4;

export const colorFromPixel = (pixel: TPoint, imgData: ImageData): TColor => {
    if (pixel.x >= imgData.width || pixel.y >= imgData.height) return COLOR.INVISIBLE;
    const index = pixelIndex(pixel, imgData.width);
    return {
        r: imgData.data[index],
        g: imgData.data[index + 1],
        b: imgData.data[index + 2],
        a: imgData.data[index + 3],
    };
};

export const getPixelFormPos = (i: number, width: number) => ({
    x: i % width,
    y: Math.floor(i / width),
});

export const getRandomColor = () => ({
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
    a: Math.random(),
});
