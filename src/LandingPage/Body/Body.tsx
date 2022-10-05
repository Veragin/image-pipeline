import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { BoxContent } from "./BoxContent";

export const Body = () => {
    return (
        <StyledPipeCont>
            <StyledPipeTube />
            <Column>
                <BoxContent title={_("Get started")}>Conetnt</BoxContent>
                <BoxContent title={_("Give us feedback")}>Conetnt</BoxContent>
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
