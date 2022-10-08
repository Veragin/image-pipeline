import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TubeRename } from "../Tube/TubeRename";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";

type Props = {
    tube: TubeRename;
    collection: ImageCollection;
};

export const TubeRenameComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsInput
                    title={_("Name RegExp")}
                    value={tube.config.regExp}
                    onChange={(regExp) => tube.setConfig({ regExp })}
                />
                <RsInput
                    title={_("Name Pattern")}
                    value={tube.config.namePattern}
                    onChange={(namePattern) => tube.setConfig({ namePattern })}
                />
            </ConfigComp>

            <InputTitle>{_("Output")}</InputTitle>
            <StyledColumn>
                {collection.stack.map((item, i) => (
                    <Typography key={i}>{item.name}</Typography>
                ))}
            </StyledColumn>
        </TubeCompCont>
    );
});

const StyledColumn = styled(Column)`
    row-gap: ${spacingCss(1)};
    flex: 1;
    overflow: auto;
`;
