import { Button } from '@mui/material';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import logo from 'Assets/logo/logo.svg';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';
import { Highlight } from './Components';
import { useRef } from 'react';
import { PaintEngine } from './PaintEngine/PaintEngine';
import { useRunOnlyOnce } from 'react-utils/basic/hooks';
import { TTemplate } from 'ImagePipeline/Const';
import { isDev } from 'react-utils/basic/misc';
import { compute } from 'gpuTest/compute';

type Props = {
    onStart: (template?: TTemplate) => void;
};

export const Landing = ({ onStart }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const paint = useRef<PaintEngine | null>(null);

    useRunOnlyOnce(() => {
        if (canvasRef.current) {
            paint.current = new PaintEngine(canvasRef.current);
        }
    });

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        const y = (element?.getBoundingClientRect().top ?? 0) + window.scrollY;
        window.scroll({
            top: y,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <StyledDiv>
                <StyledCanvas ref={canvasRef} />
                <StyledTop>
                    <a href="https://veragin.com">
                        <StyledLogo src={logo} />
                    </a>
                </StyledTop>
                <StyledTitleCont>
                    <StyledTitle>
                        Image <Highlight>Pipeline</Highlight>
                    </StyledTitle>
                </StyledTitleCont>
            </StyledDiv>
            <StyledMenu>
                <StyledMenuItem onClick={() => scrollTo('tutorial')}>
                    {_('Get started')}
                </StyledMenuItem>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        onStart();
                    }}
                >
                    {_('Start right now')}
                </Button>
                {isDev() && (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            compute();
                        }}
                    >
                        {_('Test')}
                    </Button>
                )}
                <StyledMenuItem onClick={() => scrollTo('examples')}>
                    {_('Examples')}
                </StyledMenuItem>

                <StyledMenuItem onClick={() => scrollTo('sizefire')}>SizeFire</StyledMenuItem>
            </StyledMenu>
        </>
    );
};

const StyledDiv = styled.div`
    overflow: hidden;
    position: relative;
`;

const StyledCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
`;

const StyledTop = styled(Row)`
    width: calc(100% - ${spacingCss(4)});
    justify-content: space-between;
    padding: ${spacingCss(2)};
`;

/*const StyledButtonRow = styled(Row)`
    gap: ${spacingCss(1)};
`;*/

const StyledLogo = styled.img`
    height: 42px;
    cursor: pointer;
`;

const StyledTitleCont = styled(Column)`
    width: 100%;
    height: 70vh;
    justify-content: space-evenly;
    align-items: center;
`;

const StyledTitle = styled(Row)`
    gap: ${spacingCss(3)};
    font-size: 64px;
    text-transform: uppercase;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 100px 100px rgba(255, 255, 255, 0.4);
    border-radius: 40%;
    align-items: center;
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
