import { TTubeJoinConfig } from 'ImagePipeline/Tube/TubeJoin';
import { countSizeOfJoinedElements } from './join';

const createBasicConfig = (): TTubeJoinConfig => ({
    maxWidth: 0,
    imageCountInRow: 0,
    groupBy: 0,
    verticalGap: 0,
    horizontalGap: 0,
});

describe('join', () => {
    it('countSizeOfJoindElements no limitss', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const res = countSizeOfJoinedElements(sizes, createBasicConfig());

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 10,
              "width": 100,
            }
        `);
    });

    it('countSizeOfJoindElements max items on row limit', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const config = createBasicConfig();
        config.imageCountInRow = 3;
        const res = countSizeOfJoinedElements(sizes, config);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 40,
              "width": 30,
            }
        `);
    });

    it('countSizeOfJoindElements max width of row', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const config = createBasicConfig();
        config.maxWidth = 27;
        const res = countSizeOfJoinedElements(sizes, config);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 50,
              "width": 20,
            }
        `);
    });

    it('countSizeOfJoindElements both limites', () => {
        const sizes: TSize[] = Array<TSize>(12).fill({ width: 18, height: 4 });

        const config = createBasicConfig();
        config.imageCountInRow = 5;
        config.maxWidth = 37;
        const res = countSizeOfJoinedElements(sizes, config);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 24,
              "width": 36,
            }
        `);
    });

    it('countSizeOfJoindElements max width of row with gap', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const config = createBasicConfig();
        config.maxWidth = 27;
        config.horizontalGap = 5;
        config.verticalGap = 5;
        const res = countSizeOfJoinedElements(sizes, config);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 70,
              "width": 25,
            }
        `);
    });

    it('countSizeOfJoindElements gap change layout', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const config = createBasicConfig();
        config.maxWidth = 3;
        config.horizontalGap = 5;
        config.verticalGap = 5;
        const res = countSizeOfJoinedElements(sizes, config);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 150,
              "width": 10,
            }
        `);
    });
});

export {};
