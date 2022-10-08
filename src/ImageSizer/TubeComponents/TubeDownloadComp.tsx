import { TTubeDownloadFormat, TubeDownload } from "../Tube/TubeDownload";

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
                    title={_("Format")}
                    value={tube.config.format}
                    setValue={(format) => tube.setConfig({ format })}
                    list={tubeTypeList}
                />

                <RsInput
                    title={_("Quality")}
                    value={String(tube.config.quality)}
                    type="number"
                    onChange={(v) => tube.setConfig({ quality: Number(v) })}
                    helpTooltip={_(
                        "Number between 0 and 1. Value 1 means that the generated image will be without any compression"
                    )}
                />

                <ThePrimaryButton onClick={() => tube.do(collection)}>
                    {_("Download preview")}
                </ThePrimaryButton>
            </ConfigComp>

            <TubeCompCollection collection={collection} show="objects" />
        </TubeCompCont>
    );
});

const tubeTypeList: { title: string; value: TTubeDownloadFormat }[] = [
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
