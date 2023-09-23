import { RsInput } from 'react-utils/Components/RsInput/RsInput';
import { TubeCut } from '../../Tube/TubeCut';
import { observer } from 'mobx-react';
import { useState } from 'react';

type Props = {
    tube: TubeCut;
};

export const PercentConfig = observer(({ tube }: Props) => {
    const [columnsInput, setColumnsInput] = useState(tube.config.percent.columns.join(', '));
    const [rowsInput, setRowsInput] = useState(tube.config.percent.rows.join(', '));

    if (tube.config.type !== 'percent') return null;

    const changeColumns = (v: string) => {
        setColumnsInput(v);

        const data = v
            .split(', ')
            .map((v) => parseFloat(v))
            .filter((n) => !Number.isNaN(n));

        if (
            data.length !== tube.config.percent.columns.length ||
            tube.config.percent.columns.some((value, index) => value !== data[index])
        ) {
            // there is some change
            tube.setConfig({
                percent: {
                    columns: data,
                },
            });
        }
    };

    const changeRows = (v: string) => {
        setRowsInput(v);

        const data = v
            .split(',')
            .map((s) => s.trim())
            .map((v) => parseFloat(v))
            .filter((n) => !Number.isNaN(n));

        if (
            data.length !== tube.config.percent.rows.length ||
            tube.config.percent.rows.some((value, index) => value !== data[index])
        ) {
            // there is some change
            tube.setConfig({
                percent: {
                    rows: data,
                },
            });
        }
    };

    return (
        <>
            <RsInput
                title={_('Columns')}
                type="text"
                value={columnsInput}
                onChange={changeColumns}
            />
            <RsInput title={_('Rows')} type="text" value={rowsInput} onChange={changeRows} />
        </>
    );
});
