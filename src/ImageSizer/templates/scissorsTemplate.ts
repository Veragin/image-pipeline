import { TTemplate } from "../Const";

export const scissorsTemplate: TTemplate = {
    id: 0,
    name: "scissors",
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
            tube: "rename",
            config: {
                image: { pattern: "{name}_{index}" },
            },
        },
        {
            tube: "download",
            config: { format: "png" },
        },
    ],
};
