import { BbConfig } from "./ConfigComp/BbConfig";
import { ImageCollection } from "../ImageColection";
import RsInput from "../../react-utils/Components/RsInput/RsInput";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeObject } from "../Tube/TubeObject";
import { observer } from "mobx-react";
import { ConfigComp, ConfigRow, TubeCompCont } from "./ConfigComp/ConfigUtils";
import { Column } from "react-utils/Components/StyledComponents";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";

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
                    <RsInput
                        title={_("Compact Distance")}
                        value={String(tube.config.compactDistance)}
                        type="number"
                        onChange={(v) => tube.setConfig({ compactDistance: Number(v) })}
                        helpTooltip={_(
                            "Number of pixels that are still compacted. Value 0 means that pixels are compact only if they are next to each other. Value 2 means that that there can be 2 pixels gap between selected pixels, but they are still compact."
                        )}
                    />
                    <RsInput
                        title={_("Minimal pixel count")}
                        value={String(tube.config.minimalPixelCount)}
                        type="number"
                        onChange={(v) => tube.setConfig({ minimalPixelCount: Number(v) })}
                        helpTooltip={_("Minimal number of compact pixels that define an object.")}
                    />
                    <RsInput
                        title={_("Minimal width")}
                        value={String(tube.config.minimalWidth)}
                        type="number"
                        onChange={(v) => tube.setConfig({ minimalWidth: Number(v) })}
                        helpTooltip={_("Minimal width of compact pixels that define an object.")}
                    />
                    <RsInput
                        title={_("Minimal height")}
                        value={String(tube.config.minimalHeight)}
                        type="number"
                        onChange={(v) => tube.setConfig({ minimalHeight: Number(v) })}
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

            <TubeCompCollection collection={collection} show="objects" />

            <Column>
                <InputTitle>{_("Number of found objects in each piece")}</InputTitle>
                {numbers}
            </Column>
        </TubeCompCont>
    );
});
