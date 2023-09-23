import { TSelection } from 'ImagePipeline/ImageColection';
import { THsvColor, hsvToRgb, rgbToHsv } from 'react-utils/color';

/****************************************************
 ************ Apply color
 ****************************************************/

export const applyHsvToImage = (data: ImageData, selection: TSelection | null, hsv: THsvColor) => {
    const color = hsvToRgb(hsv);
    applyColorToImage(data, selection, color);
};

export const applyColorToImage = (data: ImageData, selection: TSelection | null, color: TColor) => {
    loopThrough(
        data,
        selection
    )((i) => {
        data.data[i * 4] = color?.r ?? 0;
        data.data[i * 4 + 1] = color?.g ?? 0;
        data.data[i * 4 + 2] = color?.b ?? 0;
        data.data[i * 4 + 3] = (color?.a ?? 0) * 255;
    });
};

export const invertColorInImage = (data: ImageData, selection: TSelection | null) => {
    loopThrough(
        data,
        selection
    )((i) => {
        data.data[i * 4] = 255 - data.data[i * 4];
        data.data[i * 4 + 1] = 255 - data.data[i * 4 + 1];
        data.data[i * 4 + 2] = 255 - data.data[i * 4 + 2];
    });
};

/****************************************************
 ************ Shift color
 ****************************************************/

export const shiftHsvInImage = (data: ImageData, selection: TSelection | null, hsv: THsvColor) => {
    loopThrough(
        data,
        selection
    )((i) => {
        const currentHsv = rgbToHsv(data.data[i * 4], data.data[i * 4 + 1], data.data[i * 4 + 2]);
        const shiftedHsv = {
            h: currentHsv.h + hsv.h,
            s: capAlphaValue(currentHsv.s + hsv.s),
            v: capAlphaValue(currentHsv.v + hsv.v),
        };
        const color = hsvToRgb({ ...shiftedHsv, a: hsv.a });
        data.data[i * 4] = color?.r ?? 0;
        data.data[i * 4 + 1] = color?.g ?? 0;
        data.data[i * 4 + 2] = color?.b ?? 0;
        data.data[i * 4 + 3] = capColorValue(data.data[i * 4 + 3] + (hsv?.a ?? 0) * 255);
    });
};

export const shiftColorInImage = (data: ImageData, selection: TSelection | null, color: TColor) => {
    loopThrough(
        data,
        selection
    )((i) => {
        data.data[i * 4] = capColorValue(data.data[i * 4] + color?.r ?? 0);
        data.data[i * 4 + 1] = capColorValue(data.data[i * 4 + 1] + color?.g ?? 0);
        data.data[i * 4 + 2] = capColorValue(data.data[i * 4 + 2] + color?.b ?? 0);
        data.data[i * 4 + 3] = capColorValue(data.data[i * 4 + 3] + (color?.a ?? 0) * 255);
    });
};

const capColorValue = (v: number) => Math.max(0, Math.min(255, Math.floor(v)));
const capAlphaValue = (v: number) => Math.max(0, Math.min(1, v));

/****************************************************
 ************ loop through
 ****************************************************/

const loopThrough = (data: ImageData, selection: TSelection | null) => {
    if (selection === null) return loopThrougPixelData(data);
    return loopThrougSelection(selection);
};

const loopThrougPixelData = (data: ImageData) => (toDo: (i: number) => void) => {
    const length = data.data.length / 4;
    for (let i = 0; i < length; i++) {
        toDo(i);
    }
};

const loopThrougSelection = (selection: TSelection) => (toDo: (i: number) => void) => {
    for (let r of selection) {
        for (let i = r[0]; i <= r[1]; i++) {
            toDo(i);
        }
    }
};
