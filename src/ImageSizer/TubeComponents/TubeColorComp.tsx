import { ImageCollection } from "../ImageColection";
import { TTubeColorArea, TTubeColorColorType, TTubeColorMode, TubeColor } from "../Tube/TubeColor";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp, ConfigRow } from "./ConfigComp/ConfigUtils";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { colorToHsv, hsvToRgb } from "react-utils/color";
import RsNumber from "react-utils/Components/RsInput/RsNumber";

type Props = {
    tube: TubeColor;
    collection: ImageCollection;
};

export const TubeColorComp = observer(({ tube, collection }: Props) => {
    const isFixed = tube.config.mode === "fixed";

    return (
        <TubeCompCont>
            <ConfigRow>
                <ConfigComp>
                    <RsSelect
                        title={_("Area")}
                        value={tube.config.area}
                        setValue={(area) => tube.setConfig({ area })}
                        list={tubeAreaList}
                        helpTooltip={_("Which pixels should be modified.")}
                    />
                    <RsSelect
                        title={_("Mode")}
                        value={tube.config.mode}
                        setValue={(mode) => tube.setConfig({ mode })}
                        list={tubeModeList}
                        helpTooltip={_(
                            "Choose how to modify pixels (set fixed value or shift the value by or invert color)"
                        )}
                    />
                    {tube.config.mode !== "invert" && (
                        <RsSelect
                            title={_("Color type")}
                            value={tube.config.type}
                            setValue={(type) => tube.setConfig({ type })}
                            list={tubeTypeList}
                            helpTooltip={_("Choose color format you want to change")}
                        />
                    )}
                </ConfigComp>
                {tube.config.mode !== "invert" && (
                    <ConfigComp>
                        {isFixed &&
                            (tube.config.type === "rgba" ? (
                                <ToolbarColor
                                    label={_("Color")}
                                    value={tube.config.rgba}
                                    onChange={(rgba) => tube.setConfig({ rgba })}
                                />
                            ) : (
                                <ToolbarColor
                                    label={_("Color")}
                                    value={hsvToRgb(tube.config.hsva)}
                                    onChange={(rgba) => tube.setConfig({ hsva: colorToHsv(rgba) })}
                                />
                            ))}
                        {tube.config.type === "rgba" && (
                            <>
                                <RsNumber
                                    title={_("Red")}
                                    value={tube.config.rgba.r}
                                    onChange={(r) => tube.setRgba({ r })}
                                    min={isFixed ? 0 : -255}
                                    max={255}
                                    step={1}
                                />
                                <RsNumber
                                    title={_("Green")}
                                    value={tube.config.rgba.g}
                                    onChange={(g) => tube.setRgba({ g })}
                                    min={isFixed ? 0 : -255}
                                    max={255}
                                    step={1}
                                />
                                <RsNumber
                                    title={_("Blue")}
                                    value={tube.config.rgba.b}
                                    onChange={(b) => tube.setRgba({ b })}
                                    min={isFixed ? 0 : -255}
                                    max={255}
                                    step={1}
                                />
                                <RsNumber
                                    title={_("Alpha")}
                                    value={tube.config.rgba.a}
                                    onChange={(a) => tube.setRgba({ a })}
                                    min={isFixed ? 0 : -1}
                                    max={1}
                                    step={0.05}
                                />
                            </>
                        )}
                        {tube.config.type === "hsva" && (
                            <>
                                <RsNumber
                                    title={_("Hue")}
                                    value={tube.config.hsva.h}
                                    onChange={(h) => tube.setHvsa({ h })}
                                    min={isFixed ? 0 : -359}
                                    max={359}
                                    step={1}
                                />
                                <RsNumber
                                    title={_("Saturation")}
                                    value={tube.config.hsva.s}
                                    onChange={(s) => tube.setHvsa({ s })}
                                    min={isFixed ? 0 : -1}
                                    max={1}
                                    step={0.05}
                                />
                                <RsNumber
                                    title={_("Value")}
                                    value={tube.config.hsva.v}
                                    onChange={(v) => tube.setHvsa({ v })}
                                    min={isFixed ? 0 : -1}
                                    max={1}
                                    step={0.05}
                                />
                                <RsNumber
                                    title={_("Alpha")}
                                    value={tube.config.hsva.a}
                                    onChange={(a) => tube.setHvsa({ a })}
                                    min={isFixed ? 0 : -1}
                                    max={1}
                                    step={0.05}
                                />
                            </>
                        )}
                    </ConfigComp>
                )}
            </ConfigRow>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
        </TubeCompCont>
    );
});

const tubeAreaList: { title: string; value: TTubeColorArea }[] = [
    {
        title: _("Image"),
        value: "image",
    },
    {
        title: _("Selection"),
        value: "selection",
    },
];

const tubeModeList: { title: string; value: TTubeColorMode }[] = [
    {
        title: _("Fixed"),
        value: "fixed",
    },
    {
        title: _("Shift"),
        value: "shift",
    },
    {
        title: _("Invert color"),
        value: "invert",
    },
];

const tubeTypeList: { title: string; value: TTubeColorColorType }[] = [
    {
        title: _("Rgba"),
        value: "rgba",
    },
    {
        title: _("Hsv"),
        value: "hsva",
    },
];
