import { TTubeCutType, TubeCut } from "../../Tube/TubeCut";

import { FixedConfig } from "./FixedConfig";
import { ImageCollection } from "../../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import { PercentConfig } from "./PercentConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "../TubeCompCollection";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp } from "../ConfigComp/ConfigUtils";

type Props = {
    tube: TubeCut;
    collection: ImageCollection;
};

export const TubeCutComp = observer(({ tube, collection }: Props) => {
    const isWithConfig = tube.config.type !== "object";

    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />

                {isWithConfig && <InputTitle>{_("Config")}</InputTitle>}
                <FixedConfig tube={tube} />
                <PercentConfig tube={tube} />
            </ConfigComp>

            <TubeCompCollection collection={collection} />
        </TubeCompCont>
    );
});

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
