import { TTubeSelectMode, TTubeSelectType, TubeSelect } from "ImageSizer/Tube/TubeSelect";

import { BoxConfig } from "../ConfigComp/BoxConfig";
import { ColorConfig } from "./ColorConfig";
import { ImageCollection } from "../../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import { NeighborConfig } from "./NeighborConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "../TubeCompCollection";
import { observer } from "mobx-react";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";
import { ConfigComp, TubeCompCont } from "../ConfigComp/ConfigUtils";

type Props = {
    tube: TubeSelect;
    collection: ImageCollection;
};

export const TubeSelectComp = observer(({ tube, collection }: Props) => {
    const isWithConfig = tube.config.type !== "old";

    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSelect
                    title={_("Mode")}
                    value={tube.config.mode}
                    setValue={(mode) => tube.setConfig({ mode })}
                    list={tubeModeList}
                />
                <RsSwitch
                    title={_("Inverse")}
                    value={tube.config.inverse}
                    onChange={(inverse) => tube.setConfig({ inverse })}
                />
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />

                {isWithConfig && <InputTitle>{_("Config")}</InputTitle>}
                <BoxConfig
                    type={tube.config.type}
                    box={tube.config.box}
                    onChange={(box) => tube.setConfig({ box })}
                />
                <ColorConfig tube={tube} />
                <NeighborConfig tube={tube} />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="selection" />
        </TubeCompCont>
    );
});

const tubeModeList: { title: string; value: TTubeSelectMode }[] = [
    {
        title: _("New Selection"),
        value: "newSelect",
    },
    {
        title: _("Modify Addition"),
        value: "modifyAdd",
    },
    {
        title: _("Modify Subtraction"),
        value: "modifySub",
    },
    {
        title: _("Modify Intersection"),
        value: "modifyInter",
    },
];

const tubeTypeList: { title: string; value: TTubeSelectType }[] = [
    {
        title: _("Selection by Box "),
        value: "box",
    },
    {
        title: _("Selection by Color"),
        value: "color",
    },
    {
        title: _("Selection by Naighbor"),
        value: "neighbor",
    },
    {
        title: _("Use already selected (old)"),
        value: "old",
    },
];
