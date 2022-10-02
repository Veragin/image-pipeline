import { TTubeScaleType, TubeScale } from "../Tube/TubeScale";

import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { SizeConfig } from "./ConfigComp/SizeConfig";
import { TubeCompCollection } from "./TubeCompCollection";
import { observer } from "mobx-react";
import { ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeScale;
    collection: ImageCollection;
};

export const TubeScaleComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />

                <SizeConfig
                    show={tube.config.type === "box"}
                    size={tube.config.box}
                    onChange={(box) => tube.setConfig({ box })}
                />
                <SizeConfig
                    show={tube.config.type === "padding"}
                    size={tube.config.padding}
                    onChange={(padding) => tube.setConfig({ padding })}
                />
                <SizeConfig
                    show={tube.config.type === "percent"}
                    size={tube.config.percent}
                    onChange={(percent) => tube.setConfig({ percent })}
                />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="objects" />
        </TubeCompCont>
    );
});

const tubeTypeList: { title: string; value: TTubeScaleType }[] = [
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
