import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TechCompCollection } from "./TechCompCollection";
import { TechMirror } from "../Tech/TechMirror";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechMirror;
    collection: ImageCollection;
};

export const TechMirrorComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Vertical")}
                    value={tech.config.vertical}
                    setValue={(vertical) => tech.setConfig({ vertical })}
                    list={techList}
                />
                <RsSelect
                    title={_("Horizontal")}
                    value={tech.config.horizontal}
                    setValue={(horizontal) => tech.setConfig({ horizontal })}
                    list={techList}
                />
            </StyledConfig>

            <TechCompCollection collection={collection} show="selection" />
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

const techList: { title: string; value: boolean }[] = [
    {
        title: _("Yes"),
        value: true,
    },
    {
        title: _("No"),
        value: false,
    },
];
