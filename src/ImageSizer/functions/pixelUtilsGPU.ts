export type TPointGPU = [number, number];
export type TColorGPU = [number, number, number, number];

export function pixelIndexGPU(pixel: TPointGPU, width: number) {
    return (pixel[1] * width + pixel[0]) * 4;
}

export function getPixelFormPosGPU(i: number, width: number): TPointGPU {
    return [i % width, Math.floor(i / width)];
}

export function rotatePointGPU(alpha: number, s: TPointGPU, a: TPointGPU): TPointGPU {
    return [
        s[0] + Math.cos(alpha) * (a[0] - s[0]) - Math.sin(alpha) * (a[1] - s[1]),
        s[1] + Math.sin(alpha) * (a[0] - s[0]) + Math.cos(alpha) * (a[1] - s[1]),
    ];
}

export function colorFromPixelGPU(
    pixel: TPointGPU,
    data: number[],
    width: number,
    height: number
): TColorGPU {
    if (pixel[0] >= width || pixel[1] >= height) return [0, 0, 0, 0];
    const index = pixelIndexGPU(pixel, width);
    return [data[index] / 255, data[index + 1] / 255, data[index + 2] / 255, data[index + 3] / 255];
}

export function getRandomColorGPU(): TColorGPU {
    return [Math.random(), Math.random(), Math.random(), Math.random()];
}
