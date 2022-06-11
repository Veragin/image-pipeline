import { TSelection } from 'ImageSIzer/ImageColection';

export const corectSelection = (data: TSelection) => {
    if (data.length === 0) return [];

    const res: TSelection = [];

    const sortedData = data.sort((a, b) => a[0] - b[0]);

    let maxVal: [number, number] = [...sortedData[0]];
    for (let i = 1; i < sortedData.length; i++) {
        if (maxVal[1] >= sortedData[i][0] - 1) {
            maxVal[1] = Math.max(sortedData[i][1], maxVal[1]);
        } else {
            res.push(maxVal);
            maxVal = [...sortedData[i]];
        }
    }
    res.push(maxVal);

    return res;
};

export const addSelection = (oldSel: TSelection, newSel: TSelection) => {
    const data = [...oldSel, ...newSel];
    return corectSelection(data);
};

export const subSelection = (oldSel: TSelection, newSel: TSelection) => {
    if (oldSel.length === 0) return [];

    const oldS = corectSelection(oldSel);
    const newS = corectSelection(newSel);

    const res: TSelection = [];

    for (let i = 0; i < oldS.length; i++) {
        let maxVal: [number, number] = [...oldS[i]];

        let addSelection = true;
        newS.forEach((nS) => {
            if (nS[0] <= maxVal[0] && nS[1] >= maxVal[0]) {
                if (nS[1] >= maxVal[1] - 1) {
                    addSelection = false;
                } else {
                    maxVal[0] = nS[1] + 1;
                }
            } else if (nS[0] <= maxVal[1] && nS[0] >= maxVal[0]) {
                if (nS[1] >= maxVal[1] - 1) {
                    maxVal[1] = nS[0] - 1;
                } else {
                    const next: [number, number] = [nS[1] + 1, maxVal[1]];
                    maxVal[1] = nS[0] - 1;
                    res.push(maxVal); // newS is sorted, so I know that is final
                    maxVal = next;
                }
            }
        });

        if (addSelection) {
            res.push(maxVal);
        }
    }

    return res;
};

export const interSelection = (oldSel: TSelection, newSel: TSelection) => {
    if (oldSel.length === 0 || newSel.length === 0) return [];

    const oldS = corectSelection(oldSel);
    const newS = corectSelection(newSel);

    const res: TSelection = [];

    for (let i = 0; i < oldS.length; i++) {
        const oS = oldS[i];

        newS.forEach((nS) => {
            const start = Math.max(nS[0], oS[0]);
            const end = Math.min(nS[1], oS[1]);

            if (end >= start) {
                res.push([start, end]);
            }
        });
    }

    return corectSelection(res);
};

export const inverseSelection = (sel: TSelection, fullLength: number): TSelection => {
    if (sel.length === 0) return [[0, fullLength - 1]];

    const s = corectSelection(sel);
    const res: TSelection = [];

    let val = s[0];
    if (val[0] > 0) {
        res.push([0, val[0] - 1]);
    }

    for (let i = 1; i < s.length; i++) {
        res.push([val[1], s[i][0]]);
        val = s[i];
    }

    if (val[1] < fullLength - 1) {
        res.push([val[1] + 1, fullLength - 1]);
    }

    return corectSelection(res);
};
