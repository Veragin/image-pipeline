import { Button, Tooltip } from "@mui/material";
import { Column, Row } from "react-utils/Components/StyledComponents";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { IMAGE_SIZER_TECH_CLASSES } from "./Const";
import { RsModal } from "react-utils/Components/RsModal";
import { Tube } from "./Tube/Tube";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    addTube: <T extends Object>(tube: Tube<T>) => void;
};
export const AddTubeFab = ({ addTube }: Props) => {
    const [open, setOpen] = useState(false);

    const renderButton = <T extends Object>(tube: Tube<T>) => (
        <StyledButton
            key={tube.id}
            onClick={() => {
                addTube(tube);
                setOpen(false);
            }}
            startIcon={<tube.icon />}
            variant="contained"
        >
            {tube.name}
        </StyledButton>
    );

    const tubes = IMAGE_SIZER_TECH_CLASSES.map((Item) => new Item());

    const basicTubes = tubes.filter((tube) => tube.group === "basic");
    const objectTubes = tubes.filter((tube) => tube.group === "object");
    const transformTubes = tubes.filter((tube) => tube.group === "transform");

    return (
        <>
            <Tooltip title={_("Add Tube")}>
                <Fab
                    color="primary"
                    aria-label="addTube"
                    onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <RsModal
                open={open}
                onClose={() => setOpen(false)}
                title={_("Add Tube")}
            >
                <StyledRow>
                    <StyledCont>
                        {basicTubes.map((tube) => renderButton(tube as any))}
                    </StyledCont>
                    <StyledCont>
                        {objectTubes.map((tube) => renderButton(tube as any))}
                    </StyledCont>
                    <StyledCont>
                        {transformTubes.map((tube) =>
                            renderButton(tube as any)
                        )}
                    </StyledCont>
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
