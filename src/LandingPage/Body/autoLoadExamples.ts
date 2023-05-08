import { scissorsTemplate } from "ImageSizer/templates/scissorsTemplate";
import { eshopTemplate } from "ImageSizer/templates/eshopTemplate";
import { spriteTemplate } from "ImageSizer/templates/spriteTemplate";
import { neuralTemplate } from "ImageSizer/templates/neralTemplate";
import { TTemplate } from "ImageSizer/Const";

export const scissorsLoadTemplate = JSON.parse(JSON.stringify(scissorsTemplate)) as TTemplate;
scissorsLoadTemplate.tubes.unshift({
    tube: "load",
    config: {
        source: ["/examples/handbags.webp"],
    },
});

export const spriteLoadTemplate = JSON.parse(JSON.stringify(spriteTemplate)) as TTemplate;
spriteLoadTemplate.tubes.unshift({
    tube: "load",
    config: {
        source: ["/examples/zombie.jpg"],
    },
});

export const eshopLoadTemplate = JSON.parse(JSON.stringify(eshopTemplate)) as TTemplate;
eshopLoadTemplate.tubes.unshift({
    tube: "load",
    config: {
        source: [
            "/examples/handbag_0.png",
            "/examples/handbag_1.png",
            "/examples/handbag_2.png",
            "/examples/handbag_3.png",
            "/examples/handbag_4.png",
        ],
    },
});

export const neuralLoadTemplate = JSON.parse(JSON.stringify(neuralTemplate)) as TTemplate;
neuralLoadTemplate.tubes.unshift(
    {
        tube: "load",
        config: {
            source: ["/examples/numbers.png"],
        },
    },
    {
        tube: "rename",
        config: {
            image: {
                pattern: "handNumbers",
            },
        },
    },
    {
        tube: "select",
        config: {
            mode: "newSelect",
            method: "color",
            inverse: true,
            box: { x: 0, y: 0, width: 500, height: 500 },
            color: {
                type: "alpha",
                pivot: { r: 255, g: 255, b: 255, a: 1 },
                alpha: 0,
                threshold: 0.004,
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
    {
        tube: "object",
        config: {
            compactDistance: 4,
            minimalHeight: 0,
            minimalPixelCount: 0,
            minimalWidth: 0,
            bbConfig: {
                isFitActive: true,
                fitTo: { width: 250, height: 250, vertical: "center", horizontal: "center" },
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
            inverse: false,
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
    {
        tube: "color",
        config: {
            area: "selection",
            mode: "fixed",
            type: "rgba",
            rgba: { r: 0, g: 0, b: 0, a: 0 },
        },
    }
);
