import { ImageCollection } from "../ImageColection";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { observer } from "mobx-react";
import { TubeDuplicate } from "ImageSizer/Tube/TubeDuplicate";
import { ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";
import RsNumber from "react-utils/Components/RsInput/RsNumber";

type Props = {
    tube: TubeDuplicate;
    collection: ImageCollection;
};

export const TubeDuplicateComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsNumber
                    title={_("Count")}
                    value={tube.config.count}
                    step={1}
                    min={0}
                    onChange={(count) => tube.setConfig({ count })}
                />
                <RsSwitch
                    title={_("Should inverse selection")}
                    value={tube.config.inverseSelection}
                    onChange={(inverseSelection) => tube.setConfig({ inverseSelection })}
                    helpTooltip={_(
                        "In duplicated pieces will be selection inverted (selected pixels become unselected and vice versa)"
                    )}
                />
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="selection" />
        </TubeCompCont>
    );
});
