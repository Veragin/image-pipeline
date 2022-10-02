import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeJoin } from "../Tube/TubeJoin";
import { observer } from "mobx-react";
import { ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeJoin;
    collection: ImageCollection;
};

export const TubeJoinComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsInput
                    title={_("Group by")}
                    value={String(tube.config.groupBy)}
                    type="number"
                    onChange={(groupBy) => tube.setConfig({ groupBy: Number(groupBy) })}
                />
                <RsInput
                    title={_("Image count in row")}
                    value={String(tube.config.imageCountInRow)}
                    type="number"
                    onChange={(imageNumberOnRow) =>
                        tube.setConfig({
                            imageCountInRow: Number(imageNumberOnRow),
                        })
                    }
                />
                <RsInput
                    title={_("Max Width")}
                    value={String(tube.config.maxWidth)}
                    type="number"
                    onChange={(maxWidth) => tube.setConfig({ maxWidth: Number(maxWidth) })}
                />
                <RsInput
                    title={_("Vertical gap")}
                    value={String(tube.config.verticalGap)}
                    type="number"
                    onChange={(verticalGap) => tube.setConfig({ verticalGap: Number(verticalGap) })}
                />
                <RsInput
                    title={_("Horizontal gap")}
                    value={String(tube.config.horizontalGap)}
                    type="number"
                    onChange={(horizontalGap) =>
                        tube.setConfig({ horizontalGap: Number(horizontalGap) })
                    }
                />
            </ConfigComp>

            <TubeCompCollection collection={collection} show="selection" />
        </TubeCompCont>
    );
});
