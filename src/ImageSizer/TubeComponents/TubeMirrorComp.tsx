import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeMirror } from "../Tube/TubeMirror";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeMirror;
    collection: ImageCollection;
};

export const TubeMirrorComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Vertical")}
                    value={tube.config.vertical}
                    setValue={(vertical) => tube.setConfig({ vertical })}
                    list={tubeList}
                />
                <RsSelect
                    title={_("Horizontal")}
                    value={tube.config.horizontal}
                    setValue={(horizontal) => tube.setConfig({ horizontal })}
                    list={tubeList}
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

const tubeList: { title: string; value: boolean }[] = [
    {
        title: _("Yes"),
        value: true,
    },
    {
        title: _("No"),
        value: false,
    },
];
