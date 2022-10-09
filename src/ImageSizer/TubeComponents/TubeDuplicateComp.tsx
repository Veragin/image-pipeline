import { ImageCollection } from "../ImageColection";
import { TubeCompCollection } from "./TubeCompCollection";
import { observer } from "mobx-react";
import { TubeDuplicate } from "ImageSizer/Tube/TubeDuplicate";
import { ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";

type Props = {
    tube: TubeDuplicate;
    collection: ImageCollection;
};

export const TubeDuplicateComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsInput
                    title={_("Count")}
                    value={String(tube.config.count)}
                    type="number"
                    onChange={(count) => tube.setConfig({ count: Number(count) })}
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

            <TubeCompCollection collection={collection} show="selection" />
        </TubeCompCont>
    );
});
