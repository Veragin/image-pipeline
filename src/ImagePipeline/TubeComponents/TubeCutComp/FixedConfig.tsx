import { Row } from '../../../react-utils/Components/StyledComponents';
import { TubeCut } from '../../Tube/TubeCut';
import ToolbarProperty from 'ImagePipeline/Components/ToolbarProperty';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';
import { InputTitle } from 'react-utils/Components/RsInput/InputTitle';

type Props = {
    tube: TubeCut;
};

export const FixedConfig = observer(({ tube }: Props) => {
    if (tube.config.type !== 'fixed') return null;

    return (
        <>
            <InputTitle helpTitle={_('Every piece will have this size in pixels')}>
                {_('Fixed config')}
            </InputTitle>
            <StyledRow>
                <ToolbarProperty
                    title={_('Width')}
                    tooltip={_('Width')}
                    type="number"
                    value={String(tube.config.fixed.width)}
                    onChange={(v) =>
                        tube.setConfig({
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
                    value={String(tube.config.fixed.height)}
                    onChange={(v) =>
                        tube.setConfig({
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
