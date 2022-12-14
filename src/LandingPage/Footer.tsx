import { spacingCss } from "react-utils/Components/globalCss";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";

declare var cookieconsent: any;

export const Footer = () => {
    return (
        <StyledCont>
            <StyledButton onClick={() => cookieconsent.showSettings()}>
                {_("Cookie preferences")}
            </StyledButton>
            Copyright© 2022, Sizefire.com
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    width: calc(100% - ${spacingCss(4)});
    padding: ${spacingCss(2)};
    display: grid;
    justify-content: center;
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size: 18px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 80px 80px 0 0;
    margin-top: ${spacingCss(2)};
    gap: ${spacingCss(1)};
`;

const StyledButton = styled.button`
    border: 0;
    background: transparent;
    color: black;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        color: grey;
    }
`;
