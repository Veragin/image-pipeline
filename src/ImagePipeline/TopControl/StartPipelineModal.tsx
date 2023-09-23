import { Alert } from '@mui/material';
import { Pipeline } from 'ImagePipeline/Pipeline';
import { useState } from 'react';
import { RsInput } from 'react-utils/Components/RsInput/RsInput';
import { RsSwitch } from 'react-utils/Components/RsInput/RsSwitch';
import { Column } from 'react-utils/Components/StyledComponents';
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

    const displayWarn = !pipeline.tubeTree.hasDownloadTube;
    const allowDownalod = !displayWarn;

    return (
        <StyledCont>
            {displayWarn && (
                <Alert severity="error">
                    {_(
                        'There is no Download tube in your pipeline. Running of this pipeline will have no effect.'
                    )}
                </Alert>
            )}
            {allowDownalod && (
                <RsSwitch
                    title={_('Zip')}
                    value={useZip}
                    onChange={setUseZip}
                    helpTooltip={_('All images will be wrapped into one zip file.')}
                />
            )}

            {useZip && <RsInput title={_('Zip name')} value={zipName} onChange={setZipName} />}

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
    row-gap: ${spacingCss(1)};
`;

const StyledPrimButton = styled(ThePrimaryButton)`
    margin-top: ${spacingCss(1)};
`;
