import { Button, Tooltip } from "@mui/material";
import { Column, Row } from "react-utils/Components/StyledComponents";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { IMAGE_SIZER_TECH_CLASSES } from "./Const";
import { RsModal } from "react-utils/Components/RsModal";
import { Tech } from "./Tech/Tech";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    addTech: <T extends Object>(tech: Tech<T>) => void;
};
export const AddTechFab = ({ addTech }: Props) => {
    const [open, setOpen] = useState(false);

    const renderButton = <T extends Object>(tech: Tech<T>) => (
        <StyledButton
            key={tech.id}
            onClick={() => {
                addTech(tech);
                setOpen(false);
            }}
            startIcon={<tech.icon />}
            variant="contained"
        >
            {tech.name}
        </StyledButton>
    );

    const techs = IMAGE_SIZER_TECH_CLASSES.map((Item) => new Item());

    const basicTechs = techs.filter((tech) => tech.group === "basic");
    const objectTechs = techs.filter((tech) => tech.group === "object");
    const transformTechs = techs.filter((tech) => tech.group === "transform");

    return (
        <>
            <Tooltip title={_("Add Tech")}>
                <Fab color="primary" aria-label="addTech" onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <RsModal open={open} onClose={() => setOpen(false)} title={_("Add tech")}>
                <StyledRow>
                    <StyledCont>{basicTechs.map((tech) => renderButton(tech as any))}</StyledCont>
                    <StyledCont>{objectTechs.map((tech) => renderButton(tech as any))}</StyledCont>
                    <StyledCont>{transformTechs.map((tech) => renderButton(tech as any))}</StyledCont>
                </StyledRow>
            </RsModal>
        </>
    );
};

const StyledCont = styled(Column)`
    align-items: center;
    row-gap: ${spacingCss(1)};
`;

const StyledRow = styled(Row)`
    width: 100%;
    gap: ${spacingCss(4)};
`;

const StyledButton = styled(Button)`
    width: 100%;
`;
