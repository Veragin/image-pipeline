import { borderRadiusCss, spacingCss } from "react-utils/Components/globalCss";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";
import { Column } from "react-utils/Components/StyledComponents";
import styled from "styled-components";

export const RegExpCheetSheet = () => {
    return (
        <StyledColumn>
            <StyledTitle>{_("RegExp cheet sheet")}</StyledTitle>
            <StyledSection>
                <InputTitle>{_("Character classes")}</InputTitle>
                <StyledList>
                    <span>.</span>
                    <span>{_("any character except newline")}</span>
                    <span>\w \d \s</span>
                    <span>{_("word, digit, whitespace")}</span>
                    <span>\W \D \S</span>
                    <span>{_("not word, digit, whitespace")}</span>
                    <span>[abc]</span>
                    <span>{_("any of a, b or c")}</span>
                    <span>[^abc]</span>
                    <span>{_("not a, b or c")}</span>
                    <span>[a-q]</span>
                    <span>{_("character between a and q")}</span>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <InputTitle>{_("Anchors")}</InputTitle>
                <StyledList>
                    <span>^abc$</span>
                    <span>{_("start / end of string")}</span>
                    <span>\b \B</span>
                    <span>{_("word, not-word boundary")}</span>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <InputTitle>{_("Escaped characters")}</InputTitle>
                <StyledList>
                    <span>\\. \* \\</span>
                    <span>{_("escaped special characters")}</span>
                    <span>\t \n \r</span>
                    <span>{_("tab, linefeed, carriage return")}</span>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <InputTitle>{_("Groups & Lookaround")}</InputTitle>
                <StyledList>
                    <span>(abc)</span>
                    <span>{_("capture group")}</span>
                    <span>\1</span>
                    <span>{_("backreference to group #1")}</span>
                    <span>(?:abc)</span>
                    <span>{_("non-capturing group")}</span>
                    <span>(?=abc)</span>
                    <span>{_("positive lookahead")}</span>
                    <span>(?!abc)</span>
                    <span>{_("negative lookahead")}</span>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <InputTitle>{_("Groups & Lookaround")}</InputTitle>
                <StyledList>
                    <span>a* a+ a?</span>
                    <span>{_("0 or more, 1 or more, 0 or 1")}</span>
                    <span>{"a{5} a{2,}"}</span>
                    <span>{_("exactly five, two or more")}</span>
                    <span>{"a{1,3}"}</span>
                    <span>{_("between one & three")}</span>
                    <span>{"a+? a{2,}?"}</span>
                    <span>{_("match as few as possible")}</span>
                    <span>ab|cd</span>
                    <span>{_("match ab or cd")}</span>
                </StyledList>
            </StyledSection>
        </StyledColumn>
    );
};

const StyledColumn = styled(Column)`
    row-gap: ${spacingCss(2)};
    padding: ${spacingCss(4)};
    background-color: rgb(250, 250, 250);
    border-radius: ${borderRadiusCss(2)};
`;

const StyledSection = styled(Column)`
    row-gap: ${spacingCss(0.5)};
`;

const StyledList = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
    row-gap: ${spacingCss(0.5)};
`;

const StyledTitle = styled.span`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 20px;
`;
