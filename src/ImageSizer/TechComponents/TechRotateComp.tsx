import { Column } from "react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TechCompCollection } from "./TechCompCollection";
import { TechRotate } from "../Tech/TechRotate";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechRotate;
    collection: ImageCollection;
};

export const TechRotateComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsInput
                    title={_("Degree")}
                    value={String(tech.config.angle)}
                    type="number"
                    onChange={(angle) =>
                        tech.setConfig({ angle: Number(angle) })
                    }
                />
            </StyledConfig>

            <TechCompCollection collection={collection} show="objects" />
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
