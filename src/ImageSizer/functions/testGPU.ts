import { GPU } from "gpu.js";
import { pixelIndexGPU } from "./pixelUtilsGPU";

const gpu = new GPU();
gpu.addFunction(pixelIndexGPU);

export const testGPU = (imgData?: ImageData, vertical?: boolean, horizontal?: boolean) => {
    const kernel = gpu.createKernel(
        function (data: number[], vertical: boolean, horizontal: boolean) {
            const x = vertical ? this.output.x - this.thread.x - 1 : this.thread.x;
            const y = horizontal ? this.output.y - this.thread.y - 1 : this.thread.y;
            const newIndex = pixelIndexGPU(x, y, this.output.x);
            return data[newIndex];
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
        true,
        false
    );
    console.log(arr);

    return imgData;
};
