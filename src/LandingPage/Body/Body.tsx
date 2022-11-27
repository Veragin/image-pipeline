import { Button } from "@mui/material";
import { Highlight } from "LandingPage/Components";
import { spacingCss } from "react-utils/Components/globalCss";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { BoxContent } from "./BoxContent";
import { Examples } from "./Examples";

type Props = {
    onStart: () => void;
};

export const Body = ({ onStart }: Props) => {
    return (
        <StyledPipeCont>
            <StyledPipeTube />
            <Column>
                <BoxContent title={_("Get started")} id="tutorial">
                    <StyledCenterColumn>
                        <StyledText>
                            Watch <Highlight>5 minute tutorial</Highlight> and get started right now
                        </StyledText>
                        <iframe
                            title="youtube tutorial"
                            width="600"
                            height="400"
                            src="https://www.youtube.com/embed/1lua66lpmyg"
                        ></iframe>
                        <Button color="primary" variant="contained" onClick={onStart}>
                            {_("Start now")}
                        </Button>
                    </StyledCenterColumn>
                </BoxContent>
                <BoxContent title={_("Examples")} id="examples">
                    <Examples />
                </BoxContent>
                <BoxContent title={_("Give us feedback")} id="feedback">
                    Conetnt
                </BoxContent>
            </Column>
        </StyledPipeCont>
    );
};

const StyledPipeCont = styled.div`
    width: 100%;
    position: relative;
`;

const StyledPipeTube = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
`;

const StyledCenterColumn = styled(Column)`
    width: 100%;
    align-items: center;
    gap: ${spacingCss(3)};
`;

const StyledText = styled.p`
    margin: 0;
`;
