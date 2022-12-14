import { spacingCss } from "react-utils/Components/globalCss";
import { Column, Row } from "react-utils/Components/StyledComponents";
import { ThePrimaryButton } from "react-utils/Components/TheButton";
import styled from "styled-components";
import logo from "Assets/logo/logo.svg";

export const Sizefire = () => {
    return (
        <StyledRow>
            <StyledColumn>
                <StyledText>
                    Create online banners in minutes! Image pipeline is part of Sizefire.com which
                    is a tool that allows you to quickly create an entire banner set for Google
                    display network and Facebook when you need it most. Choose from our predefined
                    templates and save time and money! The first global online tool for automating
                    banner graphics for free.
                </StyledText>
                <div>
                    <ThePrimaryButton
                        onClick={() => window.open("https://www.sizefire.com", "_blank")}
                    >
                        Visit Sizefire
                    </ThePrimaryButton>
                </div>
            </StyledColumn>
            <StyledImg src={logo} />
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
    padding: 0 ${spacingCss(5)};
    gap: ${spacingCss(5)};
    max-width: min(100%, 1000px);
    margin: 0 auto;
`;

const StyledColumn = styled(Column)`
    gap: ${spacingCss(3)};
    align-items: center;
`;

const StyledImg = styled.img`
    height: 200px;
`;

const StyledText = styled.p`
    margin: 0;
`;
