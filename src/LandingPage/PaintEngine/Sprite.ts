import {
    randomFromRange,
    randomSpriteType,
    SPRITE_MAX_ROTATION_SPEED,
    SPRITE_MAX_SPEED,
    SPRITE_MIN_SPEED,
    SPRITE_PROGRESS_LENGTH_MS,
    SPRITE_SIZE,
} from "./const";
import { SPRITE_IMAGES, TSpriteType } from "./images";

export class Sprite {
    x: number;
    y: number;
    width = SPRITE_SIZE;
    height = SPRITE_SIZE;
    rotation: number;

    speedX: number;
    speedY: number;
    rotationSpeed: number;

    type: TSpriteType;
    progressEndTime: number;
    timeMs: number;
    imortality = true;

    constructor(maxX: number, maxY: number, timeMs: number) {
        this.timeMs = timeMs;
        this.progressEndTime = timeMs + SPRITE_PROGRESS_LENGTH_MS;
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
            this.progressEndTime = timeMs + SPRITE_PROGRESS_LENGTH_MS;
            this.type = randomSpriteType();
            this.imortality = false;
        }
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
        ctx.restore();
    };
}
