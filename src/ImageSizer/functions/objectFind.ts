import { TSelection } from '../ImageColection';
import { getPixelFormPos } from './pixelUtils';

export const getObjectsFromSelection = (selection: TSelection, size: TSize, compactDistance: number) => {
    const cuttedSelection = cutSelectionBySize(selection, size);

    let res: TSelection[] = [];

    for (let sel of cuttedSelection) {
        const { x: x0, y } = getPixelFormPos(sel[0], size.width);
        const { x: x1 } = getPixelFormPos(sel[1], size.width);
        let firstObj: TSelection | null = null;

        for (let obj of res) {
            for (let objSel of obj) {
                const { x: objSelX0, y: objSelY } = getPixelFormPos(objSel[0], size.width);
                const { x: objSelX1 } = getPixelFormPos(objSel[1], size.width);

                if (Math.abs(y - objSelY) <= 1 + compactDistance) {
                    if (
                        (x1 + compactDistance >= objSelX1 && x0 <= objSelX1 + compactDistance) ||
                        (x0 <= objSelX0 + compactDistance && x1 + compactDistance >= objSelX0)
                    ) {
                        if (firstObj === null) {
                            firstObj = obj;
                            obj.push(sel);
                        } else {
                            // join them together
                            firstObj.push(...obj);
                            obj.splice(0, obj.length);
                            // empty array will be skipped
                        }
                        break;
                    }
                }
            }
        }

        res = res.filter((obj) => obj.length > 0);

        if (firstObj === null) {
            res.push([sel]);
        }
    }

    return res;
};

export const cutSelectionBySize = (selection: TSelection, size: TSize) => {
    if (selection.length === 0) return [];
    const res: TSelection = [];

    let sel: [number, number] | null = [...selection[0]];
    let index = 0;

    while (sel !== null) {
        const startY = Math.floor(sel[0] / size.width);
        const endY = Math.floor(sel[1] / size.width);

        if (startY !== endY) {
            res.push([sel[0], (startY + 1) * size.width - 1]);
            sel[0] = (startY + 1) * size.width;
        } else {
            res.push(sel);

            index++;
            if (index >= selection.length) {
                sel = null;
            } else {
                sel = [...selection[index]];
            }
        }
    }

    return res;
};

export const countPixelsInSelection = (selection: TSelection) => {
    let res = 0;
    for (let sel of selection) {
        res += sel[1] - sel[0] + 1;
    }
    return res;
};
