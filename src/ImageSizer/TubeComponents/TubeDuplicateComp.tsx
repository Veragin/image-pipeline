import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { TubeDuplicate } from "ImageSizer/Tube/TubeDuplicate";
import { booleanList } from "./ConfigComp/SelectLists";
import RsInput from "react-utils/Components/RsInput/RsInput";

type Props = {
    tube: TubeDuplicate;
    collection: ImageCollection;
};

export const TubeDuplicateComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
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
