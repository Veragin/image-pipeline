import { getPixelFormPos, pixelIndex } from './pixelUtils';

export const joinPixels = (imgDatas: ImageData[], imageNumberOnRow: number, maxWidth: number) => {
    const size = countSizeOfJoindElements(imgDatas, imageNumberOnRow, maxWidth);

    const arr = new Uint8ClampedArray(size.width * size.height * 4);

    let rowTop = 0;
    let rowItemsNumber = 0;
    let rowLeft = 0;
    let nextTop = 0;
    for (let imgData of imgDatas) {
        if (
            (imageNumberOnRow === 0 || rowItemsNumber < imageNumberOnRow) &&
            (maxWidth === 0 || rowLeft + imgData.width <= maxWidth)
        ) {
            rowItemsNumber++;
            if (rowTop + imgData.height > nextTop) {
                nextTop = rowTop + imgData.height;
            }
        } else {
            rowLeft = 0;
            rowTop = nextTop;
            rowItemsNumber = 1;
            nextTop = nextTop + imgData.height;
        }

        // copy the pixel
        for (let i = 0; i < imgData.data.length; i += 4) {
            const pixel = getPixelFormPos(i / 4, imgData.width);
            const index = pixelIndex({ x: pixel.x + rowLeft, y: pixel.y + rowTop }, size.width);

            arr[index] = imgData.data[i];
            arr[index + 1] = imgData.data[i + 1];
            arr[index + 2] = imgData.data[i + 2];
            arr[index + 3] = imgData.data[i + 3];
        }

        rowLeft += imgData.width;
    }

    return new ImageData(arr, size.width, size.height);
};

export const countSizeOfJoindElements = (sizes: TSize[], imageNumberOnRow: number, maxWidth: number) => {
    const res: TSize = {
        width: 0,
        height: 0,
    };

    let rowTop = 0;
    let rowItemsNumber = 0;
    let rowWidth = 0;
    for (let size of sizes) {
        if (
            (imageNumberOnRow === 0 || rowItemsNumber < imageNumberOnRow) &&
            (maxWidth === 0 || rowWidth + size.width <= maxWidth)
        ) {
            rowItemsNumber++;
            rowWidth += size.width;
            if (rowTop + size.height > res.height) {
                res.height = rowTop + size.height;
            }
        } else {
            rowWidth = size.width;
            rowTop = res.height;
            rowItemsNumber = 1;
            res.height = res.height + size.height;
        }

        if (res.width < rowWidth) {
            res.width = rowWidth;
        }
    }

    return res;
};
