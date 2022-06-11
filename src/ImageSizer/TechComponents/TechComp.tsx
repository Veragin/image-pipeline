import { Column, Row } from "../../react-utils/Components/StyledComponents";

import { ImageCollection } from "../ImageColection";
import { Tech } from "ImageSIzer/Tech/Tech";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props<T extends Object> = {
    tech: Tech<T> | null;
    collection: ImageCollection;
};

export const TechComp = observer(({ tech, collection }: Props<any>) => {
    const Icon = tech?.icon ?? (() => null);
    const Comp = tech?.comp ?? (() => null);

    return (
        <StyledCont>
            <StyledRow>
                <Icon />
                {tech?.name ?? ""}
            </StyledRow>
            <StyledDescription>{tech?.description ?? ""}</StyledDescription>
            <Comp tech={tech} collection={collection} />
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
