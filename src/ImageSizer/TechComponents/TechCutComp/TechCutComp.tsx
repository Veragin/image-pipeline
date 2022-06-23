import { TTechCutType, TechCut } from "../../Tech/TechCut";

import { Column } from "react-utils/Components/StyledComponents";
import { FixedConfig } from "./FixedConfig";
import { ImageCollection } from "../../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import { PercentConfig } from "./PercentConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TechCompCollection } from "../TechCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechCut;
    collection: ImageCollection;
};

export const TechCutComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tech.config.type}
                    setValue={(type) => tech.setConfig({ type })}
                    list={techTypeList}
                />

                <InputTitle>{_("Config")}</InputTitle>
                <FixedConfig tech={tech} />
                <PercentConfig tech={tech} />
            </StyledConfig>

            <TechCompCollection collection={collection} />
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

const techTypeList: { title: string; value: TTechCutType }[] = [
    {
        title: _("Fixed cut"),
        value: "fixed",
    },
    {
        title: _("Object cut"),
        value: "object",
    },
    {
        title: _("Percentage cut"),
        value: "percent",
    },
];
