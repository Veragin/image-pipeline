import { Download, PlayArrow } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { spacingCss } from "react-utils/Components/globalCss";
import { Row } from "react-utils/Components/StyledComponents";
import styled from "styled-components";
import { TechTree } from "./TechTree";

type Props = {
    techTree: TechTree;
};

export const TopControl = ({ techTree }: Props) => {
    const downloadRecept = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(techTree.exportRecept()));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "recept.json");
        downloadAnchorNode.click();
    };

    return (
        <StyledRow>
            <Tooltip title={_("Start process")}>
                <Fab
                    color="primary"
                    size="small"
                    onClick={() => techTree.run()}
                >
                    <PlayArrow />
                </Fab>
            </Tooltip>
            <Tooltip title={_("Export recept")}>
                <Fab color="primary" size="small" onClick={downloadRecept}>
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
