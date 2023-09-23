export type TTubeBBConfig = {
    isFitActive: boolean;
    fitTo: TFitTo;
    padding: TPadding;
};

export type TPadding = {
    top: number;
    left: number;
    right: number;
    bottom: number;
};

export const applyPaddingToRect = (rect: TRect, padding: TPadding): TRect => {
    return {
        x: rect.x - padding.left,
        y: rect.y - padding.top,
        width: rect.width + padding.left + padding.right,
        height: rect.height + padding.top + padding.bottom,
    };
};

export type TFitTo = TSize & {
    vertical: "center" | "top" | "bottom";
    horizontal: "center" | "left" | "right";
};

export const applyFitToRect = (rect: TRect, fitTo: TFitTo): TRect => {
    return {
        x:
            fitTo.horizontal === "left"
                ? rect.x
                : fitTo.horizontal === "center"
                ? rect.x + rect.width / 2 - fitTo.width / 2
                : rect.x + rect.width - fitTo.width,
        y:
            fitTo.vertical === "top"
                ? rect.y
                : fitTo.vertical === "center"
                ? rect.y + rect.height / 2 - fitTo.height / 2
                : rect.y + rect.height - fitTo.height,
        width: fitTo.width,
        height: fitTo.height,
    };
};

export const getBoundingBoxOfRects = (rects: TRect[]) => {
    if (rects.length === 0) return { x: 0, y: 0, height: 0, width: 0 };

    const x = Math.min(...rects.map((rect) => rect.x));
    const y = Math.min(...rects.map((rect) => rect.y));

    const res: TRect = {
        x,
        y,
        width: Math.max(...rects.map((r) => r.x + r.width - x)),
        height: Math.max(...rects.map((r) => r.y + r.height - y)),
    };

    return res;
};

export const floorRect = (rect: TRect): TRect => ({
    width: Math.floor(rect.width),
    height: Math.floor(rect.height),
    x: Math.floor(rect.x),
    y: Math.floor(rect.y),
});
