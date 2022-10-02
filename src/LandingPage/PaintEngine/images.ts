import baseImage from "Assets/landing/sprites/lowRes/base.png";
import colorImage from "Assets/landing/sprites/lowRes/baseColor.png";
import duplicateImage from "Assets/landing/sprites/lowRes/duplicate.png";
import innerCutImage from "Assets/landing/sprites/lowRes/innerCut.png";
import lowResImage from "Assets/landing/sprites/lowRes/lowRes.jpeg";
import mirrorImage from "Assets/landing/sprites/lowRes/mirror1.png";
import objectCutImage from "Assets/landing/sprites/lowRes/object_cut.png";
import rotateImage from "Assets/landing/sprites/lowRes/rotate.png";
import split1Image from "Assets/landing/sprites/lowRes/split1.png";
import split2Image from "Assets/landing/sprites/lowRes/split2.png";
import changeSpriteSheetImage from "Assets/landing/sprites/change.png";

const SPRITE_IMAGES_SRC = {
    base: baseImage,
    color: colorImage,
    duplicate: duplicateImage,
    innerCut: innerCutImage,
    lowRes: lowResImage,
    mirror: mirrorImage,
    objectCut: objectCutImage,
    rotate: rotateImage,
    split1: split1Image,
    split2: split2Image,
} as const;

export type TSpriteType = keyof typeof SPRITE_IMAGES_SRC;
export const SPRITE_TYPES = Object.keys(SPRITE_IMAGES_SRC) as TSpriteType[];

export const SPRITE_IMAGES = {} as Record<TSpriteType, HTMLImageElement>;
SPRITE_TYPES.forEach((type) => {
    const image = new Image();
    image.src = SPRITE_IMAGES_SRC[type];
    SPRITE_IMAGES[type] = image;
});

export const CHNAGE_SPRITE_SHEET_IMAGE = new Image();
CHNAGE_SPRITE_SHEET_IMAGE.src = changeSpriteSheetImage;
