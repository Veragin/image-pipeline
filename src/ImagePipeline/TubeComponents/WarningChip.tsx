import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

type Props = {
    title: string;
};

export const WarningChip = ({ title }: Props) => {
    return (
        <Tooltip title={title}>
            <StyledIcon />
        </Tooltip>
    );
};

const StyledIcon = styled(WarningRoundedIcon)`
    color: ${({ theme }) => theme.palette.warning.main};
    width: 1rem;
`;
