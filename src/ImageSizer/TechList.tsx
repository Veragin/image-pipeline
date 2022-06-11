import { borderRadiusCss, spacingCss } from 'react-utils/Components/globalCss';

import { AddReceptFab } from './AddReceptFab';
import { AddTechFab } from './AddTechFab';
import { Column } from '../react-utils/Components/StyledComponents';
import { DeleteIcon } from '../react-utils/Components/Icons';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Row } from 'react-utils/Components/StyledComponents';
import { RsIconButton } from '../react-utils/Components/RsIconButton';
import { Tech } from './Tech/Tech';
import { TechTree } from './TechTree';
import { ThePrimaryButton } from '../react-utils/Components/TheButton';
import { observer } from 'mobx-react';
import styled from 'styled-components';

type Props = {
    techTree: TechTree;
};

export const TechList = observer(({ techTree }: Props) => {
    const downloadRecept = () => {
        const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(techTree.exportRecept()));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'recept.json');
        downloadAnchorNode.click();
    };

    return (
        <StyledCont>
            <StyledReactSortable
                list={techTree.stack}
                setList={techTree.setTechStack}
                direction="vertical"
            >
                {techTree.stack.map((item) => (
                    <TechItem
                        key={item.id}
                        techItem={item}
                        selected={item.id === techTree.activeId}
                        onSelect={() => techTree.setActiveId(item.id)}
                        onRemove={
                            item.id !== 0
                                ? () => techTree.removeTech(item.id)
                                : undefined
                        }
                    />
                ))}
            </StyledReactSortable>
            <StyledRow>
                <AddReceptFab techTree={techTree} />
                <AddTechFab addTech={techTree.addTech} />
            </StyledRow>
            <ThePrimaryButton onClick={() => techTree.run()}>
                {_('Start process')}
            </ThePrimaryButton>
            <ThePrimaryButton onClick={downloadRecept}>
                {_('Export recept')}
            </ThePrimaryButton>
        </StyledCont>
    );
});

const StyledReactSortable = styled(ReactSortable)`
    row-gap: ${spacingCss(1)};
    display: flex;
    flex-direction: column;
`;

const StyledCont = styled(Column)`
    gap: ${spacingCss(2)};
    padding: ${spacingCss(1)};
    align-items: center;
`;

const StyledRow = styled(Row)`
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`;

/**************************
 ***** Item
 **************************/

type TItemProps<T extends Object> = {
    techItem: Tech<T>;
    selected: boolean;
    onSelect: () => void;
    onRemove?: () => void;
};

const TechItem = <T extends Object>({
    techItem,
    selected,
    onRemove,
    onSelect,
}: TItemProps<T>) => {
    return (
        <StyledItem $selected={selected} onClick={onSelect}>
            <StyledName>
                <techItem.icon />
                {techItem.name}
            </StyledName>
            {onRemove && (
                <RsIconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    tooltip={_('Delete')}
                >
                    <DeleteIcon />
                </RsIconButton>
            )}
        </StyledItem>
    );
};

const StyledItem = styled(Row)<{ $selected: boolean }>`
    border: 1px solid black;
    justify-content: space-between;
    width: 200px;
    border-radius: ${borderRadiusCss(1)};
    height: 38px;
    cursor: pointer;
    background-color: ${({ $selected }) => ($selected ? 'green' : 'white')};
    padding-left: ${spacingCss(1)};
    align-items: center;
`;

const StyledName = styled(Row)`
    gap: ${spacingCss(1)};
    align-items: center;
`;
