import { TTemplate } from "../Const";

export const eshopTemplate: TTemplate = {
    id: 1,
    name: "Eshop",
    version: "1",
    tubes: [
        {
            tube: "select",
            config: {
                method: "neighbor",
                neighbor: {
                    x: 0,
                    y: 0,
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
                box: {
                    width: 460,
                    height: 460,
                },
            },
        },
        {
            tube: "crop",
            config: {
                bbConfig: {
                    padding: {
                        bottom: 20,
                        top: 20,
                        left: 20,
                        right: 20,
                    },
                },
            },
        },
        {
            tube: "select",
            config: {
                method: "color",
                color: { pivot: { r: 0, g: 0, b: 0, a: 0 }, threshold: 0 },
            },
        },
        {
            tube: "color",
            config: {
                color: { r: 255, g: 248, b: 142, a: 1 },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
    ],
};
