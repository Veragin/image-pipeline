import { cutSelectionBySize, getObjectsFromSelection } from './objectFind';

import { TSelection } from '../ImageColection';

describe('objectFind', () => {
    it('cutSelectionBySize', () => {
        const selection: TSelection = [
            [5, 15],
            [25, 60],
            [80, 130],
        ];
        const size = {
            width: 20,
            height: 30,
        };

        const res = cutSelectionBySize(selection, size);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                5,
                15,
              ],
              Array [
                25,
                39,
              ],
              Array [
                40,
                59,
              ],
              Array [
                60,
                60,
              ],
              Array [
                80,
                99,
              ],
              Array [
                100,
                119,
              ],
              Array [
                120,
                130,
              ],
            ]
        `);
    });

    it('getObjectsFromSelection', () => {
        const selection: TSelection = [
            // O
            [12, 15],
            [22, 22],
            [25, 25],
            [32, 35],
            // U
            [17, 17],
            [19, 19],
            [27, 27],
            [29, 29],
            [37, 39],
            // Z
            [57, 63],
            [66, 68],
            [62, 64],
        ];
        const size = {
            width: 10,
            height: 10,
        };

        const res = getObjectsFromSelection(selection, size, 0);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                Array [
                  12,
                  15,
                ],
                Array [
                  22,
                  22,
                ],
                Array [
                  25,
                  25,
                ],
                Array [
                  32,
                  35,
                ],
              ],
              Array [
                Array [
                  17,
                  17,
                ],
                Array [
                  27,
                  27,
                ],
                Array [
                  37,
                  39,
                ],
                Array [
                  19,
                  19,
                ],
                Array [
                  29,
                  29,
                ],
              ],
              Array [
                Array [
                  57,
                  59,
                ],
                Array [
                  66,
                  68,
                ],
              ],
              Array [
                Array [
                  60,
                  63,
                ],
                Array [
                  62,
                  64,
                ],
              ],
            ]
        `);
    });

    it('getObjectsFromSelection compareDistance', () => {
        const selection: TSelection = [
            // O
            [12, 14],
            [42, 42],
            [52, 52],
            [60, 61],
            // 1
            [47, 47],
            [57, 57],
            [18, 19],
            [79, 79],
        ];
        const size = {
            width: 10,
            height: 10,
        };

        const res = getObjectsFromSelection(selection, size, 2);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                Array [
                  12,
                  14,
                ],
                Array [
                  42,
                  42,
                ],
                Array [
                  52,
                  52,
                ],
                Array [
                  60,
                  61,
                ],
              ],
              Array [
                Array [
                  47,
                  47,
                ],
                Array [
                  57,
                  57,
                ],
                Array [
                  18,
                  19,
                ],
                Array [
                  79,
                  79,
                ],
              ],
            ]
        `);
    });
});

export {};
