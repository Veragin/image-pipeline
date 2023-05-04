import { Button } from "@mui/material";
import { Highlight } from "LandingPage/Components";
import { Column, Row } from "react-utils/Components/StyledComponents";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import schema from "Assets/landing/schema.png";

type Props = {
    onStart: () => void;
};

export const GetStarted = ({ onStart }: Props) => {
    return (
        <StyledCenterColumn>
            <StyledInfo>
                <StyledText>
                    Create your own pipeline that allows you to bulk edit your images. Images can be
                    scaled, cropped, sliced, recolored, rotated or mirrored. You can also search for
                    objects in images and work with them (for example, center them). <br />
                    <br />
                    <br />
                    The service is primarily useful if you have a large number of images with which
                    you need to do the same operation. However, it is also useful for editing just
                    one image.
                </StyledText>
                <StyledImg src={schema} alt="schema" />
            </StyledInfo>
            <StyledText>
                Watch <Highlight>5 minute tutorial</Highlight> and get started right now
            </StyledText>
            <StyledIframe
                title="youtube tutorial"
                width="750"
                height="500"
                src="https://www.youtube.com/embed/1lua66lpmyg"
            ></StyledIframe>
            <Button color="primary" variant="contained" onClick={() => onStart()}>
                {_("Start now")}
            </Button>
        </StyledCenterColumn>
    );
};

const StyledInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: min(100%, 1000px);
    padding: 0 32px;
    gap: 32px;
    justify-items: center;
    align-items: center;
`;

const StyledCenterColumn = styled(Column)`
    width: 100%;
    align-items: center;
    gap: ${spacingCss(3)};
`;

const StyledText = styled.p`
    margin: 0;
`;

const StyledImg = styled.img`
    height: max(40vh, 330px);
`;

const StyledIframe = styled.iframe`
    border: 0;
`;
