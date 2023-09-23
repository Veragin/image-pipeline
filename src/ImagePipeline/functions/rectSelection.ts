import { TSelection } from '../ImageColection';
import { cutSelectionBySize } from './objectFind';
import { interSelection } from './selections';

export const rectToSelection = (rect: TRect, imgSize: TSize) => {
    const res: TSelection = [];

    const r = {
        x: Math.max(rect.x, 0),
        y: Math.max(rect.y, 0),
        width: Math.min(rect.width, imgSize.width - rect.x),
        height: Math.min(rect.height, imgSize.height - rect.y),
    };

    for (let y = r.y; y < r.y + r.height; y++) {
        res.push([imgSize.width * y + r.x, imgSize.width * y + r.x + r.width]);
    }

    return res;
};

export const selectionToRect = (selection: TSelection, size: TSize): TRect => {
    if (selection.length === 0)
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

    const cuttedSelection = cutSelectionBySize(selection, size);

    const x1 = Math.min(...cuttedSelection.map((sel) => sel[0] % size.width));
    const x2 = Math.max(...cuttedSelection.map((sel) => sel[1] % size.width));

    const y1 = Math.floor(cuttedSelection[0][0] / size.width);
    const y2 = Math.floor(cuttedSelection[cuttedSelection.length - 1][1] / size.width);

    return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1 + 1,
    };
};

export const selectionFromRectToSelection = (selection: TSelection, size: TSize, rect: TRect): TSelection => {
    const rectSelection = rectToSelection(rect, size);
    const validSelection = interSelection(selection, rectSelection);

    for (let sel of validSelection) {
        const y = Math.floor(sel[0] / size.width);
        const newY = y - rect.y;

        sel[0] -= y * size.width + rect.x - newY * rect.width;
        sel[1] -= y * size.width + rect.x - newY * rect.width;
    }

    return validSelection;
};
