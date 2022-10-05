import { spacingCss } from "react-utils/Components/globalCss";
import { Column, Row } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { ReactComponent as TubeJoin } from "Assets/landing/tubeJoin.svg";
import { Highlight } from "LandingPage/Components";

type Props = {
    title: string;
    children: React.ReactNode;
};

export const BoxContent = ({ children, title }: Props) => {
    return (
        <StyledBox>
            <StyledTube />
            <StyledContentBody>
                <StyledTitleCont>
                    <StyledTubeJoin />
                    <StyledTitle>{title}</StyledTitle>
                </StyledTitleCont>

                {children}
            </StyledContentBody>
        </StyledBox>
    );
};

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
    background: linear-gradient(90deg, #9a9ca5 20%, #a3a5ad 100%);
`;

const StyledTitleCont = styled(Row)`
    margin-top: ${spacingCss(1)};
    margin-left: -25vw;
`;

const StyledTubeJoin = styled(TubeJoin)`
    width: 20vw;
    z-index: 1;
    height: min-content;
`;

const StyledContentBody = styled(Column)`
    flex: 1;
    gap: ${spacingCss(2)};
    margin-left: 25vw;
`;

const StyledTitle = styled(Highlight)`
    font-size: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
`;
