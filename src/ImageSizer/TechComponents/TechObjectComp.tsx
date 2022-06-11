import { BbConfig } from "./ConfigComp/BbConfig";
import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "../../react-utils/Components/RsInput/RsInput";
import { TechCompCollection } from "./TechCompCollection";
import { TechObject } from "../Tech/TechObject";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechObject;
    collection: ImageCollection;
};

export const TechObjectComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsInput
                    title={_("Compact Distance")}
                    value={String(tech.config.compactDistance)}
                    type="number"
                    onChange={(v) => tech.setConfig({ compactDistance: Number(v) })}
                />
                <RsInput
                    title={_("Minimal pixel count")}
                    value={String(tech.config.minimalPixelCount)}
                    type="number"
                    onChange={(v) => tech.setConfig({ minimalPixelCount: Number(v) })}
                />
                <RsInput
                    title={_("Minimal width")}
                    value={String(tech.config.minimalWidth)}
                    type="number"
                    onChange={(v) => tech.setConfig({ minimalWidth: Number(v) })}
                />
                <RsInput
                    title={_("Minimal height")}
                    value={String(tech.config.minimalHeight)}
                    type="number"
                    onChange={(v) => tech.setConfig({ minimalHeight: Number(v) })}
                />
                <BbConfig bbConfig={tech.config.bbConfig} onChange={(bbConfig) => tech.setConfig({ bbConfig })} />
            </StyledConfig>

            <TechCompCollection collection={collection} show="objects" />

            {"Found " + collection.stack.map((item) => item.objects.length).join(", ")}
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
