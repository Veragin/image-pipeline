import { TTubeCropType, TubeCrop } from "../Tube/TubeCrop";

import { BbConfig } from "./ConfigComp/BbConfig";
import { BoxConfig } from "./ConfigComp/BoxConfig";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp, ConfigRow } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeCrop;
    collection: ImageCollection;
};

export const TubeCropComp = observer(({ tube, collection }: Props) => {
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

                    <BbConfig
                        bbConfig={tube.config.bbConfig}
                        onChange={(bbConfig) => tube.setConfig({ bbConfig })}
                    />
                </ConfigComp>
                <ConfigComp>
                    <BoxConfig
                        type={tube.config.type}
                        box={tube.config.box}
                        onChange={(box) => tube.setConfig({ box })}
                    />
                </ConfigComp>
            </ConfigRow>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
        </TubeCompCont>
    );
});

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
