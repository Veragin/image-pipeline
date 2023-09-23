import { ImageCollection, TImageItem, TImageObject } from '../ImageColection';
import { getRandomColor } from '../functions/pixelUtils';
import { useEffect, useRef, useState } from 'react';

import { Column, Row } from 'react-utils/Components/StyledComponents';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';
import { InputTitle } from 'react-utils/Components/RsInput/InputTitle';
import { Radio, Tooltip } from '@mui/material';
import { applyColorToImage } from 'ImagePipeline/functions/colorModify';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

type TItemShow = 'none' | 'selection' | 'objects';

type Props = {
    collection: ImageCollection;
    showInit?: TItemShow;
};

export const DisplayPreviewCollection = ({ collection, showInit }: Props) => {
    const [show, setShow] = useState<TItemShow>(showInit ?? 'none');

    return (
        <StyledCont>
            <InputTitle>{_('Preview')}</InputTitle>
            <StyledOptions>
                <Option
                    label={_('None')}
                    checked={show === 'none'}
                    onClick={() => setShow('none')}
                    helpInfo={_('Display just the image')}
                />
                <Option
                    label={_('Selection')}
                    checked={show === 'selection'}
                    onClick={() => setShow('selection')}
                    helpInfo={_('Display selected pixels by Select tube')}
                />
                <Option
                    label={_('Objects')}
                    checked={show === 'objects'}
                    onClick={() => setShow('objects')}
                    helpInfo={_('Display objects founded by Object tube')}
                />
            </StyledOptions>

            <StyledDisplayCont>
                {collection.stack.map((item, i) => (
                    <DisplayItem key={i} data={item} show={show} />
                ))}
            </StyledDisplayCont>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    gap: ${spacingCss(0.5)};
`;

const StyledOptions = styled(Row)`
    gap: ${spacingCss(3)};
`;

const StyledDisplayCont = styled(Row)`
    gap: ${spacingCss(1)};
    padding: ${spacingCss(1)};
    border: 1px black solid;
    flex-wrap: wrap;
    overflow-y: auto;
    flex: 1;
`;

/******************************************
 ****** Option
 ******************************************/

type OptionProps = {
    label: string;
    onClick: () => void;
    helpInfo: string;
    checked: boolean;
};

const Option = ({ label, onClick, helpInfo, checked }: OptionProps) => {
    return (
        <StyledOption>
            <Radio size="small" onChange={onClick} checked={checked} />
            {label}
            <Tooltip title={helpInfo}>
                <StyledIcon />
            </Tooltip>
        </StyledOption>
    );
};

const StyledOption = styled.label`
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 14px;
`;

const StyledIcon = styled(HelpRoundedIcon)`
    width: 14px;
    height: 14px;
    margin-left: ${spacingCss(0.5)};
    color: ${({ theme }) => theme.palette.secondary.main};
`;

/******************************************
 ****** Item
 ******************************************/

type ItemProps = {
    data: TImageItem;
    show?: TItemShow;
};

const DisplayItem = ({ data, show }: ItemProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        if (canvasRef.current && ctx) {
            canvasRef.current.width = data.data.width;
            canvasRef.current.height = data.data.height;
            canvasRef.current.style.width = data.data.width + 'px';
            canvasRef.current.style.height = data.data.height + 'px';

            let img = data.data;

            if (show !== undefined) {
                img = getColoredImage(data, show);
            }

            ctx.putImageData(img, 0, 0);

            if (show === 'objects') {
                drawObjects(ctx, data.objects);
            }
        }
    }, [data, show]);

    return <StyledCanvas ref={canvasRef} />;
};

const getColoredImage = (data: TImageItem, show: TItemShow) => {
    const newData = new ImageData(data.data.width, data.data.height);
    newData.data.set(data.data.data);

    if (show === 'selection') {
        applyColorToImage(newData, data.selection, {
            r: 204,
            g: 68,
            b: 255,
            a: 1,
        });
    } else if (show === 'objects') {
        for (let obj of data.objects) {
            const color = getRandomColor();
            applyColorToImage(newData, obj.selection, color);
        }
    }

    return newData;
};

const drawObjects = (ctx: CanvasRenderingContext2D, objects: TImageObject[]) => {
    for (let obj of objects) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(obj.rect.x, obj.rect.y, obj.rect.width, obj.rect.height);
    }
};

const StyledCanvas = styled.canvas`
    border: 1px black solid;
`;
