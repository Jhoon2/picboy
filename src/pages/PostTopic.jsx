import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';
// import component

// image import
import modeIc from '../images/pen.png';
import paint from '../images/paint.png';
import pen from '../images/pen.png';
import eraser from '../images/eraser.png';
import rectangle from '../images/rectangle.png';
import line from '../images/line.png';
import circle from '../images/circle.png';
import undo from '../images/undo.png';
import redo from '../images/redo.png';
import stroke from '../images/stroke.png';
import waterdrop from '../images/waterdrop.png';
import BgTop from '../images/complete-detail-bg-top.png';
import BgBottom from '../images/canvas-bottom-bg.png';

const PostTopic = () => {
    const [frame, setFrame] = useState(0);
    const [canvasDone, setCanvasDone] = useState();
    const accessToken = getCookieToken();
    const refreshToken = getRefreshToken();

    const frameCount = (e) => {
        const target = e.target;
        if (target.id === '6') {
            setFrame(6);
        } else if (target.id === '12') {
            setFrame(12);
        } else if (target.id === '18') {
            setFrame(18);
        } else if (target.id === '24') {
            setFrame(24);
        }
    };

    /////////////////////////////////
    // canvas
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
        canvas.width = 500;
        canvas.height = 500;
        setPencilState(true);
        setCtx(canvasRef.current.getContext('2d'));
    }, []);

    const draw = (e) => {
        const X = e.clientX - canvasRef.current.offsetLeft;
        const Y = e.clientY - canvasRef.current.offsetTop + window.scrollY;
        if (isPainting === true) {
            if (rectState === true) {
                // console.log('hi')
                ctx.strokeRect(X, Y, X - canvasRef.current.offsetLeft, Y - canvasRef.current.offsetTop
                );
            } else if (eraserState === true) {
                ctx.strokeStyle = 'white';
            }
            ctx.lineWidth = lineWeight.value;
            ctx.lineTo(X, Y);
            ctx.lineCap = 'round';
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(X, Y);
        }
    };
    // 사용자 마우스 움직임 감지
    const startPainting = () => {
        setIsPainting(true);
    };

    const cancelPainting = () => {
        setIsPainting(false);
        setRectState(false);
    };

    // 선 굵기 변경
    const onLineWidthChange = (e) => {
        setLineWeight((ctx.lineWidth = e.target.value));
    };

    // 선 투명도 변경
    const onLineOpacityChange = (e) => {
        setLineOpacity((ctx.globalAlpha = e.target.value));
    };

    // paint
    const paintHandler = (e) => {
        setPaintState(true);
        setPencilState(false);
        setRectState(false);
        setBrushState(false);
        setEraserState(false);

        ctx.fillRect(0, 0, 500, 500);
    };

    // pencil
    const pencilHandler = () => {
        setPencilState(true);
        setRectState(false);
        setBrushState(false);
        setPaintState(false);
        setEraserState(false);
        ctx.lineCap = 'round';
    };
    // brush
    const brushHandler = (e) => {
        setBrushState(true);
        setRectState(false);
        setPencilState(false);
        setPaintState(false);
        setEraserState(false);
        ctx.lineCap = 'round';
    };

    // eraser
    const eraseHandler = (e) => {
        setEraserState(true);
        setRectState(false);
        setPencilState(false);
        setBrushState(false);
        setPaintState(false);
    };

    // undo
    const undoHandler = (e) => { };

    // redo
    const redoHandler = (e) => { };

    // draw Rect
    const drawRect = () => {
        setRectState(true);
    };

    // color change
    const colorChange = (e) => {
        const colorValue = e.target.id;
        ctx.strokeStyle = colorValue;
        ctx.fillStyle = colorValue;
    };

    ///////////////////////////
    // ajax

    // const accessToken = localStorage.getItem("Authorization");
    // const refreshToken = localStorage.getItem("Refresh-Token");
    const baseURL = process.env.REACT_APP_API_KEY;

    // get
    // random topic
    const [topicState, setTopicState] = useState('');
    const [topicInputState, setTopicInputState] = useState('');
    const randomTopic = () => {
        const url = `${baseURL}/post/random-topic`;
        axios
            .get(url)
            .then(function (response) {
                const RandomTopicApi = response.data.data.topic;
                // console.log(RandomTopicApi);
                setTopicState(RandomTopicApi);
            })
            .catch(function (error) {
                console.log(error);
            });

        setTopicInputState('');
    };

    const topicInput = (e) => {
        setTopicInputState(e.target.value);
        // console.log(topicInputState);
    };

    // post
    const submitImg = () => {
        const canvas = canvasRef.current;
        const imgDataUrl = canvas.toDataURL('image/png');
        const topic = topicInputState || topicState;
        if (topic === '') {
            alert('제시어를 입력해 주세요');
            return;
        } else if (frame === 0) {
            alert('프레임 개수를 설정해 주세요');
            return;
        }
        axios
            .post(
                `${baseURL}/post`,
                {
                    topic: topic,
                    frameTotal: frame,
                    file: imgDataUrl,
                },
                {
                    headers: {
                        Authorization: accessToken,
                        'Refresh-Token': refreshToken,
                    },
                }
            )
            .then(function (response) {
                alert('그리기 완료!');
                window.location.replace('/list');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div style={{ position: 'relative' }}>
            <PostTitle>TOPIC</PostTitle>
            <PostContentsWrap>
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
                                        <Td>
                                            <IcButton onClick={drawRect}>
                                                <img src={rectangle} alt="rectangle" />
                                            </IcButton>

                                        </Td>
                                        <Td>
                                            <IcButton>
                                                <img src={circle} alt="circle" />
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
                                        <Td>
                                            <IcButton>
                                                <img src={line} alt="line" />
                                            </IcButton>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td>
                                            <IcButton
                                                onClick={undoHandler}
                                                disabled={undoState === 0}
                                            >
                                                <img src={undo} alt="undo" />
                                            </IcButton>
                                        </Td>
                                        <Td>
                                            <IcButton
                                                onClick={redoHandler}
                                                disabled={redoState === 0}
                                            >
                                                <img src={redo} alt="redo" />
                                            </IcButton>
                                        </Td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ToolBox>
                        {/* color */}
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
                                    <img
                                        src={waterdrop}
                                        alt="waterdrop"
                                        style={{ margin: '7px' }}
                                    />
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
                {/*  */}
                <ContetnsWrap>
                    {/* <Canvas setCanvasDone={setCanvasDone} /> */}
                    <ModeWrap>
                        <ModeTitleWrap>
                            <img src={modeIc} alt="" />
                            <ModeTitle>새 글 쓰기</ModeTitle>
                        </ModeTitleWrap>
                        <ModeFrameWrap>
                            <ModeFrameTitle>제시어</ModeFrameTitle>
                            <ModeFrameBtnWrap>
                                <RandomTopicInput
                                    onChange={topicInput}
                                    value={topicInputState || topicState}
                                    type="text"
                                    placeholder="12자 제한입니다"
                                    maxLength={12}
                                />
                                <ModeFrameBtn onClick={randomTopic}>랜덤선택</ModeFrameBtn>
                            </ModeFrameBtnWrap>
                            <ModeFrameTitle style={{ marginTop: '32px' }}>
                                프레임
                            </ModeFrameTitle>
                            <ModeFrameBtnWrap>
                                <ModeFrameBtn onClick={frameCount} id="6" style={frame === 6 ? { backgroundColor: 'black', color: 'white' } : {}}>6개</ModeFrameBtn>
                                <ModeFrameBtn onClick={frameCount} id="12" style={frame === 12 ? { backgroundColor: 'black', color: 'white' } : {}}>12개</ModeFrameBtn>
                                <ModeFrameBtn onClick={frameCount} id="18" style={frame === 18 ? { backgroundColor: 'black', color: 'white' } : {}}>18개</ModeFrameBtn>
                                <ModeFrameBtn onClick={frameCount} id="24" style={frame === 24 ? { backgroundColor: 'black', color: 'white' } : {}}>24개</ModeFrameBtn>
                            </ModeFrameBtnWrap>
                        </ModeFrameWrap>
                        <PostBtn onClick={submitImg}>추가하기</PostBtn>
                    </ModeWrap>
                </ContetnsWrap>
            </PostContentsWrap>
            <BgTopStyle src={BgTop} alt="" />
            <BgBottomStyle src={BgBottom} alt="" />
        </div >
    );
};

const BgTopStyle = styled.img`
  width: 100%;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: -100;
`;

const BgBottomStyle = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -100;
`;

const PostTitle = styled.div`
  font-family: 'SilkBold';
  font-size: 65px;
  letter-spacing: -0.04em;
  text-align: center;
  padding: 230px 0 40px 0;
`;

const PostContentsWrap = styled.div`
  width: 994px;
  margin: 0 auto;
  display: flex;
`;

const ContetnsWrap = styled.div`
  width: 994px;
  margin: 0 auto;
  margin-bottom: 160px;
  display: flex;
  justify-content: flex-start;
`;

const ModeWrap = styled.div`
  width: 380px;
  height: 500px;
  margin-left: 21px;
  padding: 32px;
  border: 2px solid #000;
  position: relative;
`;

const ModeTitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const ModeTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 4px 0 0 4px;
`;

const ModeFrameWrap = styled.div``;

const ModeFrameTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ModeFrameBtnWrap = styled.div`
  display: flex;
`;

const RandomTopicInput = styled.input`
  width: 190px;
  height: 30px;
  margin-top: 16px;
  border-bottom: 1px solid #000;
  margin-right: 16px;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

const ModeFrameBtn = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding: 12px 18px;
  border: 1px solid #000;
  margin-right: 8px;
  cursor: pointer;
`;

const PostBtn = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
  display: inline;
  padding: 13px 58px;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid #000;
  cursor: pointer;
`;

const canvasStyle = {
    width: '500px',
    height: '500px',
    border: '2px solid #000',
    backgroundColor: '#fff',
};

const CanvasWrap = styled.div`
  display: flex;
`;

const PaintOptionWrap = styled.div`
  margin-right: 16px;
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
  margin-bottom: 12px;
  border: 2px solid #000;
  border-collapse: collapse;
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
  background-color: ${(props) => props.color};
`;

const ToolBox = styled.div`
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

export default PostTopic;
