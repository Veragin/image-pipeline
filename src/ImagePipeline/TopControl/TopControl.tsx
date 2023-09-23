import { Download, PlayArrow } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { spacingCss } from 'react-utils/Components/globalCss';
import { RsInput } from 'react-utils/Components/RsInput/RsInput';
import { RsModal } from 'react-utils/Components/RsModal';
import { Spinner } from 'react-utils/Components/Spinner';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import { ThePrimaryButton } from 'react-utils/Components/TheButton';
import styled from 'styled-components';
import { Pipeline } from '../Pipeline';
import { StartPipelineModal } from './StartPipelineModal';

type Props = {
    pipeline: Pipeline;
};

export const TopControl = observer(({ pipeline }: Props) => {
    const [openStartModal, setOpenStartModal] = useState(false);
    const [openTemplateModal, setOpenTemplateModal] = useState(false);
    const [fileName, setFileName] = useState('template');

    return (
        <StyledRow>
            <Tooltip title={_('Start process')}>
                <Fab color="primary" size="small" onClick={() => setOpenStartModal(true)}>
                    <PlayArrow />
                </Fab>
            </Tooltip>
            <RsModal
                open={openStartModal}
                onClose={() => setOpenStartModal(false)}
                title={_('Start Pipeline')}
            >
                <StartPipelineModal pipeline={pipeline} onClose={() => setOpenStartModal(false)} />
            </RsModal>

            <Tooltip title={_('Export template')}>
                <Fab color="primary" size="small" onClick={() => setOpenTemplateModal(true)}>
                    <Download />
                </Fab>
            </Tooltip>
            <RsModal
                open={openTemplateModal}
                onClose={() => setOpenTemplateModal(false)}
                title={_('Download template')}
            >
                <StyledCont>
                    <span>
                        {_(
                            'Download template of this pipeline into .json file. This file can be loaded in the future by add template button and will set up the pipeline exactlly same.'
                        )}
                    </span>
                    <RsInput title={_('File name')} value={fileName} onChange={setFileName} />

                    <StyledPrimButton
                        color="primary"
                        onClick={() => {
                            pipeline.exportTemplate(fileName);
                            setOpenTemplateModal(false);
                        }}
                    >
                        {_('Download')}
                    </StyledPrimButton>
                </StyledCont>
            </RsModal>

            {pipeline.processCounter !== null ? (
                <Spinner
                    msg={_(
                        'Processed %d/%d',
                        pipeline.processCounter,
                        pipeline.tubeTree.tubeLoad.sources.length ?? 0
                    )}
                />
            ) : null}
        </StyledRow>
    );
});

const StyledRow = styled(Row)`
    gap: ${spacingCss(2)};
    padding: 0 ${spacingCss(2)};
`;

const StyledCont = styled(Column)`
    align-items: center;
    row-gap: ${spacingCss(2)};
`;

const StyledPrimButton = styled(ThePrimaryButton)`
    margin-top: ${spacingCss(1)};
`;
