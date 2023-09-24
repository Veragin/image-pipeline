import { TTubeDownloadFormat, TubeDownload } from '../Tube/TubeDownload';

import { ImageCollection } from '../ImageColection';
import RsSelect from 'react-utils/Components/RsInput/RsSelect';
import { DisplayPreviewCollection } from './DisplayPreviewCollection';
import { ThePrimaryButton } from '../../react-utils/Components/TheButton';
import { observer } from 'mobx-react';
import { TubeCompCont, ConfigComp } from './ConfigComp/ConfigUtils';
import { RsSwitch } from 'react-utils/Components/RsInput/RsSwitch';
import { RsSllider } from 'react-utils/Components/RsInput/RsSlider';

type Props = {
    tube: TubeDownload;
    collection: ImageCollection;
};

export const TubeDownloadComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsSelect
                    title={_('Format')}
                    value={tube.config.format}
                    setValue={(format) => tube.setConfig({ format })}
                    list={tubeTypeList}
                />

                <RsSllider
                    title={_('Quality (%)')}
                    value={Math.round(tube.config.quality * 100)}
                    onChange={(e, v) => tube.setConfig({ quality: (v as number) / 100 })}
                    min={0}
                    max={100}
                    step={5}
                    helpTitle={_(
                        '100% means that the generated image will be without any compression'
                    )}
                />

                <RsSwitch
                    title={_('Wrap into zip/folder')}
                    value={tube.config.zip}
                    onChange={(zip) => tube.setConfig({ zip })}
                    helpTooltip={_(
                        'Wrap image pieces into zip file. If pipeline is started in zip mode, folder will be use instead'
                    )}
                />

                <ThePrimaryButton onClick={() => tube.do(collection)}>
                    {_('Download preview')}
                </ThePrimaryButton>
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
        </TubeCompCont>
    );
});

const tubeTypeList: { title: string; value: TTubeDownloadFormat }[] = [
    {
        title: _('Default'),
        value: 'default',
    },
    {
        title: _('Png'),
        value: 'png',
    },
    {
        title: _('Jpeg'),
        value: 'jpeg',
    },
];
