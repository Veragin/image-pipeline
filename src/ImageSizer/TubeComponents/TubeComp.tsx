import { Column, Row } from "../../react-utils/Components/StyledComponents";

import { ImageCollection } from "../ImageColection";
import { Tube } from "../Tube/Tube";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props<T extends Object> = {
    tube: Tube<T> | null;
    collection: ImageCollection;
};

export const TubeComp = observer(({ tube, collection }: Props<any>) => {
    const Icon = tube?.icon ?? (() => null);
    const Comp = tube?.comp ?? (() => null);

    return (
        <StyledCont>
            <StyledRow>
                <Icon />
                {tube?.name ?? ""}
            </StyledRow>
            <StyledDescription>{tube?.description ?? ""}</StyledDescription>
            <Comp tube={tube} collection={collection} />
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    overflow: auto;
    padding: ${spacingCss(1)};
    row-gap: ${spacingCss(1)};
`;

const StyledRow = styled(Row)`
    font-size: 32px;
    gap: ${spacingCss(1)};
    align-items: center;

    & .MuiSvgIcon-root {
        width: 32px;
        height: 32px;
    }
`;

const StyledDescription = styled(Typography)`
    font-size: 14px;
`;
