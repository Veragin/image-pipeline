import { Row } from "react-utils/Components/StyledComponents";
import { TechSelect } from "ImageSIzer/Tech/TechSelect";
import ToolbarColor from "Service/tsx/Toolbar/ToolbarComponents/ToolbarColor";
import ToolbarProperty from "Service/tsx/Toolbar/ToolbarComponents/ToolbarProperty";
import ToolbarSelect from "Service/tsx/Toolbar/ToolbarComponents/ToolbarSelect";
import ToolbarSlider from "Service/tsx/Toolbar/ToolbarComponents/ToolbarSlider";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    tech: TechSelect;
};

export const NeighborConfig = observer(({ tech }: Props) => {
    const [color, setColor] = useState(tech.config.neighbor.color);
    const [threshold, setThreshold] = useState(tech.config.neighbor.threshold);

    if (tech.config.type !== "neighbor") return null;

    return (
        <>
            <ToolbarSelect
                value={tech.config.neighbor.type}
                onChange={(v) => tech.setConfigNeighbor({ type: v as any })}
                options={typeOptions}
            />

            {tech.config.neighbor.type === "pixel" && (
                <StyledRow>
                    <ToolbarProperty
                        title="X"
                        tooltip="X"
                        type="number"
                        value={String(tech.config.neighbor.x)}
                        onChange={(v) =>
                            tech.setConfigNeighbor({
                                x: Number(v),
                            })
                        }
                    />
                    <ToolbarProperty
                        title="Y"
                        tooltip="Y"
                        type="number"
                        value={String(tech.config.neighbor.y)}
                        onChange={(v) =>
                            tech.setConfigNeighbor({
                                y: Number(v),
                            })
                        }
                    />
                </StyledRow>
            )}

            {tech.config.neighbor.type === "color" && (
                <ToolbarColor
                    label="Color"
                    value={color}
                    onChange={(v) => {
                        setColor(v);
                        tech.setConfigNeighbor({
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
                        tech.setConfigNeighbor({
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
