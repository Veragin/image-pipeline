import { ImageCollection } from "../ImageColection";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeMirror } from "../Tube/TubeMirror";
import { observer } from "mobx-react";
import { ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";

type Props = {
    tube: TubeMirror;
    collection: ImageCollection;
};

export const TubeMirrorComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSwitch
                    title={_("Vertical")}
                    value={tube.config.vertical}
                    onChange={(vertical) => tube.setConfig({ vertical })}
                />
                <RsSwitch
                    title={_("Horizontal")}
                    value={tube.config.horizontal}
                    onChange={(horizontal) => tube.setConfig({ horizontal })}
                />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="selection" />
        </TubeCompCont>
    );
});
