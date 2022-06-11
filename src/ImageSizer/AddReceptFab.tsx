import { Button, Fab, Tooltip } from "@mui/material";
import { useRef, useState } from "react";

import { Column } from "react-utils/Components/StyledComponents";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { RECEPT_LIST } from "./recepies/receptList";
import { RsModal } from "react-utils/Components/RsModal";
import { TRecept } from "./Const";
import { TechTree } from "./TechTree";
import { ThePrimaryButton } from "../react-utils/Components/TheButton";
import { loadReceptToTechTree } from "./recepies/receptLoader";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    techTree: TechTree;
};

export const AddReceptFab = ({ techTree }: Props) => {
    const [open, setOpen] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const readReceptFile = (fileList: FileList | null) => {
        if (fileList === null) return;

        const file = fileList.item(0);
        if (file === null) return;

        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (evt) => {
            try {
                if (typeof evt.target?.result !== "string") throw new Error("result of FIleReader is not a string");

                const recept = JSON.parse(evt.target.result);
                loadRecept(recept);
            } catch (e) {
                console.error(e);
            }
        };
        reader.onerror = (evt) => {
            console.error("error reading file with FileReader", evt);
        };
    };

    const loadRecept = (recept: TRecept) => {
        loadReceptToTechTree(techTree, recept);
        setOpen(false);
    };

    return (
        <>
            <Tooltip title={_("Add Recept")}>
                <Fab color="primary" aria-label="fabRecept" onClick={() => setOpen(true)}>
                    <FormatListBulletedRoundedIcon />
                </Fab>
            </Tooltip>
            <RsModal open={open} onClose={() => setOpen(false)} title={_("Add recept")}>
                <StyledCont>
                    {RECEPT_LIST.map((recept) => (
                        <Button key={recept.id} color="primary" variant="contained" onClick={() => loadRecept(recept)}>
                            {recept.name}
                        </Button>
                    ))}
                    <StyledFile
                        type="file"
                        ref={fileRef}
                        accept="application/JSON"
                        onChange={(ev) => readReceptFile(ev.target.files)}
                    />
                    <ThePrimaryButton color="primary" onClick={() => fileRef.current?.click()}>
                        {_("Load recept from file")}
                    </ThePrimaryButton>
                </StyledCont>
            </RsModal>
        </>
    );
};

const StyledFile = styled.input`
    visibility: hidden;
    width: 0;
    height: 0;
`;

const StyledCont = styled(Column)`
    align-items: center;
    row-gap: ${spacingCss(1)};
`;
