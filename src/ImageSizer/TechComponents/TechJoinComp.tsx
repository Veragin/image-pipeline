import { Column } from '../../react-utils/Components/StyledComponents';
import { ImageCollection } from '../ImageColection';
import React from 'react';
import RsInput from 'react-utils/Components/RsInput/RsInput';
import { TechCompCollection } from './TechCompCollection';
import { TechJoin } from '../Tech/TechJoin';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    tech: TechJoin;
    collection: ImageCollection;
};

export const TechJoinComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsInput
                    title={_('Group by')}
                    value={String(tech.config.groupBy)}
                    type="number"
                    onChange={(groupBy) =>
                        tech.setConfig({ groupBy: Number(groupBy) })
                    }
                />
                <RsInput
                    title={_('Image Number On Row')}
                    value={String(tech.config.imageNumberOnRow)}
                    type="number"
                    onChange={(imageNumberOnRow) =>
                        tech.setConfig({
                            imageNumberOnRow: Number(imageNumberOnRow),
                        })
                    }
                />
                <RsInput
                    title={_('Max Width')}
                    value={String(tech.config.maxWidth)}
                    type="number"
                    onChange={(maxWidth) =>
                        tech.setConfig({ maxWidth: Number(maxWidth) })
                    }
                />
            </StyledConfig>

            <TechCompCollection collection={collection} show="selection" />
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    padding-top: ${spacingCss(1)};
`;

const StyledConfig = styled(Column)`
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    width: 400px;
`;
