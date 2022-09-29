import { throttle } from "react-utils/basic/throttle";
import { assertNotNullish } from "react-utils/basic/typeguards";
import { sleep } from "./const";
import { SpriteCollection } from "./SpriteCollection";

export const RESOLUTION_FACTOR = window.devicePixelRatio || 1;

export class PaintEngine {
    ctx: CanvasRenderingContext2D;
    private spriteCollection: SpriteCollection;

    private raf: number | null = null;
    private resizeObserver: ResizeObserver;
    data: TSize;

    constructor(public canvas: HTMLCanvasElement) {
        console.log("PAINT");
        const ctx = this.canvas.getContext("2d");
        assertNotNullish(ctx, "Error getting context from canvas");
        this.ctx = ctx;

        this.data = {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight,
        };

        this.spriteCollection = new SpriteCollection(this.data);

        this.resizeObserver = new ResizeObserver(
            throttle<any>(() => this.onCanvasResize(), 1000)
        );
        this.resizeObserver.observe(this.canvas);

        // start animation
        this.run(0);
    }

    private async run(time: number) {
        await sleep(100);
        this.spriteCollection.run(this.ctx);
        this.raf = requestAnimationFrame((time) => this.run(time));
    }

    onCanvasResize() {
        const width = RESOLUTION_FACTOR * this.canvas.offsetWidth;
        const height = RESOLUTION_FACTOR * this.canvas.offsetHeight;
        this.canvas.width = width;
        this.canvas.height = height;

        this.data.width = width;
        this.data.height = height;
    }

    destructor() {
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = null;
    }
}
