import { getPixelFormPos } from "ImageSizer/functions/pixelUtils";
import {
    CHANGE_ANIMATION_COUNT,
    CHANGE_ANIMATION_DURATION_MS,
    CHANGE_TILE_SIZE,
    SPRITE_MAX_ROTATION_SPEED,
    SPRITE_MAX_SPEED,
    SPRITE_MIN_SPEED,
    SPRITE_PROGRESS_DURATION_MS,
    SPRITE_SIZE,
} from "./const";
import { CHNAGE_SPRITE_SHEET_IMAGE, SPRITE_IMAGES, TSpriteType } from "./images";
import { randomFromRange, randomSpriteType } from "./utils";

export class Sprite {
    type: TSpriteType;
    x: number;
    y: number;
    width = SPRITE_SIZE;
    height = SPRITE_SIZE;
    rotation: number;

    speedX: number;
    speedY: number;
    rotationSpeed: number;

    progressEndTime: number;
    animationIndex: number | null = null;
    timeMs: number;
    imortality = true;

    constructor(maxX: number, maxY: number, timeMs: number) {
        this.timeMs = timeMs;
        this.progressEndTime = timeMs + SPRITE_PROGRESS_DURATION_MS;
        this.type = randomSpriteType();
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = randomFromRange(-SPRITE_MAX_ROTATION_SPEED, SPRITE_MAX_ROTATION_SPEED);

        const side = Math.random();
        const speed = randomFromRange(SPRITE_MIN_SPEED, SPRITE_MAX_SPEED);

        if (side < 0.25) {
            // top
            this.x = Math.random() * maxX;
            this.y = -this.height;
            this.speedX = Math.cos(side * 4 * Math.PI) * speed;
            this.speedY = Math.sin(side * 4 * Math.PI) * speed;
        } else if (side < 0.5) {
            // right
            this.x = maxX + this.width;
            this.y = Math.random() * maxY;
            this.speedX = -Math.sin(side * 4 * Math.PI) * speed;
            this.speedY = Math.cos(side * 4 * Math.PI) * speed;
        } else if (side < 0.75) {
            // bottom
            this.x = Math.random() * maxX;
            this.y = maxY + this.height;
            this.speedX = Math.cos(side * 4 * Math.PI) * speed;
            this.speedY = -Math.sin(side * 4 * Math.PI) * speed;
        } else {
            // left
            this.x = -this.width;
            this.y = Math.random() * maxY;
            this.speedX = Math.sin(side * 4 * Math.PI) * speed;
            this.speedY = Math.cos(side * 4 * Math.PI) * speed;
        }
    }

    move = (timeMs: number) => {
        const deltaTime = (timeMs - this.timeMs) / 1000;

        this.rotation += this.rotationSpeed * deltaTime;
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;
        this.timeMs = timeMs;

        if (this.progressEndTime < timeMs) {
            this.progressEndTime = timeMs + SPRITE_PROGRESS_DURATION_MS;
            this.type = randomSpriteType();
            this.imortality = false;
        }
        this.checkForAnimationRender(timeMs);
    };

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            SPRITE_IMAGES[this.type],
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        if (this.animationIndex) {
            this.drawChangeAnimTile(this.animationIndex, ctx);
        }
        ctx.restore();
    };

    private checkForAnimationRender = (timeMs: number) => {
        const dist = this.progressEndTime - timeMs;
        if (dist < CHANGE_ANIMATION_DURATION_MS / 2) {
            this.animationIndex = Math.floor(
                ((CHANGE_ANIMATION_DURATION_MS / 2 - dist) / CHANGE_ANIMATION_DURATION_MS) *
                    CHANGE_ANIMATION_COUNT
            );
            return;
        }
        if (dist > SPRITE_PROGRESS_DURATION_MS - CHANGE_ANIMATION_DURATION_MS / 2) {
            this.animationIndex = Math.floor(
                ((SPRITE_PROGRESS_DURATION_MS + CHANGE_ANIMATION_DURATION_MS / 2 - dist) /
                    CHANGE_ANIMATION_DURATION_MS) *
                    CHANGE_ANIMATION_COUNT
            );
            return;
        }
        this.animationIndex = null;
    };

    /** index in (0, CHANGE_ANIMATION_COUNT - 1) */
    private drawChangeAnimTile = (index: number, ctx: CanvasRenderingContext2D) => {
        const tableIndex = getPixelFormPos(
            index,
            Math.round(CHNAGE_SPRITE_SHEET_IMAGE.width / CHANGE_TILE_SIZE)
        );
        const tilePosX = tableIndex.x * CHANGE_TILE_SIZE;
        const tilePosY = tableIndex.y * CHANGE_TILE_SIZE;

        ctx.drawImage(
            CHNAGE_SPRITE_SHEET_IMAGE,
            tilePosX,
            tilePosY,
            CHANGE_TILE_SIZE,
            CHANGE_TILE_SIZE,
            -this.width * 1.7,
            -this.height * 1.7,
            this.width * 4,
            this.height * 4
        );
    };
}
