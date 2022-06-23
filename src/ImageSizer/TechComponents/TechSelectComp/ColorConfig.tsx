import { Row } from "react-utils/Components/StyledComponents";
import { TechSelect } from "ImageSizer/Tech/TechSelect";
import ToolbarColor from "ImageSizer/Components/ToolbarColor";
import ToolbarProperty from "ImageSizer/Components/ToolbarProperty";
import ToolbarSelect from "ImageSizer/Components/ToolbarSelect";
import ToolbarSlider from "ImageSizer/Components/ToolbarSlider";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    tech: TechSelect;
};

export const ColorConfig = observer(({ tech }: Props) => {
    const [color, setColor] = useState(tech.config.color.pivot);
    const [threshold, setThreshold] = useState(tech.config.color.threshold);

    if (tech.config.type !== "color") return null;

    return (
        <>
            <ToolbarSelect
                value={tech.config.color.type}
                onChange={(v) => tech.setConfigColor({ type: v as any })}
                options={typeOptions}
            />
            {tech.config.color.type === "color" ? (
                <ToolbarColor
                    label="Color"
                    value={color}
                    onChange={(v) => {
                        setColor(v);
                        tech.setConfigColor({
                            pivot: v,
                        });
                    }}
                />
            ) : (
                <ToolbarProperty
                    title="Alpha"
                    tooltip="Alpha"
                    value={String(tech.config.color.alpha)}
                    onChange={(v) =>
                        tech.setConfigColor({
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
                        tech.setConfigColor({
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
