import { ImageCollection, TImageItem, TImageObject } from '../ImageColection';
import React, { useEffect, useRef } from 'react';
import {
    applyColorToImage,
    getRandomColor,
} from 'ImageSIzer/functions/pixelUtils';

import { Row } from 'react-utils/Components/StyledComponents';
import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    collection: ImageCollection;
    show?: TItemShow;
};

export const TechCompCollection = ({ collection, show }: Props) => {
    return (
        <StyledCont>
            {collection.stack.map((item, i) => (
                <TechCompCollectionItem key={i} data={item} show={show} />
            ))}
        </StyledCont>
    );
};

const StyledCont = styled(Row)`
    gap: ${spacingCss(1)};
    padding: ${spacingCss(1)};
    border: 1px black solid;
    flex-wrap: wrap;
    overflow-y: auto;
    flex: 1;
`;

/******************************************
 ****** Item
 ******************************************/

type TItemShow = 'selection' | 'objects';

type ItemProps = {
    data: TImageItem;
    show?: TItemShow;
};

export const TechCompCollectionItem = ({ data, show }: ItemProps) => {
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
            r: 255,
            g: 0,
            b: 0,
            a: 1,
        });
    } else {
        for (let obj of data.objects) {
            const color = getRandomColor();
            applyColorToImage(newData, obj.selection, color);
        }
    }

    return newData;
};

const drawObjects = (
    ctx: CanvasRenderingContext2D,
    objects: TImageObject[]
) => {
    for (let obj of objects) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(obj.rect.x, obj.rect.y, obj.rect.width, obj.rect.height);
    }
};

const StyledCanvas = styled.canvas`
    border: 1px black solid;
`;
