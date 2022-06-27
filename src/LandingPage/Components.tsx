import { spacingCss } from "react-utils/Components/globalCss";
import { Row } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { ReactComponent as TubeJoin } from "Assets/landing/tubeJoin.svg";

export const Highlight = styled.span`
    color: ${({ theme }) => theme.palette.primary.dark};
`;

export const BoxContent = ({ children }: { children: React.ReactNode }) => (
    <StyledBox>
        <StyledTube />
        <StyledTubeJoin />
        {children}
    </StyledBox>
);

const StyledBox = styled(Row)`
    position: relative;
    gap: ${spacingCss(2)};
    min-height: 500px;
`;

const StyledTube = styled.div`
    position: absolute;
    top: -${spacingCss(1)};
    height: 100%;
    left: 0;
    width: 16%;
    background-color: #9fa0a6;
`;

const StyledTubeJoin = styled(TubeJoin)`
    margin-top: ${spacingCss(1)};
    width: 20%;
    z-index: 1;
    height: min-content;
`;
