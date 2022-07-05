import { TTubeCropType, TubeCrop } from "../Tube/TubeCrop";

import { BbConfig } from "./ConfigComp/BbConfig";
import { BoxConfig } from "./ConfigComp/BoxConfig";
import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeCrop;
    collection: ImageCollection;
};

export const TubeCropComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />
                <BoxConfig
                    type={tube.config.type}
                    box={tube.config.box}
                    onChange={(box) => tube.setConfig({ box })}
                />
                <BbConfig
                    bbConfig={tube.config.bbConfig}
                    onChange={(bbConfig) => tube.setConfig({ bbConfig })}
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

const tubeTypeList: { title: string; value: TTubeCropType }[] = [
    {
        title: _("Image"),
        value: "image",
    },
    {
        title: _("Box"),
        value: "box",
    },
    {
        title: _("Selection"),
        value: "selection",
    },
    {
        title: _("Objects"),
        value: "objects",
    },
];
