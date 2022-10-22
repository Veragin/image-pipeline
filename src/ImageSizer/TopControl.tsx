import { Download, PlayArrow } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useState } from "react";
import { spacingCss } from "react-utils/Components/globalCss";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { RsSwitch } from "react-utils/Components/RsInput/RsSwitch";
import { RsModal } from "react-utils/Components/RsModal";
import { Column, Row } from "react-utils/Components/StyledComponents";
import { ThePrimaryButton } from "react-utils/Components/TheButton";
import styled from "styled-components";
import { Pipeline } from "./Pipeline";

type Props = {
    pipeline: Pipeline;
};

export const TopControl = ({ pipeline }: Props) => {
    const [openStartModal, setOpenStartModal] = useState(false);
    const [useZip, setUseZip] = useState(false);
    const [zipName, setZipName] = useState("pipeline");

    const start = () => {
        pipeline.run(useZip ? zipName : null);
        setOpenStartModal(false);
    };

    return (
        <StyledRow>
            <Tooltip title={_("Start process")}>
                <Fab color="primary" size="small" onClick={() => setOpenStartModal(true)}>
                    <PlayArrow />
                </Fab>
            </Tooltip>
            <RsModal
                open={openStartModal}
                onClose={() => setOpenStartModal(false)}
                title={_("Start Pipeline")}
            >
                <StyledCont>
                    <RsSwitch
                        title={_("Zip")}
                        value={useZip}
                        onChange={setUseZip}
                        helpTooltip={_("All images will be wrapped into one zip file.")}
                    />
                    {useZip && (
                        <RsInput title={_("Zip name")} value={zipName} onChange={setZipName} />
                    )}
                    <ThePrimaryButton color="primary" onClick={() => start()}>
                        {_("Start")}
                    </ThePrimaryButton>
                </StyledCont>
            </RsModal>
            <Tooltip title={_("Export recept")}>
                <Fab color="primary" size="small" onClick={pipeline.exportRecept}>
                    <Download />
                </Fab>
            </Tooltip>
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
    gap: ${spacingCss(1)};
    padding: 0 ${spacingCss(1)};
`;

const StyledCont = styled(Column)`
    align-items: center;
    row-gap: ${spacingCss(1)};
`;
