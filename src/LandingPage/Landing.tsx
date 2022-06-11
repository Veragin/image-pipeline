import { Button } from '@mui/material';
import React from 'react';
import { Row } from 'react-utils/Components/StyledComponents';
import logo from 'Assets/logo/logo.png';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

export const Landing = () => {
    return (
        <>
            <StyledTop>
                <StyledLogo
                    src={logo}
                    onClick={() => window.location.replace('resaizer.com')}
                />
                <StyledButtonRow>
                    <Button color="primary" variant="contained">
                        {_('Sign in')}
                    </Button>
                    <Button color="secondary" variant="text">
                        {_('Sign up')}
                    </Button>
                </StyledButtonRow>
            </StyledTop>
        </>
    );
};

const StyledTop = styled(Row)`
    width: calc(100% - ${spacingCss(1)});
    justify-content: space-between;
    padding: ${spacingCss(1)};
`;

const StyledButtonRow = styled(Row)`
    gap: ${spacingCss(1)};
`;

const StyledLogo = styled.img`
    height: 42px;
    cursor: pointer;
`;
