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
                    pattern: "{name}_{index}_0",
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
                    pattern: "{name}_{index}_45",
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
                    pattern: "{name}_{index}_90",
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
                    pattern: "{name}_{index}_135",
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
                    pattern: "{name}_{index}_180",
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
                    pattern: "{name}_{index}_225",
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
                    pattern: "{name}_{index}_270",
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
                    pattern: "{name}_{index}_315",
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
