import { TTechScaleType, TechScale } from "../Tech/TechScale";

import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { SizeConfig } from "./ConfigComp/SizeConfig";
import { TechCompCollection } from "./TechCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechScale;
    collection: ImageCollection;
};

export const TechScaleComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tech.config.type}
                    setValue={(type) => tech.setConfig({ type })}
                    list={techTypeList}
                />

                <SizeConfig
                    show={tech.config.type === "box"}
                    size={tech.config.box}
                    onChange={(box) => tech.setConfig({ box })}
                />
                <SizeConfig
                    show={tech.config.type === "padding"}
                    size={tech.config.padding}
                    onChange={(padding) => tech.setConfig({ padding })}
                />
                <SizeConfig
                    show={tech.config.type === "percent"}
                    size={tech.config.percent}
                    onChange={(percent) => tech.setConfig({ percent })}
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

const techTypeList: { title: string; value: TTechScaleType }[] = [
    {
        title: _("Box"),
        value: "box",
    },
    {
        title: _("Padding"),
        value: "padding",
    },
    {
        title: _("Percent"),
        value: "percent",
    },
];
