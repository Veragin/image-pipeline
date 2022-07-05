import { Column, Row } from "react-utils/Components/StyledComponents";

import { TechComp } from "./TechComponents/TechComp";
import { TechList } from "./TechList";
import { TechTree } from "./TechTree";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";
import { TopBar } from "react-utils/Components/Common/TopBar";
import { TopControl } from "./TopControl";

type Props = {
    openLandingPage: () => void;
};

export const ImageSizer = observer(({ openLandingPage }: Props) => {
    const [techTree] = useState(new TechTree());

    const tech = techTree.activeTech;
    const collection = techTree.activeColection;

    return (
        <StyledCont>
            <TopBar
                onHome={openLandingPage}
                onUser={() => console.log("open user")}
                logoComp={<TopControl techTree={techTree} />}
            />
            <StyledRow>
                <TechList techTree={techTree} />
                <StyledBody>
                    <TechComp tech={tech} collection={collection} />
                </StyledBody>
            </StyledRow>
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    width: 100vw;
    height: 100vh;
`;

const StyledRow = styled(Row)`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const StyledBody = styled(Column)`
    flex: 1;
    overflow: hidden;
`;
