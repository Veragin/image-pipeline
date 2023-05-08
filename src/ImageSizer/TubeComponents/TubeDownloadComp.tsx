import { TTubeDownloadFormat, TubeDownload } from "../Tube/TubeDownload";

import { ImageCollection } from "../ImageColection";
import RsInput from "react-utils/Components/RsInput/RsInput";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { ThePrimaryButton } from "../../react-utils/Components/TheButton";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";
import RsNumber from "react-utils/Components/RsInput/RsNumber";

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

                <RsNumber
                    title={_("Quality")}
                    value={tube.config.quality}
                    onChange={(quality) => tube.setConfig({ quality })}
                    min={0}
                    max={1}
                    step={0.05}
                    helpTooltip={_(
                        "Number between 0 and 1. Value 1 means that the generated image will be without any compression"
                    )}
                />

                <RsSwitch
                    title={_("Wrap into zip/folder")}
                    value={tube.config.zip}
                    onChange={(zip) => tube.setConfig({ zip })}
                    helpTooltip={_(
                        "Wrap image pieces into zip file. If pipeline is run in zip mode folder will be use instead"
                    )}
                />

                <ThePrimaryButton onClick={() => tube.do(collection)}>
                    {_("Download preview")}
                </ThePrimaryButton>
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
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
