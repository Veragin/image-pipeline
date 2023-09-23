import { InputTitle } from 'react-utils/Components/RsInput/InputTitle';
import { Row } from '../../../react-utils/Components/StyledComponents';
import { TPadding } from '../../functions/rectTricks';
import ToolbarProperty from 'ImagePipeline/Components/ToolbarProperty';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    type?: string;
    padding: TPadding;
    onChange: (b: DeepPartial<TPadding>) => void;
};

export const PaddingConfig = observer(({ type, padding, onChange }: Props) => {
    if (type !== undefined && type !== 'padding') return null;

    return (
        <>
            <InputTitle helpTitle={_('Add some padding (can be negative), enter signed integer')}>
                {_('Padding')}
            </InputTitle>
            <StyledRow>
                <ToolbarProperty
                    title={_('Top')}
                    tooltip={_('Top')}
                    type="number"
                    value={String(padding.top)}
                    onChange={(v) =>
                        onChange({
                            top: Number(v),
                        })
                    }
                />
                <ToolbarProperty
                    title={_('Bottom')}
                    tooltip={_('Bottom')}
                    type="number"
                    value={String(padding.bottom)}
                    onChange={(v) =>
                        onChange({
                            bottom: Number(v),
                        })
                    }
                />
            </StyledRow>
            <StyledRow>
                <ToolbarProperty
                    title={_('Left')}
                    tooltip={_('Left')}
                    type="number"
                    value={String(padding.left)}
                    onChange={(v) =>
                        onChange({
                            left: Number(v),
                        })
                    }
                />
                <ToolbarProperty
                    title={_('Right')}
                    tooltip={_('Right')}
                    type="number"
                    value={String(padding.right)}
                    onChange={(v) =>
                        onChange({
                            right: Number(v),
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
