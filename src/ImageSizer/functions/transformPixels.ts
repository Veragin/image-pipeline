import { pixelIndex } from "./pixelUtils";
import { rotatePoint } from "react-utils/Math";

export const mirrorPixels = (
    imgData: ImageData,
    vertical: boolean,
    horizontal: boolean
) => {
    if (!vertical && !horizontal) return imgData;

    const arr = new Uint8ClampedArray(imgData.width * imgData.height * 4);

    for (let y = 0; y < imgData.height; y++) {
        for (let x = 0; x < imgData.width; x++) {
            const index = pixelIndex({ x, y }, imgData.width);
            const newindex = pixelIndex(
                {
                    x: vertical ? imgData.width - x : x,
                    y: horizontal ? imgData.height - y : y,
                },
                imgData.width
            );

            arr[index] = imgData.data[newindex];
            arr[index + 1] = imgData.data[newindex + 1];
            arr[index + 2] = imgData.data[newindex + 2];
            arr[index + 3] = imgData.data[newindex + 3];
        }
    }

    return new ImageData(arr, imgData.width, imgData.height);
};

export const rotatePixels = (imgData: ImageData, alpha: number) => {
    const arr = new Uint8ClampedArray(imgData.width * imgData.height * 4);

    const offset = { x: imgData.width / 2, y: imgData.height / 2 };

    for (let y = 0; y < imgData.height; y++) {
        for (let x = 0; x < imgData.width; x++) {
            const pos = rotatePoint(alpha, offset, { x, y });

            const color = getInterpolarColorFromPos(imgData, pos);
            const index = pixelIndex({ x, y }, imgData.width);

            arr[index] = color.r;
            arr[index + 1] = color.g;
            arr[index + 2] = color.b;
            arr[index + 3] = color.a;
        }
    }

    return new ImageData(arr, imgData.width, imgData.height);
};

export const scalePixels = (imgData: ImageData, size: TSize) => {
    const arr = new Uint8ClampedArray(size.width * size.height * 4);

    for (let y = 0; y < size.height; y++) {
        for (let x = 0; x < size.width; x++) {
            const pos = {
                x: (x * imgData.width) / size.width,
                y: (y * imgData.height) / size.height,
            };

            const color = getInterpolarColorFromPos(imgData, pos);
            const index = pixelIndex({ x, y }, size.width);

            arr[index] = color.r;
            arr[index + 1] = color.g;
            arr[index + 2] = color.b;
            arr[index + 3] = color.a;
        }
    }

    return new ImageData(arr, size.width, size.height);
};

export const getInterpolarColorFromPos = (imgData: ImageData, pos: TPoint) => {
    if (
        pos.x < 0 ||
        pos.y < 0 ||
        pos.x >= imgData.width ||
        pos.y >= imgData.height
    ) {
        return { r: 0, g: 0, b: 0, a: 0 };
    }

    const a = { x: Math.floor(pos.x), y: Math.floor(pos.y) };
    const b = { x: Math.floor(pos.x) + 1, y: Math.floor(pos.y) };
    const c = { x: Math.floor(pos.x) + 1, y: Math.floor(pos.y) + 1 };
    const d = { x: Math.floor(pos.x), y: Math.floor(pos.y) + 1 };

    const ai = pixelIndex(a, imgData.width);
    const bi = pixelIndex(b, imgData.width);
    const ci = pixelIndex(c, imgData.width);
    const di = pixelIndex(d, imgData.width);

    const l1 = Math.abs(pos.x - a.x);
    const p1 = {
        r: imgData.data[ai] * (1 - l1) + imgData.data[bi] * l1,
        g: imgData.data[ai + 1] * (1 - l1) + imgData.data[bi + 1] * l1,
        b: imgData.data[ai + 2] * (1 - l1) + imgData.data[bi + 2] * l1,
        a: imgData.data[ai + 3] * (1 - l1) + imgData.data[bi + 3] * l1,
    };

    const l2 = Math.abs(pos.x - d.x);
    const p2 = {
        r: imgData.data[di] * (1 - l2) + imgData.data[ci] * l2,
        g: imgData.data[di + 1] * (1 - l2) + imgData.data[ci + 1] * l2,
        b: imgData.data[di + 2] * (1 - l2) + imgData.data[ci + 2] * l2,
        a: imgData.data[di + 3] * (1 - l2) + imgData.data[ci + 3] * l2,
    };

    const l3 = Math.abs(pos.y - a.y);
    return {
        r: Math.round(p1.r * (1 - l3) + p2.r * l3),
        g: Math.round(p1.g * (1 - l3) + p2.g * l3),
        b: Math.round(p1.b * (1 - l3) + p2.b * l3),
        a: Math.round(p1.a * (1 - l3) + p2.a * l3),
    };
};
