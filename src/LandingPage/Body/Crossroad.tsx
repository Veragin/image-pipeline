import { spacingCss } from 'react-utils/Components/globalCss';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import { ThePrimaryButton } from 'react-utils/Components/TheButton';
import styled from 'styled-components';
import logo from 'Assets/logo/logo.svg';

export const Crossroad = () => {
    return (
        <StyledRow>
            <StyledColumn>
                <StyledText>Check our other products</StyledText>
                <div>
                    <ThePrimaryButton
                        onClick={() => window.open('https://www.veragin.com', '_blank')}
                    >
                        Visit Crossroad
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
