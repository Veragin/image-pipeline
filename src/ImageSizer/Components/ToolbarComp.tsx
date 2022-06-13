import styled, { css } from 'styled-components';

export const ToolbarDivider = styled.div`
    width: 100%;
    border-bottom: solid 2px ${({ theme }) => theme.palette.input.default};
`;

export const inputCss = css`
    border-radius: 6px;
    background-color: #ffffff;
    border: solid white 2px;

    line-height: 20px;
    outline: none;

    ${({ theme }) => css`
        width: calc(100% - ${theme.spacing(1)});
        padding: 0 ${theme.spacing(0.5)};

        &:focus {
            border: solid ${theme.palette.input.border} 2px;
        }

        &:hover {
            background-color: ${theme.palette.grey[100]};
        }
    `}
`;

export const iconCss = css`
    fill: black;
    width: 1em;
    height: 1em;
    user-select: none;
    font-size: 1.4rem;
    padding: 2px;
`;
