import { Row } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import ToolbarInput from "./ToolbarInput";

type Props = {
    onChange: (v: number) => void;
    value: string;
    min?: number;
    max?: number;
    step?: number;
};

export const ToolbarHue = ({ onChange, value, min = 0, max = 359, step = 0.1 }: Props) => {
    const handleChange = (v: number) => {
        const value = Math.max(min, Math.min(max, v));
        onChange(value);
    };

    return (
        <StyledRow>
            <StyledTitle>{_("Hue")}</StyledTitle>
            <StyledSlider
                type="range"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <ToolbarInput
                value={value}
                onChange={(s) => handleChange(Number(s))}
                type="number"
                size={4}
            />
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
    width: 100%;
    overflow: hidden;
    column-gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
`;

const StyledTitle = styled.div`
    color: black;
    font-size: 14px;
    padding-right: ${({ theme }) => theme.spacing(0.5)};
`;

// slider

const StyledSlider = styled.input`
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    border: 0;
    height: 4px;
    border-radius: 6px;
    background: linear-gradient(
        to right,
        #ff0000 0%,
        #ffff00 17%,
        #00ff00 33%,
        #00ffff 50%,
        #0000ff 67%,
        #ff00ff 83%,
        #ff0000 100%
    );

    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
        appearance: none;
        height: 12px;
        width: 12px;
        cursor: pointer;
    }
`;
