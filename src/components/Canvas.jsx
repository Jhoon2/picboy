import React from 'react';
import styled, { css } from 'styled-components';
import { useEffect, useRef, useState, createContext } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { addImgUrl } from "../redux/modules/CanvasSlice";

// image import
import paint from '../images/canvas/paint.png';
import pen from '../images/canvas/pen.png';
import eraser from '../images/canvas/eraser.png';
import rectangle from '../images/canvas/rectangle.png';
import line from '../images/canvas/line.png';
import circle from '../images/canvas/circle.png';
import undo from '../images/canvas/undo.png';
import redo from '../images/canvas/redo.png';
import stroke from '../images/canvas/stroke.png';
import waterdrop from '../images/canvas/waterdrop.png';
import CanvasArticle from '../images/canvas/canvas-top-article.png';
import line6 from '../images/canvas/line6.png';
import line8 from '../images/canvas/line8.png';
import line10 from '../images/canvas/line10.png';
import line12 from '../images/canvas/line12.png';
import Frame from '../images/canvas/canvas-frame.png';
import RangeBg from '../images/canvas/range-bg.png';


const Canvas = () => {

    const dispatch = useDispatch();

    /////////////////////////////////
    // canvas
    // useRef를 이용해 canvas 엘리먼트에 접근
    const canvasRef = useRef(null);

    const [ctx, setCtx] = useState();
    const [isPainting, setIsPainting] = useState(false);
    const [lineOpacity, setLineOpacity] = useState(1);
    const [rectState, setRectState] = useState(false);
    const [circleState, setCircleState] = useState(false);
    const [pencilState, setPencilState] = useState(false);
    const [paintState, setPaintState] = useState(false);
    const [eraserState, setEraserState] = useState(false);
    const [lineState, setLineState] = useState(false);
    const [colorPreview, setColorPreview] = useState();
    const [LineWeightCount, setLineWeightCount] = useState('3');
    const [undoBoolean, setUndoBoolean] = useState(false);
    const [redoBoolean, setRedoBoolean] = useState(false);
    const [pos, setPos] = useState([]);
    const [imgArr, setImgArr] = useState([]);
    const [step, setStep] = useState(-1);
    const [imgUrl, setImgUrl] = useState();

    const canvas = canvasRef.current;

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 500;
        setPencilState(true);
        setCtx(canvasRef.current.getContext('2d'));
        setColorPreview('#000');
    }, []);

    useEffect(() => {
        const image = new Image();
        image.src = Frame;
        image.onload = function () {
            ctx?.drawImage(image, 0, 0);
        }
    }, [ctx]);

    const draw = (e) => {
        const X = Math.floor(e.clientX - canvasRef.current.offsetLeft);
        const Y = Math.floor(e.clientY - canvasRef.current.offsetTop + window.scrollY);
        if (isPainting === true) {
            if (rectState === true) {
                ctx.fillRect(pos[0], pos[1], X - pos[0], Y - pos[1]);
            } else if (circleState === true) {
                // x축, y축, 반지름, 시작각도, 마지막각도
                ctx.arc(pos[0], pos[1], 50, 0, Math.PI * 2);
                ctx.fill();
            } else if (lineState === true) {
                ctx.lineWidth = LineWeightCount;
                ctx.moveTo(pos[0], pos[1]);
                ctx.lineTo(X, Y);
                ctx.stroke()
            } else if (paintState === true) {
                ctx.fillRect(0, 0, 500, 500);
            } else {
                ctx.lineWidth = LineWeightCount;
                ctx.lineTo(X, Y);
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();
                if (eraserState === true) {
                    ctx.strokeStyle = '#fff';
                }
            }
        } else {
            ctx.beginPath();
            ctx.moveTo(X, Y);
        }
    };

    // 사용자 마우스 움직임 감지
    const startPainting = (e) => {
        setIsPainting(true);
        setPos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop + window.scrollY]);
    };

    //////////////////////////
    //////////////////////////
    // mouse up
    const cancelPainting = () => {
        setIsPainting(false);
        setStep(step + 1);
        if (step < imgArr.length) {
            imgArr.length = step + 2
        }
        const imgURL = canvas.toDataURL();
        setImgArr([...imgArr, imgURL]);
        setImgUrl(imgURL);
        console.log(imgUrl)
    };

    const cancelPaintingLeave = () => {
        setIsPainting(false);
        dispatch(addImgUrl(imgUrl));
    };

    // 선 굵기 변경
    const lineWeightHandler = (e) => {
        if (e.target.id) {
            setLineWeightCount(e.target.id);
        }
    }

    // 선 투명도 변경
    const onLineOpacityChange = (e) => {
        setLineOpacity(ctx.globalAlpha = e.target.value);
    };

    // paint
    const paintHandler = (e) => {
        setPaintState(true);
        setPencilState(false);
        setRectState(false);
        setEraserState(false);
        setCircleState(false);
        setLineState(false);
    };

    // pencil
    const pencilHandler = () => {
        setPencilState(true);
        setRectState(false);
        setPaintState(false);
        setEraserState(false);
        setCircleState(false);
        setLineState(false);
        ctx.strokeStyle = colorPreview;
        ctx.fillStyle = colorPreview;
    };

    // eraser
    const eraseHandler = (e) => {
        setEraserState(true);
        setRectState(false);
        setPencilState(false);
        setPaintState(false);
        setCircleState(false);
        setLineState(false);
    };

    //////////////////////////
    //////////////////////////
    // undo
    const undoHandler = (e) => {
        if (step > 0) {
            setUndoBoolean(true);
            setStep(step - 1);

            const undoImage = new Image();
            undoImage.src = imgArr[step];

            undoImage.onload = function () {
                ctx.drawImage(undoImage, 0, 0, 500, 500);
                setUndoBoolean(false);
            }
        }
    };

    // redo
    const redoHandler = (e) => {
        if (step < imgArr.length) {
            setRedoBoolean(true);
            setStep(step + 1);
            const redoImage = new Image();
            redoImage.src = imgArr[step];
            redoImage.onload = function () {
                ctx.drawImage(redoImage, 0, 0, 500, 500);
            }
            setRedoBoolean(false);
        }
    };

    // draw Rect
    const drawRect = () => {
        setRectState(true);
        setEraserState(false);
        setPencilState(false);
        setPaintState(false);
        setCircleState(false);
        setLineState(false);
    };

    // draw circle
    const drawCircle = () => {
        setCircleState(true);
        setRectState(false);
        setEraserState(false);
        setPencilState(false);
        setPaintState(false);
        setLineState(false);
    };

    // draw line
    const drawLine = () => {
        setLineState(true);
        setCircleState(false);
        setRectState(false);
        setEraserState(false);
        setPencilState(false);
        setPaintState(false);
    }

    // color change
    const colorChange = (e) => {
        const colorValue = e.target.id;
        ctx.strokeStyle = colorValue;
        ctx.fillStyle = colorValue;
        setColorPreview(e.target.id);
    };

    return (
        <>
            <CanvasWrap>
                <PaintOptionWrap>
                    <ToolBox>
                        <Table>
                            <tbody>
                                <tr>
                                    <Td style={paintState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={paintHandler}>
                                            <img
                                                src={paint}
                                                alt="paint"
                                                style={paintState ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                    <Td style={pencilState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={pencilHandler}>
                                            <img
                                                src={pen}
                                                alt="pen"
                                                style={pencilState ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                </tr>
                                <tr>
                                    {/*  */}
                                    <Td style={rectState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={drawRect}>
                                            <img
                                                src={rectangle}
                                                alt="rectangle"
                                                style={rectState ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>

                                    </Td>
                                    <Td style={circleState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={drawCircle}>
                                            <img
                                                src={circle}
                                                alt="circle"
                                                style={circleState ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                </tr>
                                <tr>
                                    <Td style={eraserState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={eraseHandler}>
                                            <img
                                                src={eraser}
                                                alt="eraser"
                                                style={eraserState ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                    <Td style={lineState ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={drawLine}>
                                            <img
                                                src={line}
                                                alt="line"
                                                style={lineState ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                </tr>
                                <tr>
                                    <Td style={undoBoolean ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={undoHandler}>
                                            <img
                                                src={undo}
                                                alt="undo"
                                                style={undoBoolean ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                    <Td style={redoBoolean ? { filter: 'invert(0%)', backgroundColor: '#000' } : {}}>
                                        <IcButton onClick={redoHandler} >
                                            <img
                                                src={redo}
                                                alt="redo"
                                                style={redoBoolean ? { filter: 'invert(100%)' } : {}}
                                            />
                                        </IcButton>
                                    </Td>
                                </tr>
                            </tbody>
                        </Table>
                    </ToolBox>
                    {/* color */}
                    <SelectedColorWrap>
                        <SelectedColor color={`${colorPreview}`} />
                    </SelectedColorWrap>
                    <Table>
                        <tbody>
                            <tr>
                                <Td>
                                    <ColorOption color={'#FF2222'} onClick={colorChange} id="#FF2222" />
                                </Td>
                                <Td>
                                    <ColorOption color={'#00A3FF'} onClick={colorChange} id="#00A3FF" />
                                </Td>
                            </tr>
                            <tr>
                                <Td>
                                    <ColorOption color={'#FF5C00'} onClick={colorChange} id="#FF5C00" />
                                </Td>
                                <Td>
                                    <ColorOption color={'#3139FF'} onClick={colorChange} id="#3139FF" />
                                </Td>
                            </tr>
                            <tr>
                                <Td>
                                    <ColorOption color={'#FFEB37'} onClick={colorChange} id="#FFEB37" />
                                </Td>
                                <Td>
                                    <ColorOption color={'#BD00FF'} onClick={colorChange} id="#BD00FF" />
                                </Td>
                            </tr>
                            <tr>
                                <Td>
                                    <ColorOption color={'#00EF43'} onClick={colorChange} id="#00EF43" />
                                </Td>
                                <Td>
                                    <ColorOption color={'#713D00'} onClick={colorChange} id="#713D00" />
                                </Td>
                            </tr>
                            <tr>
                                <Td>
                                    <ColorOption color={'#FFFFFF'} onClick={colorChange} id="#FFFFFF" />
                                </Td>
                                <Td>
                                    <ColorOption color={'#000000'} onClick={colorChange} id="#000000" />
                                </Td>
                            </tr>
                        </tbody>
                    </Table>
                    <LineStyle>
                        <RangeWrap>
                            <img src={stroke} alt="stroke" style={{ width: '24px', margin: '10px 0 10px 8px' }} />
                            <LineWeightCustomWrap>
                                <LineWeight src={line6} id="3" onClick={lineWeightHandler} style={LineWeightCount === '3' ? { filter: 'brightness(0%)' } : {}} alt='' />
                                <LineWeight src={line8} id="8" onClick={lineWeightHandler} style={LineWeightCount === '8' ? { filter: 'brightness(0%)' } : {}} alt='' />
                                <LineWeight src={line10} id="14" onClick={lineWeightHandler} style={LineWeightCount === '14' ? { filter: 'brightness(0%)' } : {}} alt='' />
                                <LineWeight src={line12} id="20" onClick={lineWeightHandler} style={LineWeightCount === '20' ? { filter: 'brightness(0%)' } : {}} alt='' />
                            </LineWeightCustomWrap>
                        </RangeWrap>
                        <RangeWrap>
                            <img
                                src={waterdrop}
                                alt="waterdrop"
                                style={{ width: '24px', margin: '10px 2px -1px 2px' }}
                            />
                            <LineOpacityCustomWrap>
                                <LineOpacityCustom
                                    id="line-opacity"
                                    type="range"
                                    min="0.2"
                                    max="1"
                                    step="0.2"
                                    value={lineOpacity}
                                    onChange={onLineOpacityChange}
                                />
                            </LineOpacityCustomWrap>
                        </RangeWrap>
                    </LineStyle>
                </PaintOptionWrap>
                <CanvasStyleWrap>
                    <div>
                        <CanvasArticleStyle src={CanvasArticle} alt="" />
                    </div>
                    <canvas
                        ref={canvasRef}
                        style={canvasStyle}
                        onMouseMove={draw}
                        onMouseDown={startPainting}
                        onMouseUp={cancelPainting}
                        onMouseLeave={cancelPaintingLeave}
                    />
                </CanvasStyleWrap>
            </CanvasWrap>
        </>
    )
}

const CanvasArticleStyle = styled.img`
`;

const CanvasStyleWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const canvasStyle = {
    width: '500px',
    height: '500px',
    marginTop: '-9px',
    border: '2px solid #000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
};

const CanvasWrap = styled.div`
  display: flex;
  margin-right: 34px;
`;

const PaintOptionWrap = styled.div`
    margin-right: 34px;
`;

const LineWeightCustomWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const LineWeight = styled.img`
    margin-bottom: 4px;
`;

const LineOpacityCustomWrap = styled.div`
  width: 10px;
  height: 63px;
  margin-left: -45px;
  margin-top: 52px;
`;

const LineOpacityCustom = styled.input`
  -webkit-appearance: none;
  transform: rotate(-90deg);
  margin-left: 8px;
  width: 102px;
  height: 8px;
    border: 2px solid #000;
    accent-color: #000;
    background-image: url(${RangeBg});
`;

const IcButton = styled.div`
  padding: 6px;
  margin-bottom: -6px;
`;

const Table = styled.table`
  margin-bottom: 10px;
  border: 2px solid #000;
  border-collapse: collapse;
  z-index: 999;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Td = styled.td`
  cursor: pointer;
  border: 2px solid #000;
  background-color: #fff;
`;

const SelectedColorWrap = styled.div`
    width: 70px;
    height: 40px;
    border: 2px solid #000;
    margin-bottom: 2px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SelectedColor = styled.div`
    width: 62px;
    height: 32px;
    margin: 2px 0 0 2px;
    background-color: ${(props) => props.color};
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  background-color: ${(props) => props.color};
`;

const ToolBox = styled.div`
  position: relative;
`;

const LineStyle = styled.div`
    height: 164px;
  display: flex;
  border: 2px solid #000;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 50%;
`;


export default Canvas;