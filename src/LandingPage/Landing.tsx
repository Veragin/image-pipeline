import { Button } from "@mui/material";
import { Row } from "react-utils/Components/StyledComponents";
import logo from "Assets/logo/logo.png";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

import { ReactComponent as PipeEnter } from "Assets/landing/pipeEnter1.svg";

export const Landing = () => {
    return (
        <>
            <StyledTop>
                <StyledLogo
                    src={logo}
                    onClick={() => window.location.replace("resaizer.com")}
                />
                <StyledButtonRow>
                    <Button color="primary" variant="contained">
                        {_("Sign up")}
                    </Button>
                    <Button color="secondary" variant="text">
                        {_("Sign in")}
                    </Button>
                </StyledButtonRow>
            </StyledTop>
            <StyledTitle>
                Image <StyledPrimary>Pipeline</StyledPrimary>
            </StyledTitle>
            <StyledMenu>
                <StyledMenuItem>Docs</StyledMenuItem>
                <StyledMenuItem>Docs</StyledMenuItem>
                <StyledMenuItem>Docs</StyledMenuItem>
                <StyledMenuItem>Docs</StyledMenuItem>
            </StyledMenu>
            <StyledPipeEnter />
        </>
    );
};

const StyledTop = styled(Row)`
    width: calc(100% - ${spacingCss(4)});
    justify-content: space-between;
    padding: ${spacingCss(2)};
`;

const StyledButtonRow = styled(Row)`
    gap: ${spacingCss(1)};
`;

const StyledLogo = styled.img`
    height: 42px;
    cursor: pointer;
`;

const StyledTitle = styled(Row)`
    width: 100%;
    height: 60vh;
    justify-content: center;
    align-items: center;
    gap: ${spacingCss(2)};
    font-size: 64px;
    text-transform: uppercase;
`;

const StyledPrimary = styled.span`
    color: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledMenu = styled(Row)`
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    gap: ${spacingCss(2)};
    background-color: ${({ theme }) => theme.palette.backgr.dark};
    color: white;
`;

const StyledMenuItem = styled(Button)`
    color: white;
`;

const StyledPipeEnter = styled(PipeEnter)`
    width: 100%;
    & g {
        fill: red;
    }
`;
