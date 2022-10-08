import { spacingCss } from "react-utils/Components/globalCss";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";

export const ConfigComp = styled(Column)`
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    width: 260px;
`;

export const TubeCompCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(2)};
    overflow: hidden;
    padding-top: ${spacingCss(1)};
`;

export const booleanList: { title: string; value: boolean }[] = [
    {
        title: _("Yes"),
        value: true,
    },
    {
        title: _("No"),
        value: false,
    },
];
