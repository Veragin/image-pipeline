import { spacingCss } from "react-utils/Components/globalCss";

import { AddReceptFab } from "./AddReceptFab";
import { AddTubeFab } from "./AddTubeFab";
import { Column } from "../../react-utils/Components/StyledComponents";
import { DeleteIcon } from "../../react-utils/Components/Icons";
import { ReactSortable } from "react-sortablejs";
import { Row } from "react-utils/Components/StyledComponents";
import { RsIconButton } from "../../react-utils/Components/RsIconButton";
import { Tube } from "../Tube/Tube";
import { TubeTree } from "../TubeTree";
import { observer } from "mobx-react";
import styled, { css } from "styled-components";
import { COLOR_PIPE_DARK, COLOR_PRIMARY_MEDIUM } from "../Const";

type Props = {
    tubeTree: TubeTree;
};

export const TubeList = observer(({ tubeTree }: Props) => {
    return (
        <StyledCont>
            <StyledReactSortable
                list={tubeTree.stack}
                setList={tubeTree.setTubeStack}
                direction="vertical"
            >
                {tubeTree.stack.map((item) => (
                    <TubeItem
                        key={item.id}
                        tubeItem={item}
                        selected={item.id === tubeTree.activeId}
                        onSelect={() => tubeTree.setActiveId(item.id)}
                        onRemove={item.id !== 0 ? () => tubeTree.removeTube(item.id) : undefined}
                    />
                ))}
            </StyledReactSortable>
            <StyledRow>
                <AddTubeFab addTube={tubeTree.addTube} />
                <AddReceptFab tubeTree={tubeTree} />
            </StyledRow>
        </StyledCont>
    );
});

const StyledReactSortable = styled(ReactSortable)`
    display: flex;
    flex-direction: column;
`;

const StyledCont = styled(Column)`
    gap: ${spacingCss(2)};
    padding: ${spacingCss(1)} 0;
    align-items: center;
    background: linear-gradient(
        90deg,
        ${({ theme }) => theme.palette.backgr.dark} 25%,
        ${COLOR_PIPE_DARK} 100%
    );
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
    tubeItem: Tube<T>;
    selected: boolean;
    onSelect: () => void;
    onRemove?: () => void;
};

const TubeItem = <T extends Object>({ tubeItem, selected, onRemove, onSelect }: TItemProps<T>) => {
    return (
        <StyledItem $selected={selected} onClick={onSelect}>
            <StyledName>
                <tubeItem.icon />
                {tubeItem.name}
            </StyledName>
            {onRemove && (
                <RsIconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    tooltip={_("Delete")}
                >
                    <StyledDelete />
                </RsIconButton>
            )}
        </StyledItem>
    );
};

const StyledItem = styled(Row)<{ $selected: boolean }>`
    justify-content: space-between;
    width: 200px;
    height: 38px;
    cursor: pointer;
    border-bottom: 3px dashed;
    border-color: white;
    color: white;
    ${({ $selected, theme }) => css`
        background: ${$selected
            ? `linear-gradient(
                90deg,
                ${theme.palette.primary.main} 25%,
                ${COLOR_PRIMARY_MEDIUM} 100%
            )`
            : "transparent"};
    `}

    padding: ${spacingCss(1)};
    align-items: center;
`;

const StyledName = styled(Row)`
    gap: ${spacingCss(1)};
    align-items: center;
`;

const StyledDelete = styled(DeleteIcon)`
    &.MuiSvgIcon-root {
        fill: white;
    }
`;
