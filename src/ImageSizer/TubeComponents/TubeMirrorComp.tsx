import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeMirror } from "../Tube/TubeMirror";
import { observer } from "mobx-react";
import { booleanList, ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeMirror;
    collection: ImageCollection;
};

export const TubeMirrorComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSelect
                    title={_("Vertical")}
                    value={tube.config.vertical}
                    setValue={(vertical) => tube.setConfig({ vertical })}
                    list={booleanList}
                />
                <RsSelect
                    title={_("Horizontal")}
                    value={tube.config.horizontal}
                    setValue={(horizontal) => tube.setConfig({ horizontal })}
                    list={booleanList}
                />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="selection" />
        </TubeCompCont>
    );
});
