import React, { useState, useEffect, useRef } from 'react';
// import Canvas from '../components/Canvas';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { getCookieToken, getRefreshToken, setAccessToken } from '../shared/Cookie';
import { useNavigate, useParams } from 'react-router-dom';

// import component
import instance from '../shared/apis';
import { useMyContext } from '../shared/ContextApi';
import AnyModal from '../elem/AnyModal';
import api from '../shared/apis'
import vacantState from '../elem/vacantStateCanvas';

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
import CanvasArticle from '../images/canvas-top-article.png';
import CanvasOptionArticle from '../images/canvas-option-top-article.png';
import line6 from '../images/line6.png';
import line8 from '../images/line8.png';
import line10 from '../images/line10.png';
import line12 from '../images/line12.png';
import BgTop from '../images/complete-detail-bg-top.png';
import BgBottom from '../images/canvas-bottom-bg.png';
import Frame from '../images/canvas-frame.png';

//소리
import { error1PB, pop1PB } from '../global/sound';

const PostRelay = () => {
  const navigate = useNavigate();
  const myContext = useMyContext();
  const accessToken = getCookieToken();


  /////////////////////////////////
  // canvas
  // useRef를 이용해 canvas 엘리먼트에 접근
  const canvasRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isPainting, setIsPainting] = useState(false);
  const [lineWeight, setLineWeight] = useState(6);
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
      ctx.drawImage(image, 0, 0);
    }
  }, [ctx]);

  // const imgURL = canvas.toDataURL();
  // console.log(imgURL);

  const draw = (e) => {
    const X = Math.floor(e.clientX - canvasRef.current.offsetLeft);
    const Y = Math.floor(e.clientY - canvasRef.current.offsetTop + window.scrollY);
    if (isPainting === true) {
      if (rectState === true) {
        ctx.fillRect(pos[0], pos[1], X - pos[0], Y - pos[1]);
      } else if (circleState === true) {
        ctx.lineWidth = lineWeight;
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
    console.log(step);
    if (step < imgArr.length) {
      imgArr.length = step + 2
    }
    // else if (step > imgArr.length) {
    //     imgArr.length = step + 2
    // }
    const imgURL = canvas.toDataURL();
    setImgArr([...imgArr, imgURL]);
    console.log(imgArr);
  };

  const cancelPaintingLeave = () => {
    setIsPainting(false);
  };

  // 선 굵기 변경
  const lineWeightHandler = (e) => {
    if (e.target.id) {
      setLineWeight(ctx.lineWidth = e.target.id);
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
      console.log('hi');
      setStep(step - 1);
      console.log(step)
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
      console.log(step)
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


  ///////////////////////////
  // ajax


  const params = useParams();

  // get
  const [countFrame, setCountFrame] = useState('');
  const [lastImg, setLastImg] = useState('');

  useEffect(() => {
    Callaxios();
  }, []);

  const imgInfoUrl = `post/gif/images/detail/${params.id}`;

  useEffect(() => {
    Callaxios();
  }, [])

  const Callaxios = () => {
    api
      .get(imgInfoUrl)
      .then(function (response) {
        const imgData = response && response.data.data;
        setCountFrame(imgData);
        setLastImg(imgData.imgUrl);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //광클릭 막기
  const [clickCount, setClickCount] = useState(0)

  // post
  const submitImg = () => {
  //광클릭막기
  if(clickCount !== 0) return 
  setClickCount(prev => prev + 1)

  const canvas = canvasRef.current;

  //에러창
    const clickErrorUser = () => {
      error1PB.play();
      myContext.setPostTopicBtn(true)
    }
    const clickErrorVacant = () => {
      error1PB.play();
      myContext.setVacantCanvas(true)
    }
    const passSubmit = () => {
      pop1PB.play();
      myContext.setDrawingDoneBtn(true);
      window.location.href ='/list'
    }
    //로그인유저 없을 때 알림창
    if (!accessToken)
      return clickErrorUser();
    

    //캔버스 빈화면일 때 알림창
    if (vacantState(canvas)) return clickErrorVacant();
    const imgDataUrl = canvas.toDataURL('image/png');
    instance
      .post(
        `/post/relay/${params.id}`,
        {
          file: imgDataUrl,
        },

      )
      .then(function (response) {
        passSubmit();
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  ///////////////
  // toggle

  const [toggleBoolean, setToggleBoolean] = useState(false);

  const toggleHandler = () => {
    setToggleBoolean(!toggleBoolean);
  };

  const topicBoolean = useState(false);

  const cancleNav = () => {
    window.location.replace("/CompList");
  }


  return (
    <div>
      {myContext.drawingDoneBtn ? (
        <ErrorBox onClick={() => myContext.setDrawingDoneBtn(false)}>
          <AnyModal content="올리기가 완료되었습니다" />
        </ErrorBox>
      ) : null}
      {myContext.postTopicBtn ? (
        <ErrorBox onClick={() => myContext.setPostTopicBtn(false)}>
          <AnyModal title='안내' content="로그인 후 이용해주세요" />
        </ErrorBox>
      ) : null}
      {myContext.vacantCanvas ? (
        <ErrorBox onClick={() => myContext.setVacantCanvas(false)}>
          <AnyModal content="그림이 비어있습니다" />
        </ErrorBox>
      ) : null}
      {countFrame.topic === null ? (
        <PostTitle>FREE</PostTitle>
      ) : (
        <PostTitle>TOPIC</PostTitle>
      )}
      {/*  */}
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
                <div style={{ paddingRight: '-10px' }}>
                  <img src={stroke} alt="stroke" style={{ margin: '10px 0 4px 8px' }} />
                </div>
                <LineWeightCustomWrap>
                  <LineWeight src={line6} id="6" onClick={lineWeightHandler} style={LineWeightCount === '6' ? { filter: 'brightness(0%)' } : {}} alt='' />
                  <LineWeight src={line8} id="8" onClick={lineWeightHandler} style={LineWeightCount === '8' ? { filter: 'brightness(0%)' } : {}} alt='' />
                  <LineWeight src={line10} id="10" onClick={lineWeightHandler} style={LineWeightCount === '10' ? { filter: 'brightness(0%)' } : {}} alt='' />
                  <LineWeight src={line12} id="12" onClick={lineWeightHandler} style={LineWeightCount === '12' ? { filter: 'brightness(0%)' } : {}} alt='' />
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
          <CanvasWrap>
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
          <LastImgStyle
            src={countFrame.imgUrl}
            style={toggleBoolean ? { display: 'none' } : {}}
          />
        </CanvasWrap>
        {/*  */}

        <ContetnsWrap>
          {/* <Canvas setCanvasDone={setCanvasDone} /> */}
          <div><CanvasOptionArticleStyle src={CanvasOptionArticle} alt="" /></div>
          <ModeWrap>
            <ModeTitleWrap>
              <img src={modeIc} alt="" />
              <ModeTitle>진행중인 캔버스</ModeTitle>
            </ModeTitleWrap>
            <ModeFrameWrap style={{ marginBottom: '32px' }}>
              <ModeFrameTitle>제시어</ModeFrameTitle>
              {countFrame.topic === null ? (
                <ModeFrameArticle>
                  제시어가 없습니다. 자유롭게 그려보세요!
                </ModeFrameArticle>
              ) : (
                <ModeFrameArticle>{countFrame.topic}</ModeFrameArticle>
              )}
            </ModeFrameWrap>
            <ModeFrameWrap>
              <ModeFrameTitle>프레임</ModeFrameTitle>
              <ModeFrameArticle>
                {countFrame.frameTotal}번째 중 {countFrame.frameNum + 1}번째
              </ModeFrameArticle>
            </ModeFrameWrap>
            <ToggleWrap style={toggleBoolean ? { backgroundColor: '#000' } : {}}>
              <ToggleInput type="checkbox" onClick={toggleHandler} />
              <ToggleCheck style={toggleBoolean ? { left: '52%' } : {}} />
            </ToggleWrap>
            <span
              style={{ position: 'absolute', bottom: '110px', left: '94px', fontSize: '13px', fontWeight: '400', color: '#A3A3A3' }}
            >
              이전 프레임 안 보고 그릴래요
            </span>
            <PostBtnWrap>
              <PostBtn onClick={cancleNav}>취소하기</PostBtn>
              <PostBtn onClick={submitImg}>추가하기</PostBtn>
            </PostBtnWrap>
          </ModeWrap>
        </ContetnsWrap>
      </PostContentsWrap>
      <BgTopStyle src={BgTop} alt="" />
      <BgBottomStyle src={BgBottom} alt="" />
    </div>
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

const ToggleWrap = styled.label`
    width: 50px;
    height: 26px;
    margin-bottom: 26px;
    display: flex;
    position: relative;
    position: absolute;
    bottom: 80px;
    display: inline-block;
    background-color: #D9D9D9;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s;
`;

const ToggleInput = styled.input`
    opacity: 0;
`;

const ToggleCheck = styled.span`
    width: 22px;
    height: 22px;
    position: absolute;
    top: 8%;
    left: 5%;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
    &:after{
        background-color: red;
    }
`;

const PostTitle = styled.div`
  font-family: 'SilkLight';
  font-size: 80px;
  font-weight: 700;
  text-align: center;
  padding: 230px 0 40px 0;
`;

const LastImgStyle = styled.img`
  width: 500px;
  position: absolute;
  margin-top: 35px;
  margin-left: 103px;
  opacity: 0.1;
  pointer-events: none;
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
  flex-direction: column;
`;

const CanvasOptionArticleStyle = styled.img`
    margin-bottom: -9px;
`;


const ModeWrap = styled.div`
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
  margin-bottom: 40px;
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
  margin-bottom: 8px;
`;

const ModeFrameArticle = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const PostBtnWrap = styled.div`
    width: 291px;
    position: absolute;
    bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const PostBtn = styled.div`
width: 136px;
  display: inline;
  padding: 13px 0;
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

//

const CanvasArticleStyle = styled.img`
`;

const canvasStyle = {
  width: '500px',
  height: '500px',
  marginTop: '-9px',
  border: '2px solid #000',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  marginRight: '34px'
};

const CanvasWrap = styled.div`
  display: flex;
  /* margin-right: 34px; */
`;

const PaintOptionWrap = styled.div`
    margin-right: 34px;
`;

const LineWeightCustomWrap = styled.div`
    margin-left: 10px;
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
  margin-left: 8px;
  width: 102px;
  height: 8px;
  -webkit-appearance: none;
    background: #fff;
    border: 2px solid #000;
    accent-color: #000;
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
export default PostRelay;