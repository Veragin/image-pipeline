import { Column, Row } from "react-utils/Components/StyledComponents";

import { TechComp } from "./TechComponents/TechComp";
import { TechList } from "./TechList";
import { TechTree } from "./TechTree";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";

export const ImageSizer = observer(() => {
    const [techTree] = useState(new TechTree());

    const tech = techTree.activeTech;
    const collection = techTree.activeColection;

    return (
        <StyledRow>
            <TechList techTree={techTree} />
            <StyledCont>
                <TechComp tech={tech} collection={collection} />
            </StyledCont>
        </StyledRow>
    );
});

const StyledRow = styled(Row)`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const StyledCont = styled(Column)`
    flex: 1;
    overflow: hidden;
`;
