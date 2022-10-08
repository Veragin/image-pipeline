import { Column, Row } from "../../react-utils/Components/StyledComponents";
import { ImageCollection } from "../ImageColection";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TubeRename } from "../Tube/TubeRename";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { TubeCompCont, ConfigComp } from "./ConfigComp/ConfigUtils";
import { RegExpCheetSheet } from "./RegExpCheetSheet";

type Props = {
    tube: TubeRename;
    collection: ImageCollection;
};

export const TubeRenameComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <StyledRow>
                <StyledColumn>
                    <ConfigComp>
                        <RsInput
                            title={_("Name RegExp")}
                            value={tube.config.regExp}
                            onChange={(regExp) => tube.setConfig({ regExp })}
                            helpTooltip={_(
                                "Use regexp to modify name of the file. This name is inserted in NAME PATTERN via {name}"
                            )}
                        />
                        <RsInput
                            title={_("Name Pattern")}
                            value={tube.config.namePattern}
                            onChange={(namePattern) => tube.setConfig({ namePattern })}
                            helpTooltip={_(
                                "Define how the image should be named while is downloaded"
                            )}
                        />
                    </ConfigComp>
                    <StyledOutput>
                        <InputTitle>{_("Output")}</InputTitle>
                        {collection.stack.map((item, i) => (
                            <Typography key={i}>{item.name}</Typography>
                        ))}
                    </StyledOutput>
                </StyledColumn>
                <RegExpCheetSheet />
            </StyledRow>
        </TubeCompCont>
    );
});

const StyledColumn = styled(Column)`
    row-gap: ${spacingCss(6)};
`;

const StyledOutput = styled(Column)`
    row-gap: ${spacingCss(1)};
    flex: 1;
    overflow: auto;
`;

export const StyledRow = styled(Row)`
    justify-content: space-between;
`;
