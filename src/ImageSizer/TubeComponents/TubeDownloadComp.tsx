import { TTubeDownloadType, TubeDownload } from "../Tube/TubeDownload";

import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { TubeCompCollection } from "./TubeCompCollection";
import { ThePrimaryButton } from "../../react-utils/Components/TheButton";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeDownload;
    collection: ImageCollection;
};

export const TubeDownloadComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
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
            </ConfigComp>

            <TubeCompCollection collection={collection} show="objects" />
        </TubeCompCont>
    );
});

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
