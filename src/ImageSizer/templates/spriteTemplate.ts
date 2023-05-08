import { TTemplate } from "../Const";

export const spriteTemplate: TTemplate = {
    id: 1,
    version: "1",
    name: "Game sprites",
    tubes: [
        {
            tube: "select",
            config: {
                mode: "newSelect",
                method: "neighbor",
                inverse: true,
                box: { x: 0, y: 0, width: 500, height: 500 },
                color: {
                    type: "color",
                    pivot: { r: 255, g: 255, b: 255, a: 1 },
                    alpha: 0,
                    threshold: 0,
                },
                neighbor: {
                    type: "pixel",
                    x: 10,
                    y: 10,
                    color: { r: 255, g: 255, b: 255, a: 1 },
                    threshold: 0.074,
                },
            },
        },
        {
            tube: "object",
            config: {
                compactDistance: 4,
                minimalHeight: 10,
                minimalPixelCount: 64,
                minimalWidth: 10,
                bbConfig: {
                    isFitActive: true,
                    fitTo: { width: 80, height: 80, vertical: "center", horizontal: "center" },
                    padding: { top: 0, bottom: 0, left: 0, right: 0 },
                },
            },
        },
        {
            tube: "cut",
            config: {
                type: "object",
                fixed: { width: 24, height: 24 },
                percent: { columns: [], rows: [] },
                sort: "none",
            },
        },
        {
            tube: "select",
            config: {
                mode: "newSelect",
                method: "old",
                inverse: true,
                box: { x: 0, y: 0, width: 500, height: 500 },
                color: {
                    type: "color",
                    pivot: { r: 255, g: 255, b: 255, a: 1 },
                    alpha: 0,
                    threshold: 0,
                },
                neighbor: {
                    type: "pixel",
                    x: 0,
                    y: 0,
                    color: { r: 255, g: 255, b: 255, a: 1 },
                    threshold: 0,
                },
            },
        },
        { tube: "color", config: { rgba: { r: 0, g: 0, b: 0, a: 0 } } },
        {
            tube: "join",
            config: {
                groupBy: 0,
                imageCountInRow: 5,
                maxWidth: 500,
                verticalGap: 0,
                horizontalGap: 0,
            },
        },
        { tube: "download", config: { format: "png", quality: 1 } },
    ],
};
