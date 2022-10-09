import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { TubeRotate } from "../Tube/TubeRotate";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeRotate;
    collection: ImageCollection;
};

export const TubeRotateComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsInput
                    title={_("Degree")}
                    value={String(tube.config.angle)}
                    type="number"
                    onChange={(angle) => tube.setConfig({ angle: Number(angle) })}
                />
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
        </TubeCompCont>
    );
});
