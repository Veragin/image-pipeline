import { Column } from "react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeRotate } from "../Tube/TubeRotate";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeRotate;
    collection: ImageCollection;
};

export const TubeRotateComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsInput
                    title={_("Degree")}
                    value={String(tube.config.angle)}
                    type="number"
                    onChange={(angle) =>
                        tube.setConfig({ angle: Number(angle) })
                    }
                />
            </StyledConfig>

            <TubeCompCollection collection={collection} show="objects" />
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    padding-top: ${spacingCss(1)};
`;

const StyledConfig = styled(Column)`
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    width: 400px;
`;
