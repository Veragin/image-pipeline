import styled from "styled-components";

import { ReactComponent as PipeEnter } from "Assets/landing/pipeEnter1.svg";
import { Highlight } from "./Components";

export const LandingPipe = () => {
    return (
        <StyledPipeCont>
            <StyledPipeEnter />
            <StyledTextOne>
                Modify all your images <br />
                <Highlight>the way you need</Highlight>
            </StyledTextOne>

            <StyledTextTwo>
                Create your own custom pipeline <br />
                that can convert images as you want
                <br />
                <Highlight>for free</Highlight>
            </StyledTextTwo>
        </StyledPipeCont>
    );
};

const StyledPipeEnter = styled(PipeEnter)`
    width: 100%;
`;

const StyledPipeCont = styled.div`
    width: 100%;
    position: relative;
`;

const StyledTextOne = styled.p`
    position: absolute;
    left: 0;
    top: 20%;
    width: 50%;
    font-size: 32px;
    text-align: center;
`;

const StyledTextTwo = styled.p`
    position: absolute;
    right: 0%;
    bottom: 20%;
    width: 50%;
    font-size: 32px;
    text-align: center;
`;
