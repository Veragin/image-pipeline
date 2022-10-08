import { Row } from "react-utils/Components/StyledComponents";
import { TubeSelect } from "ImageSizer/Tube/TubeSelect";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import ToolbarProperty from "ImageSizer/Components/ToolbarProperty";
import ToolbarSlider from "ImageSizer/Components/ToolbarSlider";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";
import RsSelect from "react-utils/Components/RsInput/RsSelect";

type Props = {
    tube: TubeSelect;
};

export const ColorConfig = observer(({ tube }: Props) => {
    const [color, setColor] = useState(tube.config.color.pivot);
    const [threshold, setThreshold] = useState(tube.config.color.threshold);

    if (tube.config.method !== "color") return null;

    return (
        <>
            <RsSelect
                title={_("Color config")}
                value={tube.config.color.type}
                setValue={(v) => tube.setConfigColor({ type: v as any })}
                list={typeOptions}
            />
            {tube.config.color.type === "color" ? (
                <ToolbarColor
                    label="Color"
                    value={color}
                    onChange={(v) => {
                        setColor(v);
                        tube.setConfigColor({
                            pivot: v,
                        });
                    }}
                />
            ) : (
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
                />
            )}
            <StyledRow>
                <StyledTitle>{_("Threshold")}</StyledTitle>
                <ToolbarSlider
                    value={threshold}
                    onChange={(v) => {
                        setThreshold(v);
                        tube.setConfigColor({
                            threshold: v,
                        });
                    }}
                    step={0.001}
                />
            </StyledRow>
        </>
    );
});

const typeOptions = [
    {
        title: _("Color"),
        value: "color",
    },
    {
        title: _("Alpha"),
        value: "alpha",
    },
];

const StyledRow = styled(Row)`
    width: 100%;
    overflow: hidden;
    column-gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
`;

const StyledTitle = styled.div`
    color: black;
    font-size: 14px;
    padding-right: ${({ theme }) => theme.spacing(0.5)};
`;
