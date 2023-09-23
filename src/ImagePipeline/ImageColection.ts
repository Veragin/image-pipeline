export type TSelection = [number, number][];
export class ImageCollection {
    folderName: string = "";
    stack: TImageItem[] = [];
}

export type TImageItem = {
    data: ImageData;
    name: string;
    format: string;
    index: number;
    selection: TSelection;
    objects: TImageObject[];
};

export type TImageObject = {
    selection: TSelection;
    rect: TRect;
};

export const copyImageColection = (col: ImageCollection) => {
    const res = new ImageCollection();

    res.stack = col.stack.map((item) => ({
        data: copyImageData(item.data),
        name: item.name,
        format: item.format,
        index: item.index,
        selection: copySelection(item.selection),
        objects: copyObjects(item.objects),
    }));
    res.folderName = col.folderName;

    return res;
};

const copyImageData = (imgData: ImageData) => {
    const arr = new Uint8ClampedArray(imgData.data);
    return new ImageData(arr, imgData.width, imgData.height);
};

const copySelection = (sel: TSelection): [number, number][] => {
    return sel.map((s) => [...s]);
};

const copyObjects = (objs: TImageObject[]): TImageObject[] => {
    return objs.map((o) => ({
        rect: { ...o.rect },
        selection: copySelection(o.selection),
    }));
};
