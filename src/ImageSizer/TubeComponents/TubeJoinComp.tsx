import { ImageCollection } from "../ImageColection";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { TubeJoin } from "../Tube/TubeJoin";
import { observer } from "mobx-react";
import { ConfigComp, TubeCompCont } from "./ConfigComp/ConfigUtils";
import RsNumber from "react-utils/Components/RsInput/RsNumber";

type Props = {
    tube: TubeJoin;
    collection: ImageCollection;
};

export const TubeJoinComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsNumber
                    title={_("Group by")}
                    value={tube.config.groupBy}
                    onChange={(groupBy) => tube.setConfig({ groupBy })}
                    helpTooltip={_("Number of pieces joined together. 0 means no limit.")}
                    step={1}
                    min={0}
                />
                <RsNumber
                    title={_("Image count in row")}
                    value={tube.config.imageCountInRow}
                    onChange={(imageCountInRow) =>
                        tube.setConfig({
                            imageCountInRow,
                        })
                    }
                    step={1}
                    min={0}
                    helpTooltip={_(
                        "Define max number of piecies in each row in resulted image. Overfloating pieces will be wrapped. 0 means no limit."
                    )}
                />
                <RsNumber
                    title={_("Max Width")}
                    value={tube.config.maxWidth}
                    onChange={(maxWidth) => tube.setConfig({ maxWidth })}
                    step={1}
                    min={0}
                    helpTooltip={_(
                        "Define max width of resulted image. Overfloating pieces will be wrapped. 0 means no limit."
                    )}
                />
                <RsNumber
                    title={_("Vertical gap")}
                    value={tube.config.verticalGap}
                    onChange={(verticalGap) => tube.setConfig({ verticalGap })}
                    step={1}
                    min={0}
                    helpTooltip={_("Adds vertival gap between joined pieces")}
                />
                <RsNumber
                    title={_("Horizontal gap")}
                    value={tube.config.horizontalGap}
                    onChange={(horizontalGap) => tube.setConfig({ horizontalGap })}
                    step={1}
                    min={0}
                    helpTooltip={_("Adds horizontal gap between joined pieces")}
                />
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="selection" />
        </TubeCompCont>
    );
});
