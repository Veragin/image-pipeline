import { ImageCollection, TImageItem, TImageObject } from "../ImageColection";
import { applyColorToImage, getRandomColor } from "../functions/pixelUtils";
import { useEffect, useRef, useState } from "react";

import { Column, Row } from "react-utils/Components/StyledComponents";
import { spacingCss } from "react-utils/Components/globalCss";
import styled from "styled-components";
import { InputTitle } from "react-utils/Components/RsInput/InputTitle";
import { Radio } from "@mui/material";

type TItemShow = "none" | "selection" | "objects";

type Props = {
    collection: ImageCollection;
    showInit?: TItemShow;
};

export const DisplayPreviewCollection = ({ collection, showInit }: Props) => {
    const [show, setShow] = useState<TItemShow>(showInit ?? "none");

    return (
        <StyledCont>
            <InputTitle>{_("Output")}</InputTitle>
            <StyledOptions>
                <StyledOption>
                    <Radio
                        size="small"
                        onChange={() => setShow("none")}
                        checked={show === "none"}
                    />
                    {_("None")}
                </StyledOption>
                <StyledOption>
                    <Radio
                        size="small"
                        onChange={() => setShow("selection")}
                        checked={show === "selection"}
                    />
                    {_("Selection")}
                </StyledOption>
                <StyledOption>
                    <Radio
                        size="small"
                        onChange={() => setShow("objects")}
                        checked={show === "objects"}
                    />
                    {_("objects")}
                </StyledOption>
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

const StyledOption = styled.label`
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 14px;
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
 ****** Item
 ******************************************/

type ItemProps = {
    data: TImageItem;
    show?: TItemShow;
};

const DisplayItem = ({ data, show }: ItemProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");

        if (canvasRef.current && ctx) {
            canvasRef.current.width = data.data.width;
            canvasRef.current.height = data.data.height;
            canvasRef.current.style.width = data.data.width + "px";
            canvasRef.current.style.height = data.data.height + "px";

            let img = data.data;

            if (show !== undefined) {
                img = getColoredImage(data, show);
            }

            ctx.putImageData(img, 0, 0);

            if (show === "objects") {
                drawObjects(ctx, data.objects);
            }
        }
    }, [data, show]);

    return <StyledCanvas ref={canvasRef} />;
};

const getColoredImage = (data: TImageItem, show: TItemShow) => {
    const newData = new ImageData(data.data.width, data.data.height);
    newData.data.set(data.data.data);

    if (show === "selection") {
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

const drawObjects = (ctx: CanvasRenderingContext2D, objects: TImageObject[]) => {
    for (let obj of objects) {
        ctx.strokeStyle = "black";
        ctx.strokeRect(obj.rect.x, obj.rect.y, obj.rect.width, obj.rect.height);
    }
};

const StyledCanvas = styled.canvas`
    border: 1px black solid;
`;
