import { Column } from "react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import { TubeColor } from "../Tube/TubeColor";
import { TubeCompCollection } from "./TubeCompCollection";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeColor;
    collection: ImageCollection;
};

export const TubeColorComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <ToolbarColor
                    label={_("Color")}
                    value={tube.config.color}
                    onChange={(color) => tube.setConfig({ color })}
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
