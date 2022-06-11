import { TRecept } from "../Const";

export const customRecept: TRecept = {
    id: 1,
    name: "custom",
    techs: [
        {
            tech: "select",
            config: {
                type: "neighbor",
                neighbor: {
                    x: 10,
                    y: 10,
                    threshold: 0.074,
                },
                inverse: true,
            },
        },
        {
            tech: "object",
            config: {
                compactDistance: 4,
                minimalHeight: 10,
                minimalWidth: 10,
                minimalPixelCount: 64,
            },
        },
        {
            tech: "cut",
            config: {
                type: "object",
            },
        },
        {
            tech: "select",
            config: {
                mode: "newSelect",
                type: "old",
                inverse: true,
            },
        },
        {
            tech: "color",
            config: {
                color: { r: 0, g: 0, b: 0, a: 0 },
            },
        },
        {
            tech: "scale",
            config: {
                type: "box",
                box: { width: 50, height: 50 },
            },
        },
        {
            tech: "join",
            config: { groupBy: 0 },
        },
    ],
};
