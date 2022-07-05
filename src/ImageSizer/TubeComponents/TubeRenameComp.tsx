import { Column } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputCss";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TubeRename } from "../Tube/TubeRename";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

type Props = {
    tube: TubeRename;
    collection: ImageCollection;
};

export const TubeRenameComp = observer(({ tube, collection }: Props) => {
    return (
        <StyledCont>
            <StyledConfig>
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
            </StyledConfig>

            <InputTitle>{_("Output")}</InputTitle>
            <StyledColumn>
                {collection.stack.map((item) => (
                    <Typography>{item.name}</Typography>
                ))}
            </StyledColumn>
        </StyledCont>
    );
});

const StyledCont = styled(Column)`
    flex: 1;
    row-gap: ${spacingCss(1)};
    overflow: hidden;
    padding-top: ${spacingCss(1)};
`;

const StyledConfig = styled(Column)`
    row-gap: ${spacingCss(1)};
    width: 400px;
    padding-bottom: ${spacingCss(1)};
`;

const StyledColumn = styled(Column)`
    row-gap: ${spacingCss(1)};
    flex: 1;
    overflow: auto;
`;
