import { ImageCollection } from '../ImageColection';
import { DisplayPreviewCollection } from './DisplayPreviewCollection';
import { TubeRotate } from '../Tube/TubeRotate';
import { observer } from 'mobx-react';
import { TubeCompCont, ConfigComp } from './ConfigComp/ConfigUtils';
import { RsNumber } from 'react-utils/Components/RsInput/RsNumber';

type Props = {
    tube: TubeRotate;
    collection: ImageCollection;
};

export const TubeRotateComp = observer(({ tube, collection }: Props) => {
    return (
        <TubeCompCont>
            <ConfigComp>
                <RsNumber
                    title={_('Degree')}
                    value={tube.config.angle}
                    step={1}
                    onChange={(angle) => tube.setConfig({ angle })}
                />
            </ConfigComp>

            <DisplayPreviewCollection collection={collection} showInit="objects" />
        </TubeCompCont>
    );
});
