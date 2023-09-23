import { IconButton, Tooltip } from '@mui/material';

import { observer } from 'mobx-react';
import styled from 'styled-components';

type TOption = {
    icon: React.ReactNode;
    value: string;
    name: string;
};

type Props = {
    onClick: (
        value: string,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    value: string;
    options: TOption[];
    color?: string;
};

const ToolbarButtonSwitcher = ({ onClick, value, options, color }: Props) => {
    const index = options.findIndex((o) => o.value === value) ?? 0;
    const next = index + 1 >= options.length ? 0 : index + 1;

    return (
        <Tooltip title={options[index].name}>
            <StyledIconButton
                size="small"
                onClick={(e) => onClick(options[next].value, e)}
                $color={color}
            >
                {options[index].icon}
            </StyledIconButton>
        </Tooltip>
    );
};

const StyledIconButton = styled(IconButton)<{ $color?: string }>`
    & .MuiSvgIcon-root {
        fill: ${({ $color }) => $color ?? 'black'};
    }
`;

export default observer(ToolbarButtonSwitcher);
