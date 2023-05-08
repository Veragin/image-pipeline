import { observer } from "mobx-react";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import ToolbarProperty from "ImageSizer/Components/ToolbarProperty";
import { TubeSelect } from "ImageSizer/Tube/TubeSelect";
import { useState } from "react";
import { ToolbarHue } from "ImageSizer/Components/ToolbarHue";

type Props = {
    tube: TubeSelect;
};

export const ColorConfigContent = observer(({ tube }: Props) => {
    const [color, setColor] = useState(tube.config.color.pivot);

    switch (tube.config.color.type) {
        case "color":
            return (
                <ToolbarColor
                    label={_("Color")}
                    value={color}
                    onChange={(v) => {
                        setColor(v);
                        tube.setConfigColor({
                            pivot: v,
                        });
                    }}
                />
            );
        case "hue":
            return (
                <ToolbarHue
                    value={String(tube.config.color.hue)}
                    onChange={(v) =>
                        tube.setConfigColor({
                            hue: Number(v),
                        })
                    }
                />
            );
        case "alpha":
            return (
                <ToolbarProperty
                    title="Alpha"
                    tooltip="Alpha"
                    value={String(tube.config.color.alpha)}
                    onChange={(v) =>
                        tube.setConfigColor({
                            alpha: Number(v),
                        })
                    }
                    type={"number"}
                    min={0}
                    max={1}
                    step={0.05}
                />
            );
    }

    throw new Error(`${tube.config.color.type} not implemented`);
});
