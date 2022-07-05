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

export const NeighborConfig = observer(({ tube }: Props) => {
    const [color, setColor] = useState(tube.config.neighbor.color);
    const [threshold, setThreshold] = useState(tube.config.neighbor.threshold);

    if (tube.config.type !== "neighbor") return null;

    return (
        <>
            <ToolbarSelect
                value={tube.config.neighbor.type}
                onChange={(v) => tube.setConfigNeighbor({ type: v as any })}
                options={typeOptions}
            />

            {tube.config.neighbor.type === "pixel" && (
                <StyledRow>
                    <ToolbarProperty
                        title="X"
                        tooltip="X"
                        type="number"
                        value={String(tube.config.neighbor.x)}
                        onChange={(v) =>
                            tube.setConfigNeighbor({
                                x: Number(v),
                            })
                        }
                    />
                    <ToolbarProperty
                        title="Y"
                        tooltip="Y"
                        type="number"
                        value={String(tube.config.neighbor.y)}
                        onChange={(v) =>
                            tube.setConfigNeighbor({
                                y: Number(v),
                            })
                        }
                    />
                </StyledRow>
            )}

            {tube.config.neighbor.type === "color" && (
                <ToolbarColor
                    label="Color"
                    value={color}
                    onChange={(v) => {
                        setColor(v);
                        tube.setConfigNeighbor({
                            color: v,
                        });
                    }}
                />
            )}

            <StyledRow>
                <StyledTitle>{_("Threshold")}</StyledTitle>
                <ToolbarSlider
                    value={threshold}
                    onChange={(v) => {
                        setThreshold(v);
                        tube.setConfigNeighbor({
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
        name: _("Pixel"),
        value: "pixel",
    },
    {
        name: _("Color"),
        value: "color",
    },
    {
        name: _("Base color"),
        value: "baseColor",
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
