import { Column } from "react-utils/Components/StyledComponents";
import { Landing } from "./Landing";
import styled from "styled-components";
import { LandingPipe } from "./LandingPipe";
import { Body } from "./Body";

type Props = {
    onStart: () => void;
};

export const LandingPage = ({ onStart }: Props) => {
    return (
        <StyledCont>
            <Landing onStart={onStart} />
            <LandingPipe />
            <Body />
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    width: 100%;
    background: linear-gradient(
        198deg,
        rgba(68, 87, 255, 0.2) 56%,
        rgba(204, 68, 255, 0.2) 100%
    );
`;
