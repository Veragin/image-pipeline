import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeJoin } from "../Tube/TubeJoin";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeJoin;
    collection: ImageCollection;
};

export const TubeJoinComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsInput
                    title={_("Group by")}
                    value={String(tube.config.groupBy)}
                    type="number"
                    onChange={(groupBy) =>
                        tube.setConfig({ groupBy: Number(groupBy) })
                    }
                />
                <RsInput
                    title={_("Image Number On Row")}
                    value={String(tube.config.imageNumberOnRow)}
                    type="number"
                    onChange={(imageNumberOnRow) =>
                        tube.setConfig({
                            imageNumberOnRow: Number(imageNumberOnRow),
                        })
                    }
                />
                <RsInput
                    title={_("Max Width")}
                    value={String(tube.config.maxWidth)}
                    type="number"
                    onChange={(maxWidth) =>
                        tube.setConfig({ maxWidth: Number(maxWidth) })
                    }
                />
            </StyledConfig>

            <TubeCompCollection collection={collection} show="selection" />
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
