import { TTechDownloadType, TechDownload } from "../Tech/TechDownload";

import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TechCompCollection } from "./TechCompCollection";
import { ThePrimaryButton } from "../../react-utils/Components/TheButton";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tech: TechDownload;
    collection: ImageCollection;
};

export const TechDownloadComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tech.config.type}
                    setValue={(type) => tech.setConfig({ type })}
                    list={techTypeList}
                />

                <RsInput
                    title={_("Quality")}
                    value={String(tech.config.quality)}
                    type="number"
                    onChange={(v) => tech.setConfig({ quality: Number(v) })}
                />

                <ThePrimaryButton onClick={() => tech.do(collection)}>
                    {_("Download")}
                </ThePrimaryButton>
            </StyledConfig>

            <TechCompCollection collection={collection} show="objects" />
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

const techTypeList: { title: string; value: TTechDownloadType }[] = [
    {
        title: _("Default"),
        value: "default",
    },
    {
        title: _("Png"),
        value: "png",
    },
    {
        title: _("Jpeg"),
        value: "jpeg",
    },
];
