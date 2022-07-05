import { Column, Row } from "react-utils/Components/StyledComponents";

import { TubeComp } from "./TubeComponents/TubeComp";
import { TubeList } from "./TubeList";
import { TubeTree } from "./TubeTree";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";
import { TopBar } from "react-utils/Components/Common/TopBar";
import { TopControl } from "./TopControl";

type Props = {
    openLandingPage: () => void;
};

export const ImageSizer = observer(({ openLandingPage }: Props) => {
    const [tubeTree] = useState(new TubeTree());

    const tube = tubeTree.activeTube;
    const collection = tubeTree.activeColection;

    return (
        <StyledCont>
            <TopBar
                onHome={openLandingPage}
                onUser={() => console.log("open user")}
                logoComp={<TopControl tubeTree={tubeTree} />}
            />
            <StyledRow>
                <TubeList tubeTree={tubeTree} />
                <StyledBody>
                    <TubeComp tube={tube} collection={collection} />
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
