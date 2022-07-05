import { BbConfig } from "./ConfigComp/BbConfig";
import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "../../react-utils/Components/RsInput/RsInput";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeObject } from "../Tube/TubeObject";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeObject;
    collection: ImageCollection;
};

export const TubeObjectComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsInput
                    title={_("Compact Distance")}
                    value={String(tube.config.compactDistance)}
                    type="number"
                    onChange={(v) =>
                        tube.setConfig({ compactDistance: Number(v) })
                    }
                />
                <RsInput
                    title={_("Minimal pixel count")}
                    value={String(tube.config.minimalPixelCount)}
                    type="number"
                    onChange={(v) =>
                        tube.setConfig({ minimalPixelCount: Number(v) })
                    }
                />
                <RsInput
                    title={_("Minimal width")}
                    value={String(tube.config.minimalWidth)}
                    type="number"
                    onChange={(v) =>
                        tube.setConfig({ minimalWidth: Number(v) })
                    }
                />
                <RsInput
                    title={_("Minimal height")}
                    value={String(tube.config.minimalHeight)}
                    type="number"
                    onChange={(v) =>
                        tube.setConfig({ minimalHeight: Number(v) })
                    }
                />
                <BbConfig
                    bbConfig={tube.config.bbConfig}
                    onChange={(bbConfig) => tube.setConfig({ bbConfig })}
                />
            </StyledConfig>

            <TubeCompCollection collection={collection} show="objects" />

            {"Found " +
                collection.stack.map((item) => item.objects.length).join(", ")}
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    padding-top: ${spacingCss(1)};
`;

const StyledConfig = styled(Column)`
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    width: 400px;
`;
