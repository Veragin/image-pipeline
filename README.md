# Image Pipeline

## Naming

-   pixel: {x: number, y: number} ... coordinates inside the image
-   pos: number ... position of pixel in 1D pixel array => (y \* width + x)
-   index: number ... position of pixel in ImageData.data => (y \* width + x) \* 4
-   pixelIndexPart: number ... => (y \* width + x) % 4
