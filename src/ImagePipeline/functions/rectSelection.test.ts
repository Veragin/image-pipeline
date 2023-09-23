import { rectToSelection, selectionFromRectToSelection, selectionToRect } from './rectSelection';

import { TSelection } from '../ImageColection';

describe('pixelConvert', () => {
    it('rectToSelection', () => {
        const rect = {
            x: 5,
            y: 10,
            width: 20,
            height: 5,
        };
        const size = {
            width: 20,
            height: 30,
        };

        const res = rectToSelection(rect, size);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                205,
                220,
              ],
              Array [
                225,
                240,
              ],
              Array [
                245,
                260,
              ],
              Array [
                265,
                280,
              ],
              Array [
                285,
                300,
              ],
            ]
        `);
    });

    it('selectionToRect', () => {
        const size = {
            width: 10,
            height: 10,
        };

        const res = selectionToRect(
            [
                [12, 15],
                [22, 22],
                [25, 25],
                [32, 35],
            ],
            size
        );

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 3,
              "width": 3,
              "x": 2,
              "y": 1,
            }
        `);
    });

    it('cutted selectionToRect', () => {
        const size = {
            width: 10,
            height: 10,
        };

        const res = selectionToRect([[12, 35]], size);

        expect(res).toMatchInlineSnapshot(`
            Object {
              "height": 3,
              "width": 9,
              "x": 0,
              "y": 1,
            }
        `);
    });

    it('back and forw selectionToRect', () => {
        const size = {
            width: 10,
            height: 10,
        };

        const selection: TSelection = [
            [12, 16],
            [22, 26],
            [32, 36],
        ];

        const rect = selectionToRect(selection, size);
        const newSel = rectToSelection(rect, size);

        expect(newSel).toMatchInlineSnapshot(`
            Array [
              Array [
                12,
                16,
              ],
              Array [
                22,
                26,
              ],
              Array [
                32,
                36,
              ],
            ]
        `);
    });

    it('selectionFromRectToSelection', () => {
        const rect = {
            x: 5,
            y: 5,
            width: 10,
            height: 5,
        };
        const size = {
            width: 10,
            height: 20,
        };

        const selection: TSelection = [
            [12, 32],
            [42, 62],
            [65, 66],
            [92, 110],
        ];

        const res = selectionFromRectToSelection(selection, size, rect);

        expect(res).toMatchInlineSnapshot(`
            Array [
              Array [
                0,
                5,
              ],
              Array [
                10,
                11,
              ],
              Array [
                40,
                45,
              ],
            ]
        `);
    });
});

export {};
