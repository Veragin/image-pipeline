import { loadImageData } from "react-utils/canvas";
import { mirrorPixels, rotatePixels, scalePixels } from "./transformPixels";
import { mirrorPixelsGPU, rotatePixelsGPU, scalePixelsGPU } from "./transformPixelsGPU";

const dataPromise = loadImageData("./examples/handbag_3.png");

export const testAll = async () => {
    console.log("TEST: transformPixels");
    const imgData = await dataPromise;

    testMirrorPixelsALL(imgData);
    testRotatePixelsALL(imgData);
    testScalePixelsAll(imgData);
};

export const testSingle = async () => {
    console.log("TEST: transformPixels");
    const imgData = await dataPromise;

    testRotatePixelsGPU(imgData, Math.PI / 4);
};

const compareImageData = (a: ImageData, b: ImageData) => {
    try {
        if (a.width !== b.width)
            throw new Error(`width of image data does not match ${a.width} & ${b.width}`);
        if (a.height !== b.height)
            throw new Error(`height of image data does not match ${a.height} & ${b.height}`);

        const problems = [0, 0, 0, 0];
        for (let i in a.data) {
            if (a.data[i] !== b.data[i]) {
                problems[Number(i) % 4] += 1;
            }
        }

        if (problems.some((p) => p > 0)) {
            throw new Error(`Problems in matches found ${JSON.stringify(problems)}`);
        }
        console.log("Test successful");
    } catch (e: any) {
        console.error(e.message);
    }
};

/****************************************************
 **********    Mirror test
 ****************************************************/

const mirrorComb = [
    { vertical: false, horizontal: false },
    { vertical: true, horizontal: false },
    { vertical: false, horizontal: true },
    { vertical: true, horizontal: true },
];

const testMirrorPixelsALL = (imgData: ImageData) => {
    console.log("TEST transformPixels CASE: mirrorPixelsGPU");

    for (let config of mirrorComb) {
        testMirrorPixelsGPU(imgData, config);
    }
};

const testMirrorPixelsGPU = (imgData: ImageData, config: (typeof mirrorComb)[number]) => {
    console.log("TEST transformPixels CASE mirrorPixelsGPU CONFIG: " + JSON.stringify(config));

    const cpu = mirrorPixels(imgData, config.vertical, config.horizontal);
    const gpu = mirrorPixelsGPU(imgData, config.vertical, config.horizontal);

    compareImageData(cpu, gpu);
};

/****************************************************
 **********    Rotate test
 ****************************************************/

const angles = [0, 0.1, Math.PI, 2 * Math.PI, -12];

const testRotatePixelsALL = (imgData: ImageData) => {
    console.log("TEST transformPixels CASE: rotatePixelsGPU");

    for (let angle of angles) {
        testRotatePixelsGPU(imgData, angle);
    }
};

const testRotatePixelsGPU = (imgData: ImageData, angle: number) => {
    console.log("TEST transformPixels CASE rotatePixelsGPU ANGLE: " + angle);

    const cpu = rotatePixels(imgData, angle);
    const gpu = rotatePixelsGPU(imgData, angle);

    compareImageData(cpu, gpu);
};

/****************************************************
 **********    Scale test
 ****************************************************/

const SCALES: TSize[] = [
    { width: 50, height: 50 },
    { width: 500, height: 500 },
];

const testScalePixelsAll = (imgData: ImageData) => {
    console.log("TEST transformPixels CASE: testScalePixelsGPU");

    for (let scale of SCALES) {
        testScalePixelsGPU(imgData, scale);
    }
};

const testScalePixelsGPU = (imgData: ImageData, scale: TSize) => {
    console.log("TEST transformPixels CASE testScalePixelsGPU CONFIG: " + JSON.stringify(scale));

    const cpu = scalePixels(imgData, scale);
    const gpu = scalePixelsGPU(imgData, scale);

    compareImageData(cpu, gpu);
};
