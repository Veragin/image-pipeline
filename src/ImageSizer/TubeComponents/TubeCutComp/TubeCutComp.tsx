import { TTubeCutType, TubeCut } from "../../Tube/TubeCut";

import { Column } from "react-utils/Components/StyledComponents";
import { FixedConfig } from "./FixedConfig";
import { ImageCollection } from "../../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import { PercentConfig } from "./PercentConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "../TubeCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeCut;
    collection: ImageCollection;
};

export const TubeCutComp = observer(({ tube, collection }: Props) => {
    const isWithConfig = tube.config.type !== "object";

    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />

                {isWithConfig && <InputTitle>{_("Config")}</InputTitle>}
                <FixedConfig tube={tube} />
                <PercentConfig tube={tube} />
            </StyledConfig>

            <TubeCompCollection collection={collection} />
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

const tubeTypeList: { title: string; value: TTubeCutType }[] = [
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
