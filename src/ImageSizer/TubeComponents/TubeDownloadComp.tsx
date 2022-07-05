import { TTubeDownloadType, TubeDownload } from "../Tube/TubeDownload";

import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { ThePrimaryButton } from "../../react-utils/Components/TheButton";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeDownload;
    collection: ImageCollection;
};

export const TubeDownloadComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_("Type")}
                    value={tube.config.type}
                    setValue={(type) => tube.setConfig({ type })}
                    list={tubeTypeList}
                />

                <RsInput
                    title={_("Quality")}
                    value={String(tube.config.quality)}
                    type="number"
                    onChange={(v) => tube.setConfig({ quality: Number(v) })}
                />

                <ThePrimaryButton onClick={() => tube.do(collection)}>
                    {_("Download")}
                </ThePrimaryButton>
            </StyledConfig>

            <TubeCompCollection collection={collection} show="objects" />
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

const tubeTypeList: { title: string; value: TTubeDownloadType }[] = [
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
