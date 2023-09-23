import { Row } from '../../../react-utils/Components/StyledComponents';
import { TFitTo } from '../../functions/rectTricks';
import ToolbarProperty from 'ImagePipeline/Components/ToolbarProperty';
import ToolbarSelect from 'ImagePipeline/Components/ToolbarSelect';
import { observer } from 'mobx-react';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    type?: string;
    fitTo: TFitTo;
    onChange: (b: Partial<TFitTo>) => void;
};

export const FitToConfig = observer(({ type, fitTo, onChange }: Props) => {
    if (type !== undefined && type !== 'fitTo') return null;

    return (
        <>
            <StyledRow>
                <ToolbarProperty
                    title={_('Width')}
                    tooltip={_('Width')}
                    type="number"
                    value={String(fitTo.width)}
                    onChange={(v) =>
                        onChange({
                            width: Number(v),
                        })
                    }
                />
                <ToolbarProperty
                    title={_('Height')}
                    tooltip={_('Height')}
                    type="number"
                    value={String(fitTo.height)}
                    onChange={(v) =>
                        onChange({
                            height: Number(v),
                        })
                    }
                />
            </StyledRow>
            <StyledRow>
                {_('Vertical')}
                <ToolbarSelect
                    value={fitTo.vertical}
                    onChange={(v) =>
                        onChange({
                            vertical: v as 'top' | 'center' | 'bottom',
                        })
                    }
                    options={verticalOption}
                />
                {_('Horizontal')}
                <ToolbarSelect
                    value={fitTo.horizontal}
                    onChange={(v) =>
                        onChange({
                            horizontal: v as 'center' | 'left' | 'right',
                        })
                    }
                    options={horizontalOption}
                />
            </StyledRow>
        </>
    );
});

const verticalOption = [
    {
        name: _('Top'),
        value: 'top',
    },
    {
        name: _('Center'),
        value: 'center',
    },
    {
        name: _('Bottom'),
        value: 'bottom',
    },
];

const horizontalOption = [
    {
        name: _('Left'),
        value: 'left',
    },
    {
        name: _('Center'),
        value: 'center',
    },
    {
        name: _('Right'),
        value: 'right',
    },
];

const StyledRow = styled(Row)`
    column-gap: ${spacingCss(1)};
    align-items: center;
    font-size: 12px;
`;
