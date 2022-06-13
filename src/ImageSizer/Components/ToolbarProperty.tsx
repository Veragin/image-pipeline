import ToolbarInput from './ToolbarInput';
import { Tooltip } from '@mui/material';
import { observer } from 'mobx-react';
import styled from 'styled-components';

type Props = {
    onChange: (v: string) => void;
    value: string;
    type: 'text' | 'number';
    tooltip: string;
    title: React.ReactNode;
    min?: number;
    max?: number;
};

const ToolbarProperty = ({ tooltip, title, ...props }: Props) => {
    return (
        <Tooltip title={tooltip} arrow>
            <StyledLabel>
                {title}
                <ToolbarInput {...props} size={6} />
            </StyledLabel>
        </Tooltip>
    );
};

const StyledLabel = styled.label`
    display: flex;
    flex-direction: row;
    max-width: 85px;
    align-items: center;
`;

export default observer(ToolbarProperty);
