import { TTubeSelectMode, TTubeSelectMethod, TubeSelect } from "ImageSizer/Tube/TubeSelect";

import { BoxConfig } from "../ConfigComp/BoxConfig";
import { ColorConfig } from "./ColorConfig";
import { ImageCollection } from "../../ImageColection";
import { NeighborConfig } from "./NeighborConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "../TubeCompCollection";
import { observer } from "mobx-react";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";
import { ConfigComp, ConfigRow, TubeCompCont } from "../ConfigComp/ConfigUtils";

type Props = {
    tube: TubeSelect;
    collection: ImageCollection;
};

export const TubeSelectComp = observer(({ tube, collection }: Props) => {
    const isWithConfig = tube.config.method !== "old";

    return (
        <TubeCompCont>
            <ConfigRow>
                <ConfigComp>
                    <RsSelect
                        title={_("Selecting method")}
                        value={tube.config.method}
                        setValue={(method) => tube.setConfig({ method })}
                        list={tubeMethodList}
                        helpTooltip={_("Choose how the pixels will be selected")}
                    />

                    {isWithConfig && (
                        <>
                            <RsSwitch
                                title={_("Inverse")}
                                value={tube.config.inverse}
                                onChange={(inverse) => tube.setConfig({ inverse })}
                                helpTooltip={_(
                                    "Invert selection. Selected pixels become unselected and vice versa."
                                )}
                            />
                            <RsSelect
                                title={_("Interaction with the previous selection")}
                                value={tube.config.mode}
                                setValue={(mode) => tube.setConfig({ mode })}
                                list={tubeModeList}
                            />
                        </>
                    )}
                </ConfigComp>
                <ConfigComp>
                    <BoxConfig
                        type={tube.config.method}
                        box={tube.config.box}
                        onChange={(box) => tube.setConfig({ box })}
                    />
                    <ColorConfig tube={tube} />
                    <NeighborConfig tube={tube} />
                </ConfigComp>
            </ConfigRow>

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

const tubeMethodList: { title: string; value: TTubeSelectMethod }[] = [
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
        title: _("Invert already selected pixels"),
        value: "old",
    },
];
