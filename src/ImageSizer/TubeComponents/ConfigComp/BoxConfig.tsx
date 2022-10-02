import { Column, Row } from "../../../react-utils/Components/StyledComponents";
import ToolbarProperty from "ImageSizer/Components/ToolbarProperty";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    type?: string;
    box: TRect;
    onChange: (b: Partial<TRect>) => void;
};

export const BoxConfig = observer(({ type, box, onChange }: Props) => {
    if (type !== undefined && type !== "box") return null;

    return (
        <Column>
            <StyledRow>
                <ToolbarProperty
                    title="X"
                    tooltip="X"
                    type="number"
                    value={String(box.x)}
                    onChange={(v) =>
                        onChange({
                            x: Number(v),
                        })
                    }
                />
                <ToolbarProperty
                    title="Y"
                    tooltip="Y"
                    type="number"
                    value={String(box.y)}
                    onChange={(v) =>
                        onChange({
                            y: Number(v),
                        })
                    }
                />
            </StyledRow>
            <StyledRow>
                <ToolbarProperty
                    title="Width"
                    tooltip="Width"
                    type="number"
                    value={String(box.width)}
                    onChange={(v) =>
                        onChange({
                            width: Number(v),
                        })
                    }
                />
                <ToolbarProperty
                    title="Height"
                    tooltip="Height"
                    type="number"
                    value={String(box.height)}
                    onChange={(v) =>
                        onChange({
                            height: Number(v),
                        })
                    }
                />
            </StyledRow>
        </Column>
    );
});

const StyledRow = styled(Row)`
    column-gap: ${spacingCss(2)};
`;
