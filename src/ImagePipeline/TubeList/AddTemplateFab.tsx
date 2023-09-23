import { Button, Fab, Tooltip } from "@mui/material";
import { useRef, useState } from "react";

import { Column } from "react-utils/Components/StyledComponents";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { TEMPLATE_LIST } from "../templates/templateList";
import { RsModal } from "react-utils/Components/RsModal";
import { TTemplate } from "../Const";
import { TubeTree } from "../TubeTree";
import { ThePrimaryButton } from "react-utils/Components/TheButton";
import { loadTemplateToTubeTree } from "../templates/templateLoader";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tubeTree: TubeTree;
};

export const AddTemplateFab = ({ tubeTree }: Props) => {
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
                if (typeof evt.target?.result !== "string")
                    throw new Error("result of FIleReader is not a string");

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

    const loadRecept = (recept: TTemplate) => {
        loadTemplateToTubeTree(tubeTree, recept);
        setOpen(false);
    };

    return (
        <>
            <Tooltip title={_("Add Template")}>
                <Fab color="primary" aria-label="fabRecept" onClick={() => setOpen(true)}>
                    <FormatListBulletedRoundedIcon />
                </Fab>
            </Tooltip>
            <RsModal open={open} onClose={() => setOpen(false)} title={_("Add template")}>
                <StyledCont>
                    {TEMPLATE_LIST.map((recept) => (
                        <Button
                            key={recept.id}
                            color="primary"
                            variant="contained"
                            onClick={() => loadRecept(recept)}
                        >
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
                        {_("Load template from file")}
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
