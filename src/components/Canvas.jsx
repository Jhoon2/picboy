import React from 'react';
import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from "react";

// image import 
import paint from "../images/paint.png";
import pen from "../images/pen.png";
import eraser from "../images/eraser.png";
import brush from "../images/brush.png";
import rectangle from "../images/rectangle.png";
import line from "../images/line.png";
import triangle from "../images/triangle.png";
import circle from "../images/circle.png";
import undo from "../images/undo.png";
import redo from "../images/redo.png";
import stroke from "../images/stroke.png";
import waterdrop from "../images/waterdrop.png";


const Canvas = () => {
    // useRef를 이용해 canvas 엘리먼트에 접근
    const canvasRef = useRef(null);

    const [ctx, setCtx] = useState();
    const [isPainting, setIsPainting] = useState(false);
    const [lineWeight, setLineWeight] = useState(5);
    const [lineOpacity, setLineOpacity] = useState(1);
    const [rectState, setRectState] = useState(false);
    const [pencilState, setPencilState] = useState(false);
    const [brushState, setBrushState] = useState(false);
    const [paintState, setPaintState] = useState(false);
    const [eraserState, setEraserState] = useState(false);
    const [undoState, setUndoState] = useState(0);
    const [redoState, setRedoState] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 688;
        canvas.height = 688;
        setPencilState(true);
        setCtx(canvasRef.current.getContext('2d'));
    }, []);

    // const submit = () => {
    //     const canvas = canvasRef.current;
    //     const imgDataUrl = canvas.toDataURL('image/png');
    //     console.log(imgDataUrl)
    // }

    const draw = (e) => {
        const X = e.clientX - canvasRef.current.offsetLeft;
        const Y = e.clientY - canvasRef.current.offsetTop + window.scrollY;
        if (isPainting === true) {
            if (rectState === true) {
                console.log('hi')
                ctx.strokeRect(X, Y, X - canvasRef.current.offsetLeft, Y - canvasRef.current.offsetTop);
            } else if (eraserState === true) {
                ctx.strokeStyle = "white";
            }
            ctx.lineWidth = lineWeight.value;
            ctx.lineTo(X, Y);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(X, Y);
        }
    }
    // 사용자 마우스 움직임 감지
    const startPainting = () => {
        setIsPainting(true);
    }

    const cancelPainting = () => {
        setIsPainting(false);
        setRectState(false);
    }

    // 선 굵기 변경
    const onLineWidthChange = (e) => {
        setLineWeight(ctx.lineWidth = e.target.value);
    }

    // 선 투명도 변경
    const onLineOpacityChange = (e) => {
        setLineOpacity(ctx.globalAlpha = e.target.value);
    }

    // paint
    const paintHandler = (e) => {
        setPaintState(true);
        setPencilState(false);
        setRectState(false);
        setBrushState(false);
        setEraserState(false);

        ctx.fillRect(0, 0, 688, 688);
    }

    // pencil
    const pencilHandler = () => {
        setPencilState(true);
        setRectState(false);
        setBrushState(false);
        setPaintState(false);
        setEraserState(false);
        ctx.lineCap = "butt";
    }
    // brush
    const brushHandler = (e) => {
        setBrushState(true);
        setRectState(false);
        setPencilState(false);
        setPaintState(false);
        setEraserState(false);
        ctx.lineCap = "round";
    }

    // eraser
    const eraseHandler = (e) => {
        setEraserState(true);
        setRectState(false);
        setPencilState(false);
        setBrushState(false);
        setPaintState(false);
    }

    // undo
    const undoHandler = (e) => {
    }

    // redo
    const redoHandler = (e) => {

    }

    // draw Rect
    const drawRect = () => {
        setRectState(true);
    }

    // color change
    const colorChange = (e) => {
        const colorValue = e.target.id;
        ctx.strokeStyle = colorValue;
        ctx.fillStyle = colorValue;
    }

    return (
        <>
            <CanvasWrap>
                <PaintOptionWrap>
                    <ToolBox>
                        <Table>
                            <tbody>
                                <tr>
                                    <Td style={paintState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}><IcButton onClick={paintHandler}><img src={paint} alt="paint" style={paintState ? { filter: 'invert(100%)' } : {}} /></IcButton></Td>
                                    <Td style={pencilState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}><IcButton onClick={pencilHandler}><img src={pen} alt="pen" style={pencilState ? { filter: 'invert(100%)' } : {}} /></IcButton></Td>
                                </tr>
                                <tr>
                                    <Td style={eraserState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}><IcButton onClick={eraseHandler}><img src={eraser} alt="eraser" style={eraserState ? { filter: 'invert(100%)' } : {}} /></IcButton></Td>
                                    <Td style={brushState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}><IcButton onClick={brushHandler}><img src={brush} alt="brush" style={brushState ? { filter: 'invert(100%)' } : {}} /></IcButton></Td>
                                </tr>
                                <tr>
                                    <Td><IcButton onClick={drawRect}><img src={rectangle} alt="rectangle" /></IcButton></Td>
                                    <Td><IcButton><img src={line} alt="line" /></IcButton></Td>
                                </tr>
                                <tr>
                                    <Td><IcButton><img src={triangle} alt="triangle" /></IcButton></Td>
                                    <Td><IcButton><img src={circle} alt="circle" /></IcButton></Td>
                                </tr>
                                <tr>
                                    <Td><IcButton onClick={undoHandler} disabled={undoState === 0}><img src={undo} alt="undo" /></IcButton></Td>
                                    <Td><IcButton onClick={redoHandler} disabled={redoState === 0}><img src={redo} alt="redo" /></IcButton></Td>
                                </tr>
                            </tbody>
                        </Table>
                        <ToolShadow />
                    </ToolBox>
                    <LineStyle>
                        <RangeWrap>
                            <div>
                                <img src={stroke} alt="stroke" style={{ margin: '7px' }} />
                            </div>
                            <LineWeightCustomWrap>
                                <LineWeightCustom
                                    id="line-width"
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.5"
                                    value={lineWeight}
                                    onChange={onLineWidthChange}
                                />
                            </LineWeightCustomWrap>
                        </RangeWrap>
                        <RangeWrap>
                            <div>
                                <img src={waterdrop} alt="waterdrop" style={{ margin: '7px' }} />
                            </div>
                            <LineWeightCustomWrap>
                                <LineOpacityCustom
                                    id="line-opacity"
                                    type="range"
                                    min="0.2"
                                    max="1"
                                    step="0.2"
                                    value={lineOpacity}
                                    onChange={onLineOpacityChange}
                                />
                            </LineWeightCustomWrap>
                        </RangeWrap>
                        {/* <LineStyleShadow /> */}
                    </LineStyle>
                    <Table>
                        <tbody>
                            <tr>
                                <Td><ColorOption color={'#000'} onClick={colorChange} id="#000" /></Td>
                                <Td><ColorOption color={'#FF2222'} onClick={colorChange} id="#FF2222" /></Td>
                            </tr>
                            <tr>
                                <Td><ColorOption color={'#373737'} onClick={colorChange} id="#373737" /></Td>
                                <Td><ColorOption color={'#FFEB37'} onClick={colorChange} id="#FFEB37" /></Td>
                            </tr>
                            <tr>
                                <Td><ColorOption color={'#7A7A7A'} onClick={colorChange} id="#7A7A7A" /></Td>
                                <Td><ColorOption color={'#33F96A'} onClick={colorChange} id="#33F96A" /></Td>
                            </tr>
                            <tr>
                                <Td><ColorOption color={'#CCCCCC'} onClick={colorChange} id="#CCCCCC" /></Td>
                                <Td><ColorOption color={'#3139FF'} onClick={colorChange} id="#3139FF" /></Td>
                            </tr>
                            <tr>
                                <Td><ColorOption color={'#FFFFFF'} onClick={colorChange} id="#FFFFFF" /></Td>
                                <Td><ColorOption color={'#BD00FF'} onClick={colorChange} id="#BD00FF" /></Td>
                            </tr>
                        </tbody>
                    </Table>
                </PaintOptionWrap>
                <canvas
                    ref={canvasRef}
                    style={canvasStyle}
                    onMouseMove={draw}
                    onMouseDown={startPainting}
                    onMouseUp={cancelPainting}
                    onMouseLeave={cancelPainting}
                />
            </CanvasWrap>
        </>
    )
}

