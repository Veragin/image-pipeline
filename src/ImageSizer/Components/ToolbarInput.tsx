import { inputCss } from './ToolbarComp';
import { roundNumber } from './Utils';
import styled from 'styled-components';

type Props = {
    onChange: (v: string) => void;
    onBlur?: (v: string) => void;
    value: string;
    type: 'text' | 'number';
    min?: number;
    max?: number;

    size?: number;
    autoFocus?: boolean;
    onEnter?: () => void;
    className?: string;
};

const ToolbarInput = ({
    onChange,
    onBlur,
    value,
    type,
    min,
    max,
    autoFocus,
    size,
    onEnter,
    className,
}: Props) => {
    const convert = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value;
        if (type === 'number') {
            value = Number(value);
            if (min && value < min) value = min;
            if (max && value > max) value = max;
        }
        return String(value);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (onEnter && e.key === 'ENTER') onEnter();
        e.stopPropagation();
    };

    if (type === 'number') value = String(roundNumber(Number(value)));

    return (
        <StyledInput
            value={value}
            onChange={(e) => onChange(convert(e))}
            onBlur={(e) => onBlur?.(convert(e))}
            type={type}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            size={size}
            className={className}
        />
    );
};

const StyledInput = styled.input`
    ${inputCss}

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
`;

export default ToolbarInput;
