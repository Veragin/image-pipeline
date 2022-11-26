import { ImageCollection } from "../ImageColection";
import { TTubeColorMode, TubeColor } from "../Tube/TubeColor";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";
import RsSelect from "react-utils/Components/RsInput/RsSelect";

type Props = {
    tube: TubeColor;
    collection: ImageCollection;
};

export const TubeColorComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSelect
                    title={_("Mode")}
                    value={tube.config.mode}
                    setValue={(mode) => tube.setConfig({ mode })}
                    list={tubeModeList}
                    helpTooltip={_("Choose how to modify selected pixels")}
                />
                <ToolbarColor
                    label={_("Color")}
                    value={tube.config.color}
                    onChange={(color) => tube.setConfig({ color })}
                />
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
        </TubeCompCont>
    );
});

const tubeModeList: { title: string; value: TTubeColorMode }[] = [
    {
        title: _("Color"),
        value: "color",
    },
    {
        title: _("Invert color"),
        value: "invert",
    },
];