const canvasStyle = {
    width: '688px',
    height: '688px',
    border: '2px solid #000',
    backgroundColor: '#fff'
}

const CanvasWrap = styled.div`
    display: flex;
`;

const PaintOptionWrap = styled.div`
    margin-right: 16px;
`;

const ToolShadow = styled.div`
    width: 78px;
    height: 194px;
    background-color: #000;
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 0;
`;

const LineStyleShadow = styled.div`
    width: 78px;
    height: 194px;
    background-color: #000;
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 1;
`;

const LineWeightCustomWrap = styled.div`
    width: 30px;
    height: 80px;
    margin-left: -47.5px;
    margin-top: 52px;
`;

const LineWeightCustom = styled.input`
    transform: rotate(-90deg);
`;

const LineOpacityCustom = styled.input`
    transform: rotate(-90deg);
`;

const IcButton = styled.div`
    padding: 6px;
    margin-bottom: -6px;
`;

const Table = styled.table`
    c
    border: 2px solid #000;
    border-collapse: collapse;
    position: absolute;
    z-index: 999;
`;

const Td = styled.td`
    cursor: pointer;
    border: 2px solid #000;
    background-color: #fff;
`;

const ColorOption = styled.div`
    width: 37px;
    height: 37px;
    border: 1px solid #fff;
    background-color: ${props => props.color};
`;


const ToolBox = styled.div`
    height: 200px;
    margin-bottom: 12px;
    position: relative;
`;

const LineStyle = styled.div`
    display: flex;
    border: 2px solid #000;
    position: relative;
`;

const RangeWrap = styled.div`
    display: flex;
    flex-direction: column;
`;



export default Canvas;