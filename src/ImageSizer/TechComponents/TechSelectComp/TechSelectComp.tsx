import {
    TTechSelectMode,
    TTechSelectType,
    TechSelect,
} from 'ImageSIzer/Tech/TechSelect';

import { BoxConfig } from '../ConfigComp/BoxConfig';
import { ColorConfig } from './ColorConfig';
import { Column } from '../../../react-utils/Components/StyledComponents';
import { ImageCollection } from '../../ImageColection';
import { InputTitle } from 'react-utils/Components/RsInput/InputCss';
import { NeighborConfig } from './NeighborConfig';
import React from 'react';
import RsSelect from 'react-utils/Components/RsInput/RsSelect';
import { TechCompCollection } from '../TechCompCollection';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    tech: TechSelect;
    collection: ImageCollection;
};

export const TechSelectComp = observer(({ tech, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
                <RsSelect
                    title={_('Mode')}
                    value={tech.config.mode}
                    setValue={(mode) => tech.setConfig({ mode })}
                    list={techModeList}
                />
                <RsSelect
                    title={_('Inverse')}
                    value={tech.config.inverse}
                    setValue={(inverse) => tech.setConfig({ inverse })}
                    list={techInverseList}
                />
                <RsSelect
                    title={_('Type')}
                    value={tech.config.type}
                    setValue={(type) => tech.setConfig({ type })}
                    list={techTypeList}
                />

                <InputTitle>{_('Config')}</InputTitle>
                <BoxConfig
                    type={tech.config.type}
                    box={tech.config.box}
                    onChange={(box) => tech.setConfig({ box })}
                />
                <ColorConfig tech={tech} />
                <NeighborConfig tech={tech} />
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

const techModeList: { title: string; value: TTechSelectMode }[] = [
    {
        title: _('New Selection'),
        value: 'newSelect',
    },
    {
        title: _('Modify Addition'),
        value: 'modifyAdd',
    },
    {
        title: _('Modify Subtraction'),
        value: 'modifySub',
    },
    {
        title: _('Modify Intersection'),
        value: 'modifyInter',
    },
];

const techTypeList: { title: string; value: TTechSelectType }[] = [
    {
        title: _('Selection by Box '),
        value: 'box',
    },
    {
        title: _('Selection by Color'),
        value: 'color',
    },
    {
        title: _('Selection by Naighbor'),
        value: 'neighbor',
    },
    {
        title: _('Use already selected (old)'),
        value: 'old',
    },
];

const techInverseList: { title: string; value: boolean }[] = [
    {
        title: _('Yes'),
        value: true,
    },
    {
        title: _('No'),
        value: false,
    },
];
