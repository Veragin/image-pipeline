import { isOutOfBounds, MAX_SPRITE_COUNT, SPRITE_SPAWN_CHANCE } from "./const";
import { Sprite } from "./Sprite";

export class SpriteCollection {
    stack: Sprite[] = [];

    constructor(public data: TSize) {
        this.spawnNewSprite();
        this.spawnNewSprite();
        this.spawnNewSprite();
    }

    run = (ctx: CanvasRenderingContext2D) => {
        this.stack = this.stack.filter(this.checkIfSurvive);
        this.stack.forEach((sprite) => sprite.move());

        ctx.clearRect(0, 0, this.data.width, this.data.height);
        this.stack.forEach((sprite) => sprite.draw(ctx));

        if (this.checkForSpawn()) this.spawnNewSprite();
    };

    checkIfSurvive = (sprite: Sprite) => {
        return sprite.imortality || !isOutOfBounds(sprite, this.data);
    };

    checkForSpawn = () =>
        this.stack.length < MAX_SPRITE_COUNT &&
        Math.random() > SPRITE_SPAWN_CHANCE;

    spawnNewSprite = () =>
        this.stack.push(new Sprite(this.data.width, this.data.height));
}
