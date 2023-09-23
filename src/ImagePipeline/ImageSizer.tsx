import { Column, Row } from "react-utils/Components/StyledComponents";

import { TubeComp } from "./TubeComponents/TubeComp";
import { TubeList } from "./TubeList/TubeList";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";
import { TopBar } from "react-utils/Patterns/TopBar";
import { TopControl } from "./TopControl";
import { Pipeline } from "./Pipeline";
import { TTemplate } from "./Const";

type Props = {
    openLandingPage: () => void;
    initTemplate?: TTemplate;
};

export const ImageSizer = observer(({ openLandingPage, initTemplate }: Props) => {
    const [pipeline] = useState(new Pipeline(initTemplate));

    const tube = pipeline.tubeTree.activeTube;
    const collection = pipeline.tubeTree.activeColection;

    return (
        <StyledCont>
            <TopBar
                onHome={openLandingPage}
                onUser={() => console.log("open user")}
                logoComp={<TopControl pipeline={pipeline} />}
                darkMode
            />
            <StyledRow>
                <TubeList tubeTree={pipeline.tubeTree} />
                <StyledBody>
                    <TubeComp tube={tube} collection={collection} />
                </StyledBody>
            </StyledRow>
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    width: 100%;
    height: 100vh;
`;

const StyledRow = styled(Row)`
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;

const StyledBody = styled(Column)`
    flex: 1;
    overflow: hidden;
`;
