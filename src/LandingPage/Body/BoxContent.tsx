import { spacingCss } from 'react-utils/Components/globalCss';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import styled from 'styled-components';
import TubeJoin from 'Assets/landing/tubeJoin.svg';
import { Highlight } from 'LandingPage/Components';

type Props = {
    title: string;
    id: string;
    children: React.ReactNode;
};

export const BoxContent = ({ children, title, id }: Props) => {
    return (
        <StyledBox id={id}>
            <StyledTube />
            <StyledContentBody>
                <StyledTitleCont>
                    <StyledTubeJoin src={TubeJoin} />
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
    padding-bottom: ${spacingCss(10)};
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
    margin-left: -20vw;
`;

const StyledTubeJoin = styled.img`
    width: 20vw;
    z-index: 1;
    height: min-content;
`;

const StyledContentBody = styled(Column)`
    flex: 1;
    gap: ${spacingCss(2)};
    margin-left: 20vw;
`;

const StyledTitle = styled(Highlight)`
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
`;
