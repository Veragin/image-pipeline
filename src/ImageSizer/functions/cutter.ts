import { ImageCollection } from "../ImageColection";
import { TImageItem } from "../ImageColection";
import { selectionFromRectToSelection } from "./rectSelection";

export const cutImageDataByObjects = (original: TImageItem) => {
    const collection = new ImageCollection();

    let index = 0;
    for (let obj of original.objects) {
        collection.stack.push({
            data: cutImageDataByRect(obj.rect, original.data),
            selection: selectionFromRectToSelection(obj.selection, original.data, obj.rect),
            name: original.name,
            format: original.format,
            index,
            objects: [],
        });
        index++;
    }

    return collection;
};

export const cutImageDataByFixed = (original: TImageItem, fixed: TSize) => {
    const collection = new ImageCollection();

    const xNumber = Math.ceil(original.data.width / fixed.width);
    const yNumber = Math.ceil(original.data.height / fixed.height);

    let index = 0;

    for (let y = 0; y < yNumber; y++) {
        for (let x = 0; x < xNumber; x++) {
            const rect = {
                ...fixed,
                x: x * fixed.height,
                y: y * fixed.height,
            };

            collection.stack.push({
                data: cutImageDataByRect(rect, original.data),
                selection: selectionFromRectToSelection(original.selection, original.data, rect),
                name: original.name,
                format: original.format,
                index,
                objects: [],
            });
            index++;
        }
    }

    return collection;
};

export const cutImageDataByPercent = (
    original: TImageItem,
    percent: {
        columns: number[];
        rows: number[];
    }
) => {
    const collection = new ImageCollection();

    if (percent.columns.length === 0) percent.columns.push(1);
    if (percent.rows.length === 0) percent.rows.push(1);

    const xNumber = percent.columns.reduce((res, c) => res + c);
    const yNumber = percent.rows.reduce((res, c) => res + c);

    const sizesX = percent.columns.map((per) => Math.floor((original.data.width * per) / xNumber));
    const sizesY = percent.rows.map((per) => Math.floor((original.data.height * per) / yNumber));

    let index = 0;
    let x = 0;
    let y = 0;

    for (let height of sizesY) {
        x = 0;
        for (let width of sizesX) {
            const rect = {
                x,
                y,
                width,
                height,
            };

            collection.stack.push({
                data: cutImageDataByRect(rect, original.data),
                selection: selectionFromRectToSelection(original.selection, original.data, rect),
                name: original.name,
                format: original.format,
                index,
                objects: [],
            });

            x += width;
            index++;
        }
        y += height;
    }

    return collection;
};

export const cutImageDataByRect = (rect: TRect, imgData: ImageData) => {
    const arr = new Uint8ClampedArray(rect.width * rect.height * 4);

    for (let y = rect.y; y < rect.y + rect.height; y++) {
        if (y < 0 || y >= imgData.height) continue;

        for (let x = rect.x; x < rect.x + rect.width; x++) {
            if (x < 0 || x >= imgData.width) continue;

            const resPixel = 4 * ((y - rect.y) * rect.width + x - rect.x);
            const dataPixel = 4 * (y * imgData.width + x);

            arr[resPixel] = imgData.data[dataPixel];
            arr[resPixel + 1] = imgData.data[dataPixel + 1];
            arr[resPixel + 2] = imgData.data[dataPixel + 2];
            arr[resPixel + 3] = imgData.data[dataPixel + 3];
        }
    }

    return new ImageData(arr, rect.width, rect.height);
};
