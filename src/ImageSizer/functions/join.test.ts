import { countSizeOfJoindElements } from './join';

describe('join', () => {
    it('countSizeOfJoindElements no limitss', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const res = countSizeOfJoindElements(sizes, 0, 0);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 10,
              "width": 100,
            }
        `);
    });

    it('countSizeOfJoindElements max items on row limit', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const res = countSizeOfJoindElements(sizes, 3, 0);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 40,
              "width": 30,
            }
        `);
    });

    it('countSizeOfJoindElements max width of row', () => {
        const sizes: TSize[] = Array<TSize>(10).fill({ width: 10, height: 10 });

        const res = countSizeOfJoindElements(sizes, 0, 27);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 50,
              "width": 20,
            }
        `);
    });

    it('countSizeOfJoindElements both limites', () => {
        const sizes: TSize[] = Array<TSize>(12).fill({ width: 18, height: 4 });

        const res = countSizeOfJoindElements(sizes, 5, 37);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 24,
              "width": 36,
            }
        `);
    });
});

export {};
