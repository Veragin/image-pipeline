import { GPU } from 'gpu.js';
import { TColorGPU, TPointGPU, pixelIndexGPU, rotatePointGPU } from './pixelUtilsGPU';

const gpu = new GPU();
gpu.addFunction(pixelIndexGPU);
gpu.addFunction(rotatePointGPU);
gpu.addFunction(getInterpolarColorFromPosGPU);

export const mirrorPixelsGPU = (imgData: ImageData, vertical: boolean, horizontal: boolean) => {
    if (!vertical && !horizontal) return imgData;

    // !!! GPU handles imagest horizontally mirrored
    const kernel = gpu.createKernel(
        function (data: number[], vertical: boolean, horizontal: boolean) {
            const x = vertical ? this.output.x - this.thread.x - 1 : this.thread.x;
            const y = horizontal ? this.thread.y : this.output.y - this.thread.y - 1;
            const newIndex = pixelIndexGPU([x, y], this.output.x);

            this.color(
                data[newIndex] / 255,
                data[newIndex + 1] / 255,
                data[newIndex + 2] / 255,
                data[newIndex + 3] / 255
            );
        },
        {
            output: [imgData.width, imgData.height],
            graphical: true,
        }
    );

    kernel(imgData.data, vertical, horizontal);
    return new ImageData(kernel.getPixels() as any, imgData.width, imgData.height);
};

export const rotatePixelsGPU = (imgData: ImageData, angle: number) => {
    console.log('angle', angle);
    const kernel = gpu.createKernel(
        function (data: number[], angle: number) {
            const pixel = [this.thread.x, this.output.y - 1 - this.thread.y] as TPointGPU;
            const offset = [this.output.x / 2, this.output.y / 2] as TPointGPU;

            const pos = rotatePointGPU(angle, offset, pixel);
            const color = getInterpolarColorFromPosGPU(data, pos, this.output.x, this.output.y);

            this.color(color[0], color[1], color[2], color[3]);
        },
        {
            output: [imgData.width, imgData.height],
            graphical: true,
        }
    );

    kernel(imgData.data, angle);
    return new ImageData(kernel.getPixels() as any, imgData.width, imgData.height);
};

export const scalePixelsGPU = (imgData: ImageData, size: TSize) => {
    const kernel = gpu.createKernel(
        function (data: number[], dataWidth: number, dataHeight: number) {
            const pixel = [this.thread.x, this.output.y - this.thread.y - 1] as TPointGPU;
            const pos = [
                (pixel[0] * dataWidth) / this.output.x,
                (pixel[1] * dataHeight) / this.output.y,
            ] as TPointGPU;
            const color = getInterpolarColorFromPosGPU(data, pos, dataWidth, dataHeight);

            this.color(color[0], color[1], color[2], color[3]);
        },
        {
            output: [size.width, size.height],
            graphical: true,
        }
    );

    kernel(imgData.data, imgData.width, imgData.height);
    return new ImageData(kernel.getPixels() as any, size.width, size.height);
};

function getInterpolarColorFromPosGPU(
    data: number[],
    pixel: TPointGPU,
    dataWidth: number,
    dataHeight: number
): TColorGPU {
    if (pixel[0] < 0 || pixel[1] < 0 || pixel[0] > dataWidth - 1 || pixel[1] > dataHeight - 1) {
        return [0, 0, 0, 0];
    }

    const a = [Math.floor(pixel[0]), Math.floor(pixel[1])] as TPointGPU;
    const b = [Math.ceil(pixel[0]), Math.floor(pixel[1])] as TPointGPU;
    const c = [Math.ceil(pixel[0]), Math.ceil(pixel[1])] as TPointGPU;
    const d = [Math.floor(pixel[0]), Math.ceil(pixel[1])] as TPointGPU;

    const ai = pixelIndexGPU(a, dataWidth);
    const bi = pixelIndexGPU(b, dataWidth);
    const ci = pixelIndexGPU(c, dataWidth);
    const di = pixelIndexGPU(d, dataWidth);

    const l1 = Math.abs(pixel[0] - a[0]);
    const p1 = [
        data[ai] * (1 - l1) + data[bi] * l1,
        data[ai + 1] * (1 - l1) + data[bi + 1] * l1,
        data[ai + 2] * (1 - l1) + data[bi + 2] * l1,
        data[ai + 3] * (1 - l1) + data[bi + 3] * l1,
    ];

    const l2 = Math.abs(pixel[0] - d[0]);
    const p2 = [
        data[di] * (1 - l2) + data[ci] * l2,
        data[di + 1] * (1 - l2) + data[ci + 1] * l2,
        data[di + 2] * (1 - l2) + data[ci + 2] * l2,
        data[di + 3] * (1 - l2) + data[ci + 3] * l2,
    ];

    const l3 = Math.abs(pixel[1] - a[1]);
    return [
        (p1[0] * (1 - l3) + p2[0] * l3) / 255,
        (p1[1] * (1 - l3) + p2[1] * l3) / 255,
        (p1[2] * (1 - l3) + p2[2] * l3) / 255,
        (p1[3] * (1 - l3) + p2[3] * l3) / 255,
    ];
}
