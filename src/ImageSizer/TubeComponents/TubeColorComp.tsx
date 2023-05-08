import { ImageCollection } from "../ImageColection";
import { TTubeColorArea, TTubeColorColorType, TTubeColorMode, TubeColor } from "../Tube/TubeColor";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import { observer } from "mobx-react";
import { TubeCompCont, ConfigComp, ConfigRow } from "./ConfigComp/ConfigUtils";
import RsSelect from "react-utils/Components/RsInput/RsSelect";
import { colorToHsv, hsvToRgb } from "react-utils/color";
import RsInput from "react-utils/Components/RsInput/RsInput";

type Props = {
    tube: TubeColor;
    collection: ImageCollection;
};

export const TubeColorComp = observer(({ tube, collection }: Props) => {
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
                        {tube.config.mode === "fixed" &&
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
                                <RsInput
                                    title={_("Red")}
                                    value={String(tube.config.rgba.r)}
                                    type="number"
                                    onChange={(r) => tube.setRgba({ r: Number(r) })}
                                    min={-255}
                                    max={255}
                                    step={1}
                                />
                                <RsInput
                                    title={_("Green")}
                                    value={String(tube.config.rgba.g)}
                                    type="number"
                                    onChange={(g) => tube.setRgba({ g: Number(g) })}
                                    min={-255}
                                    max={255}
                                    step={1}
                                />
                                <RsInput
                                    title={_("Blue")}
                                    value={String(tube.config.rgba.b)}
                                    type="number"
                                    onChange={(b) => tube.setRgba({ b: Number(b) })}
                                    min={-255}
                                    max={255}
                                    step={1}
                                />
                                <RsInput
                                    title={_("Alpha")}
                                    value={String(tube.config.rgba.a)}
                                    type="number"
                                    onChange={(a) => tube.setRgba({ a: Number(a) })}
                                    min={-1}
                                    max={1}
                                    step={0.05}
                                />
                            </>
                        )}
                        {tube.config.type === "hsva" && (
                            <>
                                <RsInput
                                    title={_("Hue")}
                                    value={String(tube.config.hsva.h)}
                                    type="number"
                                    onChange={(h) => tube.setHvsa({ h: Number(h) })}
                                    min={-359}
                                    max={359}
                                    step={1}
                                />
                                <RsInput
                                    title={_("Saturation")}
                                    value={String(tube.config.hsva.s)}
                                    type="number"
                                    onChange={(s) => tube.setHvsa({ s: Number(s) })}
                                    min={-1}
                                    max={1}
                                    step={0.05}
                                />
                                <RsInput
                                    title={_("Value")}
                                    value={String(tube.config.hsva.v)}
                                    type="number"
                                    onChange={(v) => tube.setHvsa({ v: Number(v) })}
                                    min={-1}
                                    max={1}
                                    step={0.05}
                                />
                                <RsInput
                                    title={_("Alpha")}
                                    value={String(tube.config.hsva.a)}
                                    type="number"
                                    onChange={(a) => tube.setHvsa({ a: Number(a) })}
                                    min={-1}
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
