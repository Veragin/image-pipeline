import { TTemplate } from "../Const";

export const customRecept: TTemplate = {
    id: 1,
    name: "custom",
    version: "1",
    tubes: [
        {
            tube: "select",
            config: {
                method: "neighbor",
                neighbor: {
                    x: 10,
                    y: 10,
                    threshold: 0.074,
                },
                inverse: true,
            },
        },
        {
            tube: "object",
            config: {
                compactDistance: 4,
                minimalHeight: 10,
                minimalWidth: 10,
                minimalPixelCount: 64,
            },
        },
        {
            tube: "cut",
            config: {
                type: "object",
            },
        },
        {
            tube: "select",
            config: {
                mode: "newSelect",
                method: "old",
                inverse: true,
            },
        },
        {
            tube: "color",
            config: {
                color: { r: 0, g: 0, b: 0, a: 0 },
            },
        },
        {
            tube: "scale",
            config: {
                type: "box",
                box: { width: 50, height: 50 },
            },
        },
        {
            tube: "join",
            config: { groupBy: 0 },
        },
    ],
};
