import { ImageCollection } from "../ImageColection";
import { TubeColor } from "../Tube/TubeColor";
import { TubeCompCollection } from "./TubeCompCollection";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeColor;
    collection: ImageCollection;
};

export const TubeColorComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <ToolbarColor
                    label={_("Color")}
                    value={tube.config.color}
                    onChange={(color) => tube.setConfig({ color })}
                />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="objects" />
        </TubeCompCont>
    );
});
