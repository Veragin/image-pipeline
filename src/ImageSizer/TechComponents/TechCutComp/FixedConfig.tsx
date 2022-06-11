import React from 'react';
import { Row } from '../../../react-utils/Components/StyledComponents';
import { TechCut } from '../../Tech/TechCut';
import ToolbarProperty from 'Service/tsx/Toolbar/ToolbarComponents/ToolbarProperty';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    tech: TechCut;
};

export const FixedConfig = observer(({ tech }: Props) => {
    if (tech.config.type !== 'fixed') return null;

    return (
        <>
            <StyledRow>
                <ToolbarProperty
                    title={_('Width')}
                    tooltip={_('Width')}
                    type="number"
                    value={String(tech.config.fixed.width)}
                    onChange={(v) =>
                        tech.setConfig({
                            fixed: {
                                width: Number(v),
                            },
                        })
                    }
                />
                <ToolbarProperty
                    title={_('Height')}
                    tooltip={_('Height')}
                    type="number"
                    value={String(tech.config.fixed.height)}
                    onChange={(v) =>
                        tech.setConfig({
                            fixed: {
                                height: Number(v),
                            },
                        })
                    }
                />
            </StyledRow>
        </>
    );
});

const StyledRow = styled(Row)`
    column-gap: ${spacingCss(2)};
`;
