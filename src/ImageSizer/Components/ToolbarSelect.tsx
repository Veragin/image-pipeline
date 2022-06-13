import { Key } from 'react';
import { Tooltip } from '@mui/material';
import { inputCss } from './ToolbarComp';
import { observer } from 'mobx-react';
import styled from 'styled-components';

type TOption = { name: string; value: string };

type Props = {
    value: string;
    onChange: (v: string) => void;
    options: TOption[];
    renderOption?: (prop: TOption, key: Key) => React.ReactNode;
    tooltip?: string;
};

const ToolbarSelect = ({
    value,
    onChange,
    options,
    renderOption,
    tooltip,
}: Props) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    if (tooltip === undefined) {
        return (
            <StyledSelect value={value} onChange={onChangeHandler}>
                {options.map((o, key) =>
                    renderOption ? (
                        renderOption(o, key)
                    ) : (
                        <option value={o.value} key={key}>
                            {o.name}
                        </option>
                    )
                )}
            </StyledSelect>
        );
    }

    return (
        <Tooltip title={tooltip}>
            <StyledSelect value={value} onChange={onChangeHandler}>
                {options.map((o, key) =>
                    renderOption ? (
                        renderOption(o, key)
                    ) : (
                        <option value={o.value}>{o.name}</option>
                    )
                )}
            </StyledSelect>
        </Tooltip>
    );
};

const StyledSelect = styled.select`
    ${inputCss}

    padding: 0;
`;

export default observer(ToolbarSelect);
