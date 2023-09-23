export const getCanvas = (size: TSize) => {
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    return canvas;
};

export const getCanvasWithImageData = (data: ImageData) => {
    const canvas = getCanvas(data);

    const ctx = canvas.getContext('2d');
    ctx?.putImageData(data, 0, 0);
    return { canvas, ctx };
};

export const getImageFromImageData = async (data: ImageData) => {
    const { canvas } = getCanvasWithImageData(data);

    const src = canvas.toDataURL('image/png', 1);
    const img = new Image(data.width, data.height);
    img.src = src;
    await img.decode();
    return img;
};
