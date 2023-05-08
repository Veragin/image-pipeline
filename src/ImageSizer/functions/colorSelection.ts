import { TSelection } from "../ImageColection";
import { colorFromPixel } from "./pixelUtils";
import { getHistograph } from "./histograph";
import { rgbToHsv } from "react-utils/color";

/******************************************************************
 ********* Color selection
 ******************************************************************/

export const colorToSelection = (color: TColor, threshold: number, imgData: ImageData) => {
    if (color === null) return [];

    const isColor = getIsColor(color, threshold);

    return pixelSelection(isColor, imgData);
};

const getIsColor = (color: TColor, threshold: number) => {
    if (color === null) return () => false;

    const t = threshold * 255 * 255;

    return (r: number, g: number, b: number) =>
        (r - color.r) * (r - color.r) +
            (g - color.g) * (g - color.g) +
            (b - color.b) * (b - color.b) <=
        t;
};

/******************************************************************
 ********* Hue selection
 ******************************************************************/

export const hueToSelection = (hue: number, threshold: number, imgData: ImageData) => {
    const realHue = Math.abs(hue) % 360;
    const t = threshold * 360 * (threshold * 360);

    const isColor = (r: number, g: number, b: number) => {
        const h = rgbToHsv(r, g, b).h;
        return (h - realHue) * (h - realHue) < t;
    };

    return pixelSelection(isColor, imgData);
};

/******************************************************************
 ********* Saturation selection
 ******************************************************************/

export const saturationToSelection = (
    saturation: number,
    threshold: number,
    imgData: ImageData
) => {
    const isColor = getIsSaturation(saturation, threshold);

    return pixelSelection(isColor, imgData);
};

const getIsSaturation = (saturation: number, t: number) => {
    return (r: number, g: number, b: number) => rgbToHsv(r, g, b).s - saturation < t / 255;
};

/******************************************************************
 ********* Alpha selection
 ******************************************************************/

export const alphaToSelection = (alpha: number, threshold: number, imgData: ImageData) => {
    const t = threshold * 255 * 255;
    const alpha255 = alpha * 255;
    return pixelSelection((r, g, b, a) => (a - alpha255) * (a - alpha255) < t, imgData);
};

const pixelSelection = (
    shouldSelectPixel: (r: number, g: number, b: number, a: number) => boolean,
    imgData: ImageData
) => {
    const res: TSelection = [];
    const length = imgData.width * imgData.height;
    const d = imgData.data;

    let lastI: number | null = null;
    let lastStart: number | null = null;

    for (let i = 0; i < length; i++) {
        if (shouldSelectPixel(d[4 * i], d[4 * i + 1], d[4 * i + 2], d[4 * i + 3])) {
            if (lastI === i - 1) {
                lastI = i;
            } else {
                if (lastStart !== null && lastI !== null) {
                    res.push([lastStart, lastI]);
                }
                lastStart = i;
                lastI = i;
            }
        }
    }

    if (lastStart !== null && lastI !== null) {
        res.push([lastStart, lastI]);
    }

    return res;
};

/******************************************************************
 ********* Neighbour selection
 ******************************************************************/

export const neighborToSelectionByBaseColor = (threshold: number, imgData: ImageData) => {
    const histograph = getHistograph(imgData);
    histograph.sort((a, b) => a.count - b.count);

    const color: TColor = histograph[0].color ?? null;

    return neighborToSelectionByColor(color, threshold, imgData);
};

export const neighborToSelectionByColor = (
    color: TColor,
    threshold: number,
    imgData: ImageData
) => {
    const isColor = getIsColor(color, 0);
    const data = imgData.data;

    let pixel: TPoint = { x: 0, y: 0 };
    for (let i = 0; i < imgData.width * imgData.height; i++) {
        if (isColor(data[4 * i], data[4 * i + 1], data[4 * i + 2])) {
            pixel.x = (4 * i) % imgData.width;
            pixel.y = Math.floor((4 * i) / imgData.width);
            break;
        }
    }

    return neighborToSelection(pixel, threshold, imgData);
};

export const neighborToSelection = (pixel: TPoint, threshold: number, imgData: ImageData) => {
    const baseColor = colorFromPixel(pixel, imgData);
    const isColor = getIsColor(baseColor, threshold);

    const matrix = getNeighborMatrix(isColor, pixel, imgData);
    return convertMatrixToSelction(matrix);
};

const getNeighborMatrix = (
    isSamePixel: (r: number, g: number, b: number, a: number) => boolean,
    pixel: TPoint,
    imgData: ImageData
) => {
    const data = imgData.data;

    const matrix: (number | undefined)[][] = Array(imgData.height);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = Array(imgData.width).fill(undefined);
    }

    const pixelStack = [pixel];

    while (pixelStack.length > 0) {
        const currPix = pixelStack.pop() as TPoint;

        if (matrix[currPix.y][currPix.x] === undefined) {
            const d = (currPix.y * imgData.width + currPix.x) * 4;
            const isSame = isSamePixel(data[d], data[d + 1], data[d + 2], data[d + 3]);

            if (isSame) {
                matrix[currPix.y][currPix.x] = 1;
            } else {
                matrix[currPix.y][currPix.x] = 0;
                continue;
            }
        }

        if (currPix.x - 1 >= 0 && matrix[currPix.y][currPix.x - 1] === undefined) {
            pixelStack.push({ x: currPix.x - 1, y: currPix.y });
        }

        if (currPix.x + 1 < imgData.width && matrix[currPix.y][currPix.x + 1] === undefined) {
            pixelStack.push({ x: currPix.x + 1, y: currPix.y });
        }

        if (currPix.y - 1 >= 0 && matrix[currPix.y - 1][currPix.x] === undefined) {
            pixelStack.push({ x: currPix.x, y: currPix.y - 1 });
        }

        if (currPix.y + 1 < imgData.height && matrix[currPix.y + 1][currPix.x] === undefined) {
            pixelStack.push({ x: currPix.x, y: currPix.y + 1 });
        }
    }

    return matrix;
};

const convertMatrixToSelction = (matrix: (number | undefined)[][]) => {
    const width = matrix[0].length ?? 0;
    const height = matrix.length ?? 0;

    const res: TSelection = [];
    let last: number | null = null;

    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (matrix[h][w]) {
                if (last === null) {
                    last = h * width + w;
                }
            } else {
                if (last !== null) {
                    res.push([last, h * width + w]);
                    last = null;
                }
            }
        }
    }

    if (last !== null) {
        res.push([last, width * height - 1]);
    }

    return res;
};
