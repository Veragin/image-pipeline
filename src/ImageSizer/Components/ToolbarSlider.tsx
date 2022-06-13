import { convertToPercentString, parsePercentFromString } from './Utils';
import styled, { css } from 'styled-components';

import ToolbarInput from './ToolbarInput';
import { observer } from 'mobx-react';

type Props = {
    value: number;
    onChange: (v: number) => void;
    visible?: boolean;
    step?: number;
};

const ToolbarSlider = ({
    value,
    onChange,
    visible = true,
    step = 0.01,
}: Props) => {
    return (
        <>
            <StyledSlider
                type="range"
                value={value}
                min={0}
                max={1}
                step={step}
                onChange={(e) => onChange(Number(e.target.value))}
                $visible={visible}
            />
            <ToolbarInput
                value={convertToPercentString(value)}
                onChange={(s) => onChange(parsePercentFromString(s))}
                type="text"
                size={4}
                className="percent"
            />
        </>
    );
};

const StyledSlider = styled.input<{ $visible: boolean }>`
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    height: 4px;
    border-radius: 6px;
    ${({ theme, $visible }) => css`
        background-color: ${$visible
            ? theme.palette.secondary.light
            : theme.palette.grey[300]};
        border-radius: ${theme.measurements.borderRadius}px;
    `}

    &::-webkit-slider-thumb {
        appearance: none;
        height: 12px;
        width: 12px;
        cursor: pointer;
        ${({ theme, $visible }) => css`
            background-color: ${$visible
                ? theme.palette.secondary.main
                : theme.palette.grey[500]};
            border-radius: 50%;
        `}
    }

    &::-moz-range-thumb {
        height: 12px;
        width: 12px;
        cursor: pointer;
        ${({ theme, $visible }) => css`
            background-color: ${$visible
                ? theme.palette.secondary.main
                : theme.palette.grey[500]};
            border-radius: 50%;
        `}
    }
`;

export default observer(ToolbarSlider);
