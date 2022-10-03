import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';
import { useDispatch, useSelector } from 'react-redux';

// import component
import { useMyContext } from '../shared/ContextApi';
import AnyModal from '../elem/AnyModal';
import api from '../shared/apis';
import instance from '../shared/apis';
import Canvas from '../components/Canvas';

// image import
import modeIc from '../images/canvas/pen.png';
import BgTop from '../images/complete-detail-bg-top.png';
import BgBottom from '../images/canvas-bottom-bg.png';
import CanvasOptionArticle from '../images/canvas-option-top-article.png';
import { castDraft } from 'immer';

//소리
import { error1PB } from '../global/sound';

const PostTopic = () => {
  const canvas = useSelector((state) => state.canvas.imgUrl);

  const [frame, setFrame] = useState(0);
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
        setTopicState(RandomTopicApi);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTopicInputState('');
  };

  const topicInput = (e) => {
    setTopicInputState(e.target.value);
  };

  //광클릭 막기
  let clickCount = 0;

  // post
  const submitImg = () => {
    const topic = topicInputState || topicState;
    if (topic === '') {
      error1PB.play();
      myContext.setTopicBtn(true);
      return;
    } else if (frame === 0) {
      error1PB.play();
      myContext.setSettingFrameBtn(true);
      return;
    } else if (canvas === '' || undefined) {
      error1PB.play();
      myContext.setVacantCanvas(true);
      return;
    }
    // if (vacantState(canvas)) {
    //     error1PB.play();
    //     myContext.setVacantCanvas(true);
    //     return;
    // }
    if (clickCount !== 0) return;
    instance
      .post(`/post`, {
        topic: topic,
        frameTotal: frame,
        file: canvas,
      })
      .then(function (response) {
        myContext.setDrawingDoneBtn(true);
        ++clickCount;
        window.location.replace('/list');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancleNav = () => {
    window.location.replace('/CompList');
  };

  return (
    <>
      {myContext.topicBtn ? (
        <ErrorBox onClick={() => myContext.setTopicBtn(false)}>
          <AnyModal content="제시어를 입력해주세요" />
        </ErrorBox>
      ) : null}
      {myContext.setttingFrameBtn ? (
        <ErrorBox onClick={() => myContext.setSettingFrameBtn(false)}>
          <AnyModal content="프레임 개수를 설정해주세요" />
        </ErrorBox>
      ) : null}
      {myContext.drawingDoneBtn ? (
        <ErrorBox onClick={() => myContext.setDrawingDoneBtn(false)}>
          <AnyModal content="올리기가 완료되었습니다" />
        </ErrorBox>
      ) : null}
      {myContext.vacantCanvas ? (
        <ErrorBox onClick={() => myContext.setVacantCanvas(false)}>
          <AnyModal content="그림이 비어있습니다" />
        </ErrorBox>
      ) : null}

      <div style={{ position: 'relative' }}>
        <PostTitle>TOPIC</PostTitle>
        <PostContentsWrap>
          <Canvas />
          <ContetnsWrap>
            <div>
              <CanvasOptionArticleStyle src={CanvasOptionArticle} alt="" />
            </div>
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
                  <RandomTopicBtn onClick={randomTopic}>
                    랜덤선택
                  </RandomTopicBtn>
                </ModeFrameBtnWrap>
                <ModeFrameTitle style={{ marginTop: '32px' }}>
                  프레임
                </ModeFrameTitle>
                <ModeFrameBtnWrap>
                  <ModeFrameBtn
                    onClick={frameCount}
                    id="6"
                    style={
                      frame === 6
                        ? { backgroundColor: 'black', color: 'white' }
                        : {}
                    }
                  >
                    6개
                  </ModeFrameBtn>
                  <ModeFrameBtn
                    onClick={frameCount}
                    id="12"
                    style={
                      frame === 12
                        ? { backgroundColor: 'black', color: 'white' }
                        : {}
                    }
                  >
                    12개
                  </ModeFrameBtn>
                  <ModeFrameBtn
                    onClick={frameCount}
                    id="18"
                    style={
                      frame === 18
                        ? { backgroundColor: 'black', color: 'white' }
                        : {}
                    }
                  >
                    18개
                  </ModeFrameBtn>
                  <ModeFrameBtn
                    onClick={frameCount}
                    id="24"
                    style={
                      frame === 24
                        ? { backgroundColor: 'black', color: 'white' }
                        : {}
                    }
                  >
                    24개
                  </ModeFrameBtn>
                </ModeFrameBtnWrap>
              </ModeFrameWrap>
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
  font-size: 13px;
  font-weight: 400;
  padding: 10px 14px;
  border: 1px solid #000;
  margin-right: 0px;
  cursor: pointer;
  &:active {
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
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export default PostTopic;
