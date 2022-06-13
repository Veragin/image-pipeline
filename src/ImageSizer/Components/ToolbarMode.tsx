import styled, { css } from 'styled-components';

import { Row } from 'react-utils/Components/StyledComponents';
import { Tooltip } from '@mui/material';

type Props = {
    active: boolean;
    onChange: (v: boolean) => void;
    title: React.ReactNode;
    tooltip: string;
};

const ToolbarMode = ({ active, title, onChange, tooltip }: Props) => {
    return (
        <Tooltip title={tooltip} arrow>
            <StyledWrapper>
                <AnimatedSpin $active={active}>
                    <StyledButton
                        $active={active}
                        onClick={() => onChange(!active)}
                    >
                        {title}
                    </StyledButton>
                </AnimatedSpin>
            </StyledWrapper>
        </Tooltip>
    );
};

const fullFillCss = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const boxWidth = 36; // px
const boxHeight = 36; // px
const animTime = 8; // s
const clipDistance = 4; //px
const pathWidth = 2; //px

const clipWidth = boxWidth + 2 * clipDistance; //px
const clipHeight = boxHeight + 2 * clipDistance; //px

const StyledWrapper = styled.div`
    position: fixed;
    width: ${boxWidth}px;
    height: ${boxHeight}px;
`;

const StyledButton = styled(Row)<{ $active: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    white-space: nowrap;
    color: ${({ theme, $active }) =>
        $active ? theme.palette.secondary.main : theme.palette.primary.main};
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.measurements.borderRadius}px;

    &:hover {
        background-color: rgba(120, 120, 120, 0.1);
    }
`;

const AnimatedSpin = styled.div<{ $active: boolean }>`
    ${({ theme, $active }) => css`
        ${fullFillCss}
        width: 100%;
        height: 100%;
        margin: auto;
        color: ${theme.palette.secondary.main};
        box-shadow: inset 0 0 0 1px
            ${$active ? theme.palette.secondary.main : 'black'};
        border-radius: ${theme.measurements.borderRadius}px;
        background-color: ${$active
            ? theme.palette.primary.light
            : 'transparent'};

        &::before,
        &::after {
            ${fullFillCss}
            display: ${$active ? 'block' : 'none'};
            content: '';
            z-index: -1;
            margin: -${clipDistance}px;
            box-shadow: inset 0 0 0 ${pathWidth}px;
            border-radius: ${theme.measurements.borderRadius}px;
            animation: clipMe ${animTime}s linear infinite;
        }

        &::before {
            animation-delay: ${animTime * -0.5}s;
        }
    `}

    @keyframes clipMe {
        0%,
        100% {
            clip: rect(0px, ${clipWidth}px, ${pathWidth}px, 0px);
        }
        25% {
            clip: rect(0px, ${pathWidth}px, ${clipHeight}px, 0px);
        }
        50% {
            clip: rect(
                ${clipHeight - pathWidth}px,
                ${clipWidth}px,
                ${clipHeight}px,
                0px
            );
        }
        75% {
            clip: rect(
                0px,
                ${clipWidth}px,
                ${clipHeight}px,
                ${clipWidth - pathWidth}px
            );
        }
    }
`;

export default ToolbarMode;
