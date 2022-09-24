import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';

// import component
import { useMyContext } from '../shared/ContextApi';
import AnyModal from '../elem/AnyModal';
import  api  from '../shared/apis';
import instance from '../shared/apis';

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
import CanvasArticle from '../images/canvas-top-article.png';
import CanvasOptionArticle from '../images/canvas-option-top-article.png';
import line6 from '../images/line6.png';
import line8 from '../images/line8.png';
import line10 from '../images/line10.png';
import line12 from '../images/line12.png';

const PostTopic = () => {
    const [frame, setFrame] = useState(0);
    const [canvasDone, setCanvasDone] = useState();
    const accessToken = getCookieToken();
    const refreshToken = getRefreshToken();
    const myContext = useMyContext();

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
    const [lineWeight, setLineWeight] = useState(6);
    const [lineOpacity, setLineOpacity] = useState(1);
    const [rectState, setRectState] = useState(false);
    const [pencilState, setPencilState] = useState(false);
    const [paintState, setPaintState] = useState(false);
    const [eraserState, setEraserState] = useState(false);
    const [colorPreview, setColorPreview] = useState();
    const [undoState, setUndoState] = useState(0);
    const [redoState, setRedoState] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 500;
        setPencilState(true);
        setCtx(canvasRef.current.getContext('2d'));
        setColorPreview('#000');
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
            ctx.lineWidth = lineWeight;
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
    const lineWeightHandler = (e) => {
        console.log(e.target.id);
        if (e.target.id) {
            setLineWeight(ctx.lineWidth = e.target.id);
        }
    }

    // 선 투명도 변경
    const onLineOpacityChange = (e) => {
        setLineOpacity((ctx.globalAlpha = e.target.value));
    };

    // paint
    const paintHandler = (e) => {
        setPaintState(true);
        setPencilState(false);
        setRectState(false);
        setEraserState(false);
        ctx.fillRect(0, 0, 500, 500);
    };

    // pencil
    const pencilHandler = () => {
        setPencilState(true);
        setRectState(false);
        setPaintState(false);
        setEraserState(false);
    };

    // eraser
    const eraseHandler = (e) => {
        setEraserState(true);
        setRectState(false);
        setPencilState(false);
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
        setColorPreview(e.target.id);
    };

    ///////////////////////////
    // ajax


    // get
    // random topic
    const [topicState, setTopicState] = useState('');
    const [topicInputState, setTopicInputState] = useState('');

    const randomTopic = () => {
        const url = `/post/random-topic`;
        api
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
            myContext.setTopicBtn(true)
            // alert('제시어를 입력해 주세요');
            return;
        } else if (frame === 0) {
            myContext.setSettingFrameBtn(true)
            return;
        }
        instance
            .post(
                `/post`,
                {
                    topic: topic,
                    frameTotal: frame,
                    file: imgDataUrl,
                },
            )
            .then(function (response) {
                console.log(response)
                myContext.setDrawingDoneBtn(true)
                window.location.replace('/list');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
        {myContext.topicBtn ? (
        <ErrorBox onClick={() => myContext.setTopicBtn(false)}>
          <AnyModal  content="제시어를 입력해주세요" />
          </ErrorBox>
      ) : null}
        {myContext.setttingFrameBtn ? (
        <ErrorBox onClick={() => myContext.setSettingFrameBtn(false)}>
          <AnyModal  content="프레임 개수를 설정해주세요" />
          </ErrorBox>
      ) : null}
      {myContext.drawingDoneBtn ? (
        <ErrorBox onClick={() => myContext.setDrawingDoneBtn(false)}>
          <AnyModal  content="올리기가 완료되었습니다" />
          </ErrorBox>
      ) : null}
  
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
                                <div>
                                    <img src={stroke} alt="stroke" style={{ margin: '10px 0 4px 8px' }} />
                                </div>
                                <LineWeightCustomWrap>
                                    {/* <LineWeightCustom onClick={lineWeightHandler}>
                                        <LineWeight size={'6px'} id="6" />
                                    </LineWeightCustom>
                                    <LineWeightCustom onClick={lineWeightHandler}>
                                        <LineWeight size={'8px'} id="8" />
                                    </LineWeightCustom>
                                    <LineWeightCustom onClick={lineWeightHandler}>
                                        <LineWeight size={'10px'} id="10" />
                                    </LineWeightCustom>
                                    <LineWeightCustom onClick={lineWeightHandler}>
                                        <LineWeight size={'12px'} id="12" />
                                    </LineWeightCustom> */}
                                    <LineWeight src={line6} id="6" onClick={lineWeightHandler} alt='' />
                                    <LineWeight src={line8} id="8" onClick={lineWeightHandler} alt='' />
                                    <LineWeight src={line10} id="10" onClick={lineWeightHandler} alt='' />
                                    <LineWeight src={line12} id="12" onClick={lineWeightHandler} alt='' />
                                </LineWeightCustomWrap>
                            </RangeWrap>
                            <RangeWrap>
                                <div>
                                    <img
                                        src={waterdrop}
                                        alt="waterdrop"
                                        style={{ margin: '10px 2px 4px 0px' }}
                                    />
                                </div>
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
                    <div>
                        <CanvasArticleStyle src={CanvasArticle} alt="" />
                        <canvas
                            ref={canvasRef}
                            style={canvasStyle}
                            onMouseMove={draw}
                            onMouseDown={startPainting}
                            onMouseUp={cancelPainting}
                            onMouseLeave={cancelPainting}
                        />
                    </div>
                </CanvasWrap>
                <ContetnsWrap>
                    {/* <Canvas setCanvasDone={setCanvasDone} /> */}
                    <div><CanvasOptionArticleStyle src={CanvasOptionArticle} alt="" /></div>
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
                                <RandomTopicBtn onClick={randomTopic}>랜덤선택</RandomTopicBtn>
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
            </>
    );
};
const ErrorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

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
  justify-content: space-between;
`;

const ContetnsWrap = styled.div`
  width: 994px;
  margin: 0 auto;
  margin-bottom: 160px;
  display: flex;
  flex-direction: column;
`;

const CanvasOptionArticleStyle = styled.img`
    margin-bottom: -9px;
`;

const ModeWrap = styled.div`
  width: 359px;
  height: 500px;
  padding: 32px;
  border: 2px solid #000;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ModeTitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 38px;
`;

const ModeTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin: 4px 0 0 4px;
`;

const ModeFrameWrap = styled.div``;

const ModeFrameTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const ModeFrameBtnWrap = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

const RandomTopicBtn = styled.div`
    font-size: 14px;
  font-weight: 400;
  padding: 10px 14px;
  border: 1px solid #000;
  margin-right: 0px;
  cursor: pointer;
  &:active{
    background-color: #000;
    color: #fff;
  }

`;

const RandomTopicInput = styled.input`
  width: 194px;
  height: 30px;
  margin-top: 8px;
  border-bottom: 1px solid #000;
  margin-right: 12px;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  font-size: 14px;

  &:focus {
    outline: 0;
  }
`;

const ModeFrameBtn = styled.div`
  width: 64px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  padding: 10px 0;
  border: 1px solid #000;
  margin-right: 0px;
  cursor: pointer;
`;

const PostBtn = styled.div`
    width: 291px;
  position: absolute;
  bottom: 32px;
  display: inline;
  padding: 13px 58px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  border: 2px solid #000;
  cursor: pointer;
  &:hover{
      background-color: #000;
      color: #fff;
  }
`;

const CanvasArticleStyle = styled.img`
`;

const canvasStyle = {
    width: '500px',
    height: '500px',
    marginTop: '-9px',
    border: '2px solid #000',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
};

const CanvasWrap = styled.div`
  display: flex;
  margin-right: 34px;
`;

const PaintOptionWrap = styled.div`
    margin-right: 34px;
`;

const LineWeightCustomWrap = styled.div`
    margin-left: 10px;
`;

const LineWeightCustom = styled.div`
    width: 20px;
    height: 20px;
    margin-bottom: 8px;
    border-radius: 50%;
    border: 1px solid ${(props) => props.size};;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fff;
`;

const LineWeight = styled.img`
    margin-bottom: 2px;
`;

const LineOpacityCustomWrap = styled.div`
    width: 10px;
  height: 63px;
  margin-left: -45px;
  margin-top: 52px;
`;

const LineOpacityCustom = styled.input`
  transform: rotate(-90deg);
  margin-left: -10px;
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
  display: flex;
  border: 2px solid #000;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const RangeWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostTopic;
