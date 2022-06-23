import { Column } from "react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import { TechColor } from "../Tech/TechColor";
import { TechCompCollection } from "./TechCompCollection";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechColor;
    collection: ImageCollection;
};

export const TechColorComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <ToolbarColor
                    label={_("Color")}
                    value={tech.config.color}
                    onChange={(color) => tech.setConfig({ color })}
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
