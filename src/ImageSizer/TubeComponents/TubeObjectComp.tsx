import { BbConfig } from "./ConfigComp/BbConfig";
import { ImageCollection } from "../ImageColection";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { TubeObject } from "../Tube/TubeObject";
import { observer } from "mobx-react";
import { ConfigComp, ConfigRow, TubeCompCont } from "./ConfigComp/ConfigUtils";
import { Column } from "react-utils/Components/StyledComponents";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";
import RsNumber from "react-utils/Components/RsInput/RsNumber";

type Props = {
    tube: TubeObject;
    collection: ImageCollection;
};

export const TubeObjectComp = observer(({ tube, collection }: Props) => {
    const numbers = collection.stack.map((item) => item.objects.length).join(", ");

    return (
        <TubeCompCont>
            <ConfigRow>
                <ConfigComp>
                    <RsNumber
                        title={_("Compact Distance")}
                        value={tube.config.compactDistance}
                        onChange={(v) => tube.setConfig({ compactDistance: v })}
                        step={1}
                        min={0}
                        helpTooltip={_(
                            "Number of pixels that are still compacted. Value 0 means that pixels are compact only if they are next to each other. Value 2 means that that there can be 2 pixels gap between selected pixels, but they are still compact."
                        )}
                    />
                    <RsNumber
                        title={_("Minimal pixel count")}
                        value={tube.config.minimalPixelCount}
                        onChange={(v) => tube.setConfig({ minimalPixelCount: v })}
                        step={1}
                        min={0}
                        helpTooltip={_("Minimal number of compact pixels that define an object.")}
                    />
                    <RsNumber
                        title={_("Minimal width")}
                        value={tube.config.minimalWidth}
                        onChange={(v) => tube.setConfig({ minimalWidth: v })}
                        step={1}
                        min={0}
                        helpTooltip={_("Minimal width of compact pixels that define an object.")}
                    />
                    <RsNumber
                        title={_("Minimal height")}
                        value={tube.config.minimalHeight}
                        onChange={(v) => tube.setConfig({ minimalHeight: v })}
                        step={1}
                        min={0}
                        helpTooltip={_("Minimal height of compact pixels that define an object.")}
                    />
                </ConfigComp>
                <ConfigComp>
                    <BbConfig
                        bbConfig={tube.config.bbConfig}
                        onChange={(bbConfig) => tube.setConfig({ bbConfig })}
                    />
                </ConfigComp>
            </ConfigRow>

            <DisplayPreviewCollection collection={collection} showInit="objects" />

            <Column>
                <InputTitle>{_("Number of found objects in each piece")}</InputTitle>
                {numbers}
            </Column>
        </TubeCompCont>
    );
});
