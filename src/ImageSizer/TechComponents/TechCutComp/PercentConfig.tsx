import { Row } from "../../../react-utils/Components/StyledComponents";
import RsInput from "react-utils/Components/RsInput/RsInput";
import { TechCut } from "../../Tech/TechCut";
import { observer } from "mobx-react";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    tech: TechCut;
};

export const PercentConfig = observer(({ tech }: Props) => {
    const [columnsInput, setColumnsInput] = useState(tech.config.percent.columns.join(", "));
    const [rowsInput, setRowsInput] = useState(tech.config.percent.rows.join(", "));

    if (tech.config.type !== "percent") return null;

    const changeColumns = (v: string) => {
        setColumnsInput(v);

        const data = v
            .split(", ")
            .map((v) => parseFloat(v))
            .filter((n) => !Number.isNaN(n));

        if (
            data.length !== tech.config.percent.columns.length ||
            tech.config.percent.columns.some((value, index) => value !== data[index])
        ) {
            // there is some change
            tech.setConfig({
                percent: {
                    columns: data,
                },
            });
        }
    };

    const changeRows = (v: string) => {
        setRowsInput(v);

        const data = v
            .split(", ")
            .map((v) => parseFloat(v))
            .filter((n) => !Number.isNaN(n));

        if (
            data.length !== tech.config.percent.rows.length ||
            tech.config.percent.rows.some((value, index) => value !== data[index])
        ) {
            // there is some change
            tech.setConfig({
                percent: {
                    rows: data,
                },
            });
        }
    };

    return (
        <>
            <StyledRow>
                <RsInput title={_("Columns")} type="text" value={columnsInput} onChange={changeColumns} />
                <RsInput title={_("Rows")} type="text" value={rowsInput} onChange={changeRows} />
            </StyledRow>
        </>
    );
});

const StyledRow = styled(Row)`
    column-gap: ${spacingCss(2)};
`;
