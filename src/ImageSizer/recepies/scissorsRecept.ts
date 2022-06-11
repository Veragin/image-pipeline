import { TRecept } from "../Const";

export const scissorsRecept: TRecept = {
    id: 0,
    name: "scissors",
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
            tech: "rename",
            config: {
                namePattern: "{name}_{index}",
            },
        },
        {
            tech: "download",
            config: { type: "png" },
        },
    ],
};
