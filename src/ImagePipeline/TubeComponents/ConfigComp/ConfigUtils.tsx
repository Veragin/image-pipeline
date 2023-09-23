import { spacingCss } from 'react-utils/Components/globalCss';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import styled from 'styled-components';

export const ConfigRow = styled(Row)`
    gap: ${spacingCss(4)};
`;

export const ConfigComp = styled(Column)`
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    width: 260px;
`;

export const TubeCompCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(2)};
    padding-top: ${spacingCss(1)};
`;
