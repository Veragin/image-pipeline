import { ImageCollection } from "../ImageColection";
import { TubeCompCollection } from "./TubeCompCollection";
import { TubeLoad } from "../Tube/TubeLoad";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import styled from "styled-components";
import { TubeCompCont } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeLoad;
    collection: ImageCollection;
};

export const TubeLoadComp = observer(({ tube, collection }: Props) => {
    const names = tube.getFileNames();

    return (
        <TubeCompCont>
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
        </TubeCompCont>
    );
});

const StyledFileName = styled(Typography)`
    font-size: 12px;
`;
