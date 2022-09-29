import {
    TTubeSelectMode,
    TTubeSelectType,
    TubeSelect,
} from "ImageSizer/Tube/TubeSelect";

import { BoxConfig } from "../ConfigComp/BoxConfig";
import { ColorConfig } from "./ColorConfig";
import { Column } from "react-utils/Components/StyledComponents";
import { ImageCollection } from "../../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import { NeighborConfig } from "./NeighborConfig";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "../TubeCompCollection";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeSelect;
    collection: ImageCollection;
};

export const TubeSelectComp = observer(({ tube, collection }: Props) => {
    const isWithConfig = tube.config.type !== "old";

    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Mode")}
                    value={tube.config.mode}
                    setValue={(mode) => tube.setConfig({ mode })}
                    list={tubeModeList}
                />
                <RsSelect
                    title={_("Inverse")}
                    value={tube.config.inverse}
                    setValue={(inverse) => tube.setConfig({ inverse })}
                    list={tubeInverseList}
                />
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />

                {isWithConfig && <InputTitle>{_("Config")}</InputTitle>}
                <BoxConfig
                    type={tube.config.type}
                    box={tube.config.box}
                    onChange={(box) => tube.setConfig({ box })}
                />
                <ColorConfig tube={tube} />
                <NeighborConfig tube={tube} />
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

const tubeModeList: { title: string; value: TTubeSelectMode }[] = [
    {
        title: _("New Selection"),
        value: "newSelect",
    },
    {
        title: _("Modify Addition"),
        value: "modifyAdd",
    },
    {
        title: _("Modify Subtraction"),
        value: "modifySub",
    },
    {
        title: _("Modify Intersection"),
        value: "modifyInter",
    },
];

const tubeTypeList: { title: string; value: TTubeSelectType }[] = [
    {
        title: _("Selection by Box "),
        value: "box",
    },
    {
        title: _("Selection by Color"),
        value: "color",
    },
    {
        title: _("Selection by Naighbor"),
        value: "neighbor",
    },
    {
        title: _("Use already selected (old)"),
        value: "old",
    },
];

const tubeInverseList: { title: string; value: boolean }[] = [
    {
        title: _("Yes"),
        value: true,
    },
    {
        title: _("No"),
        value: false,
    },
];
