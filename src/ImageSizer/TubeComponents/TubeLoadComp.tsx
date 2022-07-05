import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeLoad } from "../Tube/TubeLoad";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeLoad;
    collection: ImageCollection;
};

export const TubeLoadComp = observer(({ tube, collection }: Props) => {
    const names = tube.getFileNames();

    return (
        <StyledCont>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => tube.load(e.target.files)}
            />
            <TubeCompCollection collection={collection} />
            {names.map((name, i) => (
                <StyledFileName key={i}>{name}</StyledFileName>
            ))}
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(1)};
    overflow: hidden;
`;

const StyledFileName = styled(Typography)`
    font-size: 12px;
`;
