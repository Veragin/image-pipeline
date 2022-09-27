import { Button } from "@mui/material";
import { Row } from "react-utils/Components/StyledComponents";
import logo from "Assets/logo/logo.svg";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { Highlight } from "./Components";

type Props = {
    onStart: () => void;
};

export const Landing = ({ onStart }: Props) => {
    return (
        <>
            <StyledTop>
                <a href="https://sizefire.com">
                    <StyledLogo src={logo} />
                </a>
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
                Image <Highlight>Pipeline</Highlight>
            </StyledTitle>
            <StyledMenu>
                <StyledMenuItem>Tutorial</StyledMenuItem>
                <StyledMenuItem>Examples</StyledMenuItem>
                <Button color="primary" variant="contained" onClick={onStart}>
                    {_("Start right now")}
                </Button>
                <StyledMenuItem>Docs</StyledMenuItem>
                <StyledMenuItem>SizeFire</StyledMenuItem>
            </StyledMenu>
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
    height: 70vh;
    justify-content: center;
    align-items: center;
    gap: ${spacingCss(2)};
    font-size: 64px;
    text-transform: uppercase;
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
