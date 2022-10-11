import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";

export const Footer = () => {
    return <StyledCont>Copyright© 2022. Sizefire.com</StyledCont>;
};

const StyledCont = styled.div`
    width: calc(100% - ${spacingCss(4)});
    padding: ${spacingCss(2)};
    display: grid;
    justify-content: center;
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size: 18px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 80px 80px 0 0;
    margin-top: ${spacingCss(2)};
`;
