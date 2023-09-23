import { Row } from 'react-utils/Components/StyledComponents';
import { TubeSelect } from 'ImagePipeline/Tube/TubeSelect';
import ToolbarColor from 'ImagePipeline/Components/ToolbarColor';
import ToolbarProperty from 'ImagePipeline/Components/ToolbarProperty';
import ToolbarSlider from 'ImagePipeline/Components/ToolbarSlider';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { useState } from 'react';
import RsSelect from 'react-utils/Components/RsInput/RsSelect';

type Props = {
    tube: TubeSelect;
};

export const NeighborConfig = observer(({ tube }: Props) => {
    const [color, setColor] = useState(tube.config.neighbor.color);
    const [threshold, setThreshold] = useState(tube.config.neighbor.threshold);

    if (tube.config.method !== 'neighbor') return null;

    return (
        <>
            <RsSelect
                title={_('Neighbor config')}
                value={tube.config.neighbor.type}
                setValue={(v) => tube.setConfigNeighbor({ type: v as any })}
                list={typeOptions}
            />

            {tube.config.neighbor.type === 'pixel' && (
                <StyledRow>
                    <ToolbarProperty
                        title="X"
                        tooltip="X"
                        type="number"
                        value={String(tube.config.neighbor.x)}
                        onChange={(v) =>
                            tube.setConfigNeighbor({
                                x: Number(v),
                            })
                        }
                    />
                    <ToolbarProperty
                        title="Y"
                        tooltip="Y"
                        type="number"
                        value={String(tube.config.neighbor.y)}
                        onChange={(v) =>
                            tube.setConfigNeighbor({
                                y: Number(v),
                            })
                        }
                    />
                </StyledRow>
            )}

            {tube.config.neighbor.type === 'color' && (
                <ToolbarColor
                    label="Color"
                    value={color}
                    onChange={(v) => {
                        setColor(v);
                        tube.setConfigNeighbor({
                            color: v,
                        });
                    }}
                />
            )}

            <StyledRow>
                <StyledTitle>{_('Threshold')}</StyledTitle>
                <ToolbarSlider
                    value={threshold}
                    onChange={(v) => {
                        setThreshold(v);
                        tube.setConfigNeighbor({
                            threshold: v,
                        });
                    }}
                    step={0.001}
                />
            </StyledRow>
        </>
    );
});

const typeOptions = [
    {
        title: _('Pixel'),
        value: 'pixel',
    },
    {
        title: _('Color'),
        value: 'color',
    },
    {
        title: _('Background color'),
        value: 'baseColor',
    },
];

const StyledRow = styled(Row)`
    width: 100%;
    overflow: hidden;
    column-gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
`;

const StyledTitle = styled.div`
    color: black;
    font-size: 14px;
    padding-right: ${({ theme }) => theme.spacing(0.5)};
`;
