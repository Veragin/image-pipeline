import { ImageCollection } from "../ImageColection";
import { DisplayPreviewCollection } from "./DisplayPreviewCollection";
import { TubeLoad } from "../Tube/TubeLoad";
import { Radio } from "@mui/material";
import { observer } from "mobx-react";
import styled from "styled-components";
import { TubeCompCont } from "./ConfigComp/ConfigUtils";
import { RsFile } from "react-utils/Components/RsInput/RsFile";
import { spacingCss } from "react-utils/Components/globalCss";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";
import { Row } from "react-utils/Components/StyledComponents";
import { WarningChip } from "./WarningChip";

const MAX_VISIBLE_FILES_COUNT = 50;

type Props = {
    tube: TubeLoad;
    collection: ImageCollection;
};

export const TubeLoadComp = observer(({ tube, collection }: Props) => {
    const names = tube.getFileNames();

    const visibleNames = names.filter((n, i) => i < MAX_VISIBLE_FILES_COUNT);

    const showWarning = names.length > MAX_VISIBLE_FILES_COUNT;

    return (
        <TubeCompCont>
            <RsFile
                title={_("Load images")}
                onChange={tube.load}
                accept="image/*"
                multiple
                selectedCount={names.length}
            />

            <div>
                <StyledRow>
                    <InputTitle>{_("Loaded files")}</InputTitle>
                    {showWarning && (
                        <WarningChip
                            title={_("Showing only first %d files", MAX_VISIBLE_FILES_COUNT)}
                        />
                    )}
                </StyledRow>
                <StyledCont>
                    {visibleNames.map((name, i) => (
                        <StyledFileName key={i}>
                            <StyledRadio
                                size="small"
                                checked={i === tube.selectedIndex}
                                onChange={() => tube.switchPreview(i)}
                            />
                            {name}
                        </StyledFileName>
                    ))}
                </StyledCont>
            </div>

            <DisplayPreviewCollection collection={collection} />
        </TubeCompCont>
    );
});

const StyledRow = styled(Row)`
    gap: ${spacingCss(1)};
    align-items: center;
`;

const StyledCont = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-height: 50vh;
`;

const StyledFileName = styled.label`
    display: flex;
    font-size: 14px;
    gap: ${spacingCss(1)};
    align-items: center;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const StyledRadio = styled(Radio)`
    &.MuiRadio-root {
        padding: ${spacingCss(0.5)};
    }
`;
