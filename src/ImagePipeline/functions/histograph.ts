export const getHistograph = (imgData: ImageData): THistograph => {
    const data = imgData.data;
    const hist: THistographStruct = {};

    for (let i = 0; i < imgData.width * imgData.height; i++) {
        if (hist[data[4 * i]] === undefined) {
            hist[data[4 * i]] = { [data[4 * i + 1]]: { [data[4 * i + 2]]: 1 } };
            continue;
        }

        if (hist[data[4 * i]][data[4 * i + 1]] === undefined) {
            hist[data[4 * i]][data[4 * i + 1]] = { [data[4 * i + 2]]: 1 };
            continue;
        }

        if (hist[data[4 * i]][data[4 * i + 1]][data[4 * i + 2]] === undefined) {
            hist[data[4 * i]][data[4 * i + 1]][data[4 * i + 2]] = 1;
            continue;
        }

        hist[data[4 * i]][data[4 * i + 1]][data[4 * i + 2]]++;
    }

    const res: THistograph = [];

    for (let rs of Object.keys(hist)) {
        const r = Number(rs);

        for (let gs of Object.keys(hist[r])) {
            const g = Number(gs);

            for (let bs of Object.keys(hist[r][g])) {
                const b = Number(bs);

                res.push({
                    color: { r, g, b, a: 255 },
                    count: hist[r][g][b],
                });
            }
        }
    }

    return res;
};

type THistographStruct = Record<number, Record<number, Record<number, number>>>;
type THistograph = {
    color: TColor;
    count: number;
}[];
