import { SPRITE_TYPES } from "./images";

export const randomFromRange = (a: number, b: number) => {
    return Math.random() * Math.abs(a - b) + Math.min(a, b);
};

export const randomSpriteType = () => {
    return SPRITE_TYPES[Math.floor(Math.random() * SPRITE_TYPES.length)];
};

export const isOutOfBounds = (obj: TRect, area: TSize) => {
    return (
        obj.x + obj.width / 2 < 0 ||
        obj.x - obj.width / 2 > area.width ||
        obj.y + obj.height / 2 < 0 ||
        obj.y - obj.height / 2 > area.height
    );
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
