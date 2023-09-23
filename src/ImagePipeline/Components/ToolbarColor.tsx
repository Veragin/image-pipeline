import { colorConvertorHex2Rgba, colorConvertorRgb2Hex } from "react-utils/color";
import styled, { css } from "styled-components";

import { Row } from "react-utils/Components/StyledComponents";
import ToolbarInput from "./ToolbarInput";
import ToolbarSlider from "./ToolbarSlider";
import { Tooltip } from "@mui/material";
import { VisibilityIcon } from "react-utils/Components/Icons";
import { observer } from "mobx-react";
import { useState } from "react";

type Props = {
    label: string;
    value: TColor;
    onChange: (v: TColor) => void;
};

const ToolbarColor = ({ label, value, onChange }: Props) => {
    const hexColor = colorConvertorRgb2Hex(value);
    const [textColor, setTextColor] = useState(hexColor);

    const isVisible = value.a !== 0;

    const parseColor = (s: string) => {
        const colors = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s);
        if (colors && colors.length > 0) {
            const color = colorConvertorHex2Rgba(colors[0], value.a);
            onChange(color);
        }
        setTextColor(s);
    };

    const handleColorChange = (hexColor: string) => {
        const color = colorConvertorHex2Rgba(hexColor, value.a);
        onChange(color);
        setTextColor(hexColor);
    };

    const onVisibilityClick = () => {
        if (value.a === 0) onChange({ ...value, a: 1 });
        else onChange({ ...value, a: 0 });
    };

    return (
        <Tooltip title={label} arrow>
            <StyledRow>
                <StyledLabel>
                    <StyledInput
                        type="color"
                        value={hexColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                    />
                    <StyledColorShow $color={hexColor} />
                </StyledLabel>
                <ToolbarInput
                    value={textColor}
                    onChange={handleColorChange}
                    onBlur={() => parseColor(hexColor)}
                    type="text"
                    size={7}
                />
                <ToolbarSlider
                    value={value.a}
                    onChange={(a) => onChange({ ...value, a })}
                    visible={isVisible}
                />
                <StyledVisibility $visible={isVisible} onClick={onVisibilityClick} />
            </StyledRow>
        </Tooltip>
    );
};

const StyledRow = styled(Row)`
    width: 100%;
    align-items: center;
    column-gap: 4px;

    & input {
        width: 65px;
        line-height: 25px;
    }

    & .percent {
        width: 40px;
    }
`;

const StyledLabel = styled.label`
    cursor: pointer;
    display: flex;
`;

const StyledInput = styled.input`
    width: 0 !important;
    height: 0 !important;
    padding: 0;
    border: 0;
    visibility: collapse;
`;

const StyledColorShow = styled.div<{ $color: string }>`
    ${({ theme, $color }) => css`
        background-color: ${$color};
        border-radius: ${theme.measurements.borderRadius}px;
    `}
    border: 1px solid black;
    width: 20px;
    height: 20px;
`;

const StyledVisibility = styled(VisibilityIcon)`
    &.MuiSvgIcon-root {
        font-size: 20px;
    }
`;

export default observer(ToolbarColor);
