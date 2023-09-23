import { ImageCollection } from '../ImageColection';
import { DisplayPreviewCollection } from './DisplayPreviewCollection';
import { TubeLoad } from '../Tube/TubeLoad/TubeLoad';
import { IconButton, Radio, Tooltip } from '@mui/material';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ConfigComp, TubeCompCont } from './ConfigComp/ConfigUtils';
import { RsFile } from 'react-utils/Components/RsInput/RsFile';
import { spacingCss } from 'react-utils/Components/globalCss';
import { InputTitle } from 'react-utils/Components/RsInput/InputTitle';
import { Row } from 'react-utils/Components/StyledComponents';
import { WarningChip } from './WarningChip';
import { RsNumber } from 'react-utils/Components/RsInput/RsNumber';
import { DeleteIcon } from 'react-utils/Components/Icons';

const MAX_VISIBLE_SOURCE_COUNT = 50;

type Props = {
    tube: TubeLoad;
    collection: ImageCollection;
};

export const TubeLoadComp = observer(({ tube, collection }: Props) => {
    const names = tube.getSourceNames();

    const visibleNames = names.filter((n, i) => i < MAX_VISIBLE_SOURCE_COUNT);

    const showWarning = names.length > MAX_VISIBLE_SOURCE_COUNT;

    return (
        <TubeCompCont>
            <ConfigComp>
                <RsFile
                    title={_('Load images')}
                    onChange={tube.load}
                    accept="image/*"
                    multiple
                    selectedCount={names.length}
                />
                <RsNumber
                    title={_('Number of loaded images together')}
                    value={tube.config.numberOfImgsTogether}
                    onChange={(numberOfImgsTogether) => tube.setConfig({ numberOfImgsTogether })}
                    step={1}
                    min={0}
                    helpTitle={_(
                        'Number of images that will be loaded together so you can join them'
                    )}
                />
            </ConfigComp>

            <div>
                <StyledRow>
                    <InputTitle>{_('Loaded files')}</InputTitle>
                    {showWarning && (
                        <WarningChip
                            title={_('Showing only first %d files', MAX_VISIBLE_SOURCE_COUNT)}
                        />
                    )}
                </StyledRow>
                <StyledCont>
                    {visibleNames.map((name, i) => (
                        <StyledFileName key={i}>
                            <StyledRadio
                                size="small"
                                checked={i === tube.selectedIndex}
                                onChange={() => tube.switchPreview(i)}
                            />
                            <Tooltip title={name}>
                                <StyledName>{name}</StyledName>
                            </Tooltip>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    tube.deleteSource(i);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </StyledFileName>
                    ))}
                </StyledCont>
            </div>

            <DisplayPreviewCollection collection={collection} />
        </TubeCompCont>
    );
});

const StyledRow = styled(Row)`
    gap: ${spacingCss(1)};
    align-items: center;
`;

const StyledCont = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-height: 50vh;
    gap: ${spacingCss(1)};
`;

const StyledFileName = styled.label`
    display: flex;
    font-size: 14px;
    gap: ${spacingCss(0.5)};
    align-items: center;
    cursor: pointer;
`;

const StyledName = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const StyledRadio = styled(Radio)`
    &.MuiRadio-root {
        padding: ${spacingCss(0.5)};
    }
`;
