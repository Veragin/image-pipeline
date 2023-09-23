import { FitToConfig } from "./FitToConfig";
import { PaddingConfig } from "./PaddingConfig";
import { TTubeBBConfig } from "../../functions/rectTricks";
import { observer } from "mobx-react";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";

type Props = {
    type?: string;
    bbConfig: TTubeBBConfig;
    onChange: (b: DeepPartial<TTubeBBConfig>) => void;
};

export const BbConfig = observer(({ type, bbConfig, onChange }: Props) => {
    if (type !== undefined && type !== "bbConfig") return null;

    return (
        <>
            <RsSwitch
                title={_("Fit to")}
                value={bbConfig.isFitActive}
                onChange={(isFitActive) => onChange({ isFitActive })}
                helpTooltip={_("Allows you to fit it into defined box.")}
            />

            <FitToConfig
                fitTo={bbConfig.fitTo}
                onChange={(fitTo) => onChange({ fitTo })}
                type={bbConfig.isFitActive ? "fitTo" : "null"}
            />
            <PaddingConfig
                padding={bbConfig.padding}
                onChange={(padding) => onChange({ padding })}
            />
        </>
    );
});
