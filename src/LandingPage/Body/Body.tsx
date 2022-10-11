import { Highlight } from "LandingPage/Components";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { BoxContent } from "./BoxContent";

export const Body = () => {
    return (
        <StyledPipeCont>
            <StyledPipeTube />
            <Column>
                <BoxContent title={_("Get started")}>
                    <StyledCenterColumn>
                        <p>
                            Watch <Highlight>3 minute tutorial</Highlight> and get started right now
                        </p>
                    </StyledCenterColumn>
                </BoxContent>
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

const StyledCenterColumn = styled(Column)`
    width: 100%;
    align-items: center;
`;
