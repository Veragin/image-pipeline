import { Download, PlayArrow } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { spacingCss } from 'react-utils/Components/globalCss';
import { RsInput } from 'react-utils/Components/RsInput/RsInput';
import { RsSwitch } from 'react-utils/Components/RsInput/RsSwitch';
import { RsModal } from 'react-utils/Components/RsModal';
import { Spinner } from 'react-utils/Components/Spinner';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import { ThePrimaryButton } from 'react-utils/Components/TheButton';
import styled from 'styled-components';
import { Pipeline } from './Pipeline';

type Props = {
    pipeline: Pipeline;
};

export const TopControl = observer(({ pipeline }: Props) => {
    const [openStartModal, setOpenStartModal] = useState(false);
    const [useZip, setUseZip] = useState(false);
    const [zipName, setZipName] = useState('pipeline');
    const [openTemplateModal, setOpenTemplateModal] = useState(false);
    const [fileName, setFileName] = useState('template');

    const start = () => {
        pipeline.run(useZip ? zipName : null);
        setOpenStartModal(false);
    };

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
                <StyledCont>
                    <RsSwitch
                        title={_('Zip')}
                        value={useZip}
                        onChange={setUseZip}
                        helpTooltip={_('All images will be wrapped into one zip file.')}
                    />
                    {useZip && (
                        <RsInput title={_('Zip name')} value={zipName} onChange={setZipName} />
                    )}
                    <StyledPrimButton color="primary" onClick={() => start()}>
                        {_('Start')}
                    </StyledPrimButton>
                </StyledCont>
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
    gap: ${spacingCss(1)};
    padding: 0 ${spacingCss(1)};
`;

const StyledCont = styled(Column)`
    align-items: center;
    row-gap: ${spacingCss(1)};
`;

const StyledPrimButton = styled(ThePrimaryButton)`
    margin-top: ${spacingCss(1)};
`;
