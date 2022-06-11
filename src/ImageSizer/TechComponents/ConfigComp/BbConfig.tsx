import { FitToConfig } from "./FitToConfig";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import { PaddingConfig } from "./PaddingConfig";
import { TTechBBConfig } from "../../functions/rectTricks";
import ToolbarSelect from "Service/tsx/Toolbar/ToolbarComponents/ToolbarSelect";
import { observer } from "mobx-react";

type Props = {
    type?: string;
    bbConfig: TTechBBConfig;
    onChange: (b: DeepPartial<TTechBBConfig>) => void;
};

export const BbConfig = observer(({ type, bbConfig, onChange }: Props) => {
    if (type !== undefined && type !== "bbConfig") return null;

    return (
        <>
            <InputTitle>{_("Fit to")}</InputTitle>
            <ToolbarSelect
                value={bbConfig.isFitActive ? "active" : "deactive"}
                onChange={(v) =>
                    onChange({
                        isFitActive: v === "active",
                    })
                }
                options={activeOption}
            />
            <FitToConfig
                fitTo={bbConfig.fitTo}
                onChange={(fitTo) => onChange({ fitTo })}
                type={bbConfig.isFitActive ? "fitTo" : "mull"}
            />
            <PaddingConfig padding={bbConfig.padding} onChange={(padding) => onChange({ padding })} />
        </>
    );
});

const activeOption = [
    {
        name: _("Active"),
        value: "active",
    },
    {
        name: _("Deactive"),
        value: "deactive",
    },
];
