import { addSelection, corectSelection, interSelection, inverseSelection, subSelection } from './selections';

describe('selectFunctions tests', () => {
    it('corectSelection', () => {
        const data: [number, number][] = [
            [101, 102],
            [30, 50],
            [20, 40],
            [0, 10],
            [80, 100],
            [5, 15],
        ];

        const res = corectSelection(data);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                0,
                15,
              ],
              Array [
                20,
                50,
              ],
              Array [
                80,
                102,
              ],
            ]
        `);
    });

    it('addSelection', () => {
        const oldSel: [number, number][] = [
            [30, 50],
            [5, 15],
        ];

        const newSel: [number, number][] = [
            [20, 40],
            [0, 10],
            [80, 100],
        ];

        const res = addSelection(oldSel, newSel);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                0,
                15,
              ],
              Array [
                20,
                50,
              ],
              Array [
                80,
                100,
              ],
            ]
        `);
    });

    it('subSelection', () => {
        const oldSel: [number, number][] = [
            [30, 50],
            [180, 200],
            [5, 15],
            [80, 90],
            [100, 150],
        ];

        const newSel: [number, number][] = [
            [30, 40],
            [170, 210],
            [0, 10],
            [70, 100],
            [120, 125],
            [140, 160],
        ];

        const res = subSelection(oldSel, newSel);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                11,
                15,
              ],
              Array [
                41,
                50,
              ],
              Array [
                101,
                119,
              ],
              Array [
                126,
                139,
              ],
            ]
        `);
    });

    it('interSelection', () => {
        const oldSel: [number, number][] = [
            [30, 50],
            [180, 200],
            [5, 15],
            [80, 90],
            [100, 150],
        ];

        const newSel: [number, number][] = [
            [30, 40],
            [170, 210],
            [0, 10],
            [70, 100],
            [120, 125],
            [140, 160],
        ];

        const res = interSelection(oldSel, newSel);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                5,
                10,
              ],
              Array [
                30,
                40,
              ],
              Array [
                80,
                90,
              ],
              Array [
                100,
                100,
              ],
              Array [
                120,
                125,
              ],
              Array [
                140,
                150,
              ],
              Array [
                180,
                200,
              ],
            ]
        `);
    });

    it('inverseSelection', () => {
        const sel: [number, number][] = [
            [30, 50],
            [180, 200],
            [5, 15],
        ];

        const res = inverseSelection(sel, 200);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                0,
                4,
              ],
              Array [
                15,
                30,
              ],
              Array [
                50,
                180,
              ],
            ]
        `);
    });
});

export {};
