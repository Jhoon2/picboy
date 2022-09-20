import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
// import Header from '../components/Header';
import Footer from '../global/Footer';
import TopScroll from '../global/TopScroll';
import MainDesc from '../components/MainDesc';
import down from '../images/main/down.png';
import MP4 from '../sound/bridge.mp4';

//슬라이드 중앙에만 프로필 표시, 스무스 스크롤바

const Main = () => {
  // const ClickSound = new Audio(Sounds);
  const moveRef = useRef();
  const move2Ref = useRef();

  const handleMove = () => {
    moveRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlesMove = () => {
    move2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainContainer>
      <VideoContainer>
        <TopScroll />
        <Videos src={MP4} autoPlay muted loop></Videos>
        <VideoTitle>
          MAKE.<span>UNPREDIDICTABLE</span>
          <br />
          PLEASURE
        </VideoTitle>

        <How
          onClick={() => {
            // ClickSound.play();
            handleMove();
          }}
        >
          How to use?
        </How>
        <DownScroll
          onClick={() => {
            // ClickSound.play();
            handlesMove();
          }}
        />
      </VideoContainer>
      <MainDesc moveRef={moveRef} move2Ref={move2Ref} />
      <Footer />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  width: 100%;
  background: #161616;
`;

const Position = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const VideoContainer = styled.div`
  position: relative;
`;

const Videos = styled.video`
  min-width: 100%;
  display: block;
`;

const VideoTitle = styled.span`
  margin: auto;
  display: block;
  font-family: 'PopLight';
  line-height: 150%;
  font-size: 80px;
  color: white;
  ${Position}
  top: 40%;
  span {
    font-family: 'SilkLight';
    font-size: 90px;
    color: #0029ff;
  }
`;

const How = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid white;
  border-radius: 10px;
  font-family: 'SilkLight';
  font-size: 20px;
  color: white;
  background: none;
  ${Position}
  top: 46%;
  &:hover {
    background: black;
  }
  @media ${({ theme }) => theme.device.laptop} {
    top: 49%;
  }
`;

const DownScroll = styled.button`
  width: 60px;
  height: 30px;

  background: url(${down});
  ${({ theme }) => theme.backgroundSet('contain')};
  ${Position}
  top: 80%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;
  left: 50%;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    top: 90%;
    left: 48.6%;
  }
`;
