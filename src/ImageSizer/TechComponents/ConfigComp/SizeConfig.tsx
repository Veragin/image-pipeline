import { Row } from "../../../react-utils/Components/StyledComponents";
import ToolbarProperty from "ImageSizer/Components/ToolbarProperty";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    show?: boolean;
    size: TSize;
    onChange: (b: Partial<TSize>) => void;
};

export const SizeConfig = observer(({ show = true, size, onChange }: Props) => {
    if (!show) return null;

    return (
        <StyledRow>
            <ToolbarProperty
                title="Width"
                tooltip="Width"
                type="number"
                value={String(size.width)}
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
                value={String(size.height)}
                onChange={(v) =>
                    onChange({
                        height: Number(v),
                    })
                }
            />
        </StyledRow>
    );
});

const StyledRow = styled(Row)`
    column-gap: ${spacingCss(2)};
`;
