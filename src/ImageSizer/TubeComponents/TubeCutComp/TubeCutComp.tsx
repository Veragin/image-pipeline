import { TTubeCutType, TubeCut } from "../../Tube/TubeCut";

import { FixedConfig } from "./FixedConfig";
import { ImageCollection } from "../../ImageColection";
import { PercentConfig } from "./PercentConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { DisplayPreviewCollection } from "../DisplayPreviewCollection";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp, ConfigRow } from "../ConfigComp/ConfigUtils";

type Props = {
    tube: TubeCut;
    collection: ImageCollection;
};

export const TubeCutComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigRow>
                <ConfigComp>
                    <RsSelect
                        title={_("Type")}
                        value={tube.config.type}
                        setValue={(type) => tube.setConfig({ type })}
                        list={tubeTypeList}
                    />
                </ConfigComp>
                <ConfigComp>
                    <FixedConfig tube={tube} />
                    <PercentConfig tube={tube} />
                </ConfigComp>
            </ConfigRow>

            <DisplayPreviewCollection collection={collection} />
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
