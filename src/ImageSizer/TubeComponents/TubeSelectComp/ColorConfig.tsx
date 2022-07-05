import { Row } from "react-utils/Components/StyledComponents";
import { TubeSelect } from "ImageSizer/Tube/TubeSelect";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import ToolbarProperty from "ImageSizer/Components/ToolbarProperty";
import ToolbarSelect from "ImageSizer/Components/ToolbarSelect";
import ToolbarSlider from "ImageSizer/Components/ToolbarSlider";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    tube: TubeSelect;
};

export const ColorConfig = observer(({ tube }: Props) => {
    const [color, setColor] = useState(tube.config.color.pivot);
    const [threshold, setThreshold] = useState(tube.config.color.threshold);

    if (tube.config.type !== "color") return null;

    return (
        <>
            <ToolbarSelect
                value={tube.config.color.type}
                onChange={(v) => tube.setConfigColor({ type: v as any })}
                options={typeOptions}
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
        name: _("Color"),
        value: "color",
    },
    {
        name: _("Alpha"),
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
    color: ${({ theme }) => theme.palette.grey[500]};
    padding-right: ${({ theme }) => theme.spacing(0.5)};
`;
