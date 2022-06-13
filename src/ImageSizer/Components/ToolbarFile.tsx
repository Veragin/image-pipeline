import { Button, Tooltip } from '@mui/material';

import styled from 'styled-components';
import { useRef } from 'react';

type Props = {
    accept: string;
    title?: string;
    icon?: React.ReactNode;
    onFileChange: (files: FileList | null) => void;
    tooltip: string;
};

const ToolbarFile = ({ accept, title, icon, onFileChange, tooltip }: Props) => {
    const fileRef = useRef<HTMLInputElement>(null);

    return (
        <Tooltip title={tooltip} arrow>
            <div>
                <StyledFile
                    type="file"
                    ref={fileRef}
                    accept={accept}
                    onChange={(ev) => onFileChange(ev.target.files)}
                />
                <Button
                    startIcon={title ? icon : undefined}
                    variant="contained"
                    color="primary"
                    onClick={() => fileRef.current?.click()}
                >
                    {title ?? icon}
                </Button>
            </div>
        </Tooltip>
    );
};

const StyledFile = styled.input`
    visibility: hidden;
    width: 0;
    height: 0;
`;

export default ToolbarFile;
