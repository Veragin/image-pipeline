import { TTubeJoinConfig } from "ImageSizer/Tube/TubeJoin";
import { getPixelFormPos, pixelIndex } from "./pixelUtils";

export const joinPixels = (imgDatas: ImageData[], config: TTubeJoinConfig) => {
    const size = countSizeOfJoinedElements(imgDatas, config);

    const arr = new Uint8ClampedArray(size.width * size.height * 4);

    let rowTop = 0;
    let rowItemCount = 0;
    let rowLeft = 0;
    let nextTop = 0;
    for (let imgData of imgDatas) {
        // check if new row should be started
        if (shouldStartNewRow(rowLeft, rowItemCount, imgData.width, config)) {
            rowLeft = 0;
            rowTop = nextTop + config.horizontalGap;
            rowItemCount = 1;
            nextTop = nextTop + imgData.height + config.horizontalGap;
        } else {
            rowItemCount++;
            rowLeft += rowItemCount === 1 ? 0 : config.verticalGap;
            nextTop = Math.max(rowTop + imgData.height, nextTop);
        }

        // copy the pixel
        for (let i = 0; i < imgData.data.length; i += 4) {
            const pixel = getPixelFormPos(i / 4, imgData.width);
            const index = pixelIndex({ x: pixel.x + rowLeft, y: pixel.y + rowTop }, size.width);

            arr[index] += imgData.data[i];
            arr[index + 1] += imgData.data[i + 1];
            arr[index + 2] += imgData.data[i + 2];
            arr[index + 3] += imgData.data[i + 3];
        }

        rowLeft += imgData.width;
    }

    return new ImageData(arr, size.width, size.height);
};

export const countSizeOfJoinedElements = (sizes: TSize[], config: TTubeJoinConfig) => {
    const res: TSize = {
        width: 0,
        height: 0,
    };

    let rowTop = 0;
    let rowItemCount = 0;
    let rowWidth = 0;
    for (let size of sizes) {
        if (shouldStartNewRow(rowWidth, rowItemCount, size.width, config)) {
            rowWidth = size.width;
            rowTop = res.height + config.horizontalGap;
            rowItemCount = 1;
            res.height = res.height + size.height + config.horizontalGap;
        } else {
            rowItemCount++;
            rowWidth += rowItemCount === 1 ? size.width : size.width + config.verticalGap;
            res.height = Math.max(rowTop + size.height, res.height);
        }

        res.width = Math.max(res.width, rowWidth);
    }

    return res;
};

export const shouldStartNewRow = (
    rowWidth: number,
    rowItemCount: number,
    nextImageWidth: number,
    config: TTubeJoinConfig
) =>
    (config.imageNumberOnRow !== 0 && rowItemCount >= config.imageNumberOnRow) ||
    (config.maxWidth !== 0 && rowWidth + config.horizontalGap + nextImageWidth > config.maxWidth);
