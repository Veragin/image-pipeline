import { TTemplate } from "../Const";

export const neuralTemplate: TTemplate = {
    id: 1,
    name: "Neural network",
    version: "1",
    tubes: [
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_0",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_45",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_90",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_135",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_180",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_225",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_270",
                    regExp: "[^_]*",
                },
            },
        },
        {
            tube: "download",
            config: {
                zip: true,
            },
        },
        {
            tube: "rotate",
            config: {
                angle: 45,
            },
        },
        {
            tube: "rename",
            config: {
                image: {
                    pattern: "{name}_315",
                    regExp: "[^_]*",
                },
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
