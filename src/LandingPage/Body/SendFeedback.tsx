import { Button } from "@mui/material";
import { useRef } from "react";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";

export const SendFeedback = () => {
    const ref = useRef(null);

    return (
        <Column>
            <StyledInput ref={ref}/>
            <Button variant="contained">{_('Send')}</Button>
        </Column>
    );
};

const StyledInput = styled.textarea`
    width: min(500px, 100%);
    border: 2px solid grey;

    &:focus {
        border: 2px solid black;
    }
`;
