import { TTemplate } from "ImageSizer/Const";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { BoxContent } from "./BoxContent";
import { Examples } from "./Examples";
import { Sizefire } from "./Sizefire";
import { GetStarted } from "./GetStarted";

type Props = {
    onStart: (template?: TTemplate) => void;
};

export const Body = ({ onStart }: Props) => {
    return (
        <StyledPipeCont>
            <StyledPipeTube />
            <Column>
                <BoxContent title={_("Get started")} id="tutorial">
                    <GetStarted onStart={onStart} />
                </BoxContent>
                <BoxContent title={_("Examples")} id="examples">
                    <Examples onStart={onStart} />
                </BoxContent>
                <BoxContent title={_("Sizefire")} id="sizefire">
                    <Sizefire />
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
