import React, { useState, useEffect, useRef } from 'react';
// import Canvas from '../components/Canvas';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { getCookieToken, getRefreshToken, setAccessToken } from '../shared/Cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import component
import instance from '../shared/apis';
import { useMyContext } from '../shared/ContextApi';
import AnyModal from '../elem/AnyModal';
import api from '../shared/apis'
import vacantState from '../elem/vacantStateCanvas';
import Canvas from '../components/Canvas';

// image import
import modeIc from '../images/canvas/pen.png';
import CanvasOptionArticle from '../images/canvas-option-top-article.png';
import BgTop from '../images/complete-detail-bg-top.png';
import BgBottom from '../images/canvas-bottom-bg.png';

//소리
import { error1PB, pop1PB } from '../global/sound';

const PostRelay = () => {

  const canvas = useSelector((state) => state.canvas.imgUrl);

  const navigate = useNavigate();
  const myContext = useMyContext();
  const accessToken = getCookieToken();


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
    if (clickCount !== 0) return
    setClickCount(prev => prev + 1)

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
      window.location.href = '/list'
    }
    //로그인유저 없을 때 알림창
    if (!accessToken)
      return clickErrorUser();


    //캔버스 빈화면일 때 알림창
    if (vacantState(canvas)) return clickErrorVacant();
    instance
      .post(
        `/post/relay/${params.id}`,
        {
          file: canvas,
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

  const cancleNav = () => {
    window.location.replace("/CompList");
  }


  return (
    <div style={{ position: 'relative' }}>
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
        <Canvas />
        <LastImgStyle
          src={countFrame.imgUrl}
          style={toggleBoolean ? { display: 'none' } : {}}
        />
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

export default PostRelay;