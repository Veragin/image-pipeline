import { Column } from '../../react-utils/Components/StyledComponents';
import { ImageCollection } from '../ImageColection';
import React from 'react';
import { TechCompCollection } from './TechCompCollection';
import { TechLoad } from '../Tech/TechLoad';
import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    tech: TechLoad;
    collection: ImageCollection;
};

export const TechLoadComp = observer(({ tech, collection }: Props) => {
    const names = tech.getFileNames();

    return (
        <StyledCont>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => tech.load(e.target.files)}
            />
            <TechCompCollection collection={collection} />
            {names.map((name, i) => (
                <StyledFileName key={i}>{name}</StyledFileName>
            ))}
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(1)};
    overflow: hidden;
`;

const StyledFileName = styled(Typography)`
    font-size: 12px;
`;
