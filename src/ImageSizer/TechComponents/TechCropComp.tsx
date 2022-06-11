import { TTechCropType, TechCrop } from "ImageSIzer/Tech/TechCrop";

import { BbConfig } from "./ConfigComp/BbConfig";
import { BoxConfig } from "./ConfigComp/BoxConfig";
import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TechCompCollection } from "./TechCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechCrop;
    collection: ImageCollection;
};

export const TechCropComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tech.config.type}
                    setValue={(type) => tech.setConfig({ type })}
                    list={techTypeList}
                />
                <BoxConfig type={tech.config.type} box={tech.config.box} onChange={(box) => tech.setConfig({ box })} />
                <BbConfig bbConfig={tech.config.bbConfig} onChange={(bbConfig) => tech.setConfig({ bbConfig })} />
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

const techTypeList: { title: string; value: TTechCropType }[] = [
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
