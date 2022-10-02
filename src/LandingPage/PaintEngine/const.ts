import { SPRITE_TYPES } from "./images";

export const MAX_SPRITE_COUNT = 8;
export const SPRITE_SPAWN_CHANCE = 0.01;

export const SPRITE_SIZE = 70;
export const SPRITE_PROGRESS_LENGTH_MS = 5_000;

export const SPRITE_MAX_SPEED = 120;
export const SPRITE_MIN_SPEED = 60;
export const SPRITE_MAX_ROTATION_SPEED = 0.5;

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
