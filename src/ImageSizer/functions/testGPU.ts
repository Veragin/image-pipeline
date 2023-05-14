import { GPU } from "gpu.js";
import { pixelIndexGPU, rotatePointGPU } from "./pixelUtilsGPU";
import { loadImageData } from "react-utils/canvas";
import { rotatePixelsGPU } from "./transformPixelsGPU";
import { rotatePixels } from "./transformPixels";

const gpu = new GPU();
gpu.addFunction(pixelIndexGPU);
gpu.addFunction(rotatePointGPU);

export const testGPU = async () => {
    //const imgData = await loadImageData("./examples/handbag_3.png");
    const imgData = await loadImageData("./wallpaper.jpg");
    const angle = (-1 / 180) * Math.PI;

    console.time("GPU");
    const res = rotatePixelsGPU(imgData, angle);
    console.timeEnd("GPU");

    console.time("CPU");
    const res1 = rotatePixels(imgData, angle);
    console.timeEnd("CPU");
    /*const kernel = gpu.createKernel(
        function (data: number[], angle: number) {
            const pixel = [this.thread.x, this.thread.y] as TPointGPU;
            const offset = [this.output.x / 2, this.output.y / 2] as TPointGPU;

            const pos = rotatePointGPU(angle, offset, pixel);
            return pos[0];
        },
        {
            output: [3, 3],
        }
    );

    const arr = kernel(
        [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 50, 67, 91,
        ],
        -1
    );
    console.log(arr);

    return imgData;*/
};
