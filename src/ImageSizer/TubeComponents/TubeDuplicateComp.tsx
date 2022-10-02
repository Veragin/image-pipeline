import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { observer } from "mobx-react";
import { TubeDuplicate } from "ImageSizer/Tube/TubeDuplicate";
import { booleanList, ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";
import RsInput from "react-utils/Components/RsInput/RsInput";

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
                <RsSelect
                    title={_("Should inverse selection")}
                    value={tube.config.inverseSelection}
                    setValue={(inverseSelection) => tube.setConfig({ inverseSelection })}
                    list={booleanList}
                />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="selection" />
        </TubeCompCont>
    );
});
