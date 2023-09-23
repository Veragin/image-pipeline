import { IconButton, Tooltip } from '@mui/material';

import { observer } from 'mobx-react';
import styled from 'styled-components';

type Props = {
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    tooltip: String;
    active: boolean;
};

const StyledIconButton = styled(IconButton)<{ $active: boolean }>`
    & .MuiSvgIcon-root {
        fill: ${({ $active, theme }) =>
            $active ? theme.palette.secondary.main : theme.palette.grey[500]};
    }
`;

const ToolbarIconButton = ({ icon, onClick, tooltip, active }: Props) => {
    return (
        <Tooltip title={tooltip} arrow>
            <StyledIconButton size="small" onClick={onClick} $active={active}>
                {icon}
            </StyledIconButton>
        </Tooltip>
    );
};

export default observer(ToolbarIconButton);
