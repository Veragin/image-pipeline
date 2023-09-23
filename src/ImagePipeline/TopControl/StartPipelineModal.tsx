import { Alert } from '@mui/material';
import { Pipeline } from 'ImagePipeline/Pipeline';
import { useState } from 'react';
import { RsInput } from 'react-utils/Components/RsInput/RsInput';
import { RsSwitch } from 'react-utils/Components/RsInput/RsSwitch';
import { Column, Row } from 'react-utils/Components/StyledComponents';
import { ThePrimaryButton } from 'react-utils/Components/TheButton';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    onClose: () => void;
    pipeline: Pipeline;
};

export const StartPipelineModal = ({ onClose, pipeline }: Props) => {
    const [useZip, setUseZip] = useState(false);
    const [zipName, setZipName] = useState('pipeline');

    const start = () => {
        pipeline.run(useZip ? zipName : null);
        onClose();
    };

    const showNoDownloadAlert = !pipeline.tubeTree.hasDownloadTube;
    const showNoImageAlert = pipeline.tubeTree.tubeLoad.sources.length === 0;
    const allowDownalod = !showNoDownloadAlert && !showNoImageAlert;

    return (
        <StyledCont>
            <span>
                {_(
                    'Process all loaded images through the pipeline. Download tubes will execute downloads or will append images to the final zip.'
                )}
            </span>
            {showNoDownloadAlert && (
                <Alert severity="error">
                    {_(
                        'No Download tube in your pipeline. Running of this pipeline will have no effect.'
                    )}
                </Alert>
            )}
            {showNoImageAlert && (
                <Alert severity="error">
                    {_('No images loaded via Load tube. Nothing to process.')}
                </Alert>
            )}
            {allowDownalod && (
                <StyledRow>
                    <RsSwitch
                        title={_('Zip')}
                        value={useZip}
                        onChange={setUseZip}
                        helpTooltip={_('All images will be wrapped into one zip file.')}
                    />
                    {useZip && (
                        <RsInput title={_('Zip file name')} value={zipName} onChange={setZipName} />
                    )}
                </StyledRow>
            )}

            {allowDownalod ? (
                <StyledPrimButton onClick={() => start()}>{_('Start')}</StyledPrimButton>
            ) : (
                <StyledPrimButton onClick={onClose}>{_('Close')}</StyledPrimButton>
            )}
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    align-items: center;
    row-gap: ${spacingCss(2)};
`;

const StyledRow = styled(Row)`
    align-items: center;
    row-gap: ${spacingCss(2)};
    justify-content: start;
    width: 100%;
`;

const StyledPrimButton = styled(ThePrimaryButton)`
    margin-top: ${spacingCss(1)};
`;
