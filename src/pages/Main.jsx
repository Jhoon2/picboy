import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Fade from 'react-reveal/Fade';
import TopScroll from '../global/TopScroll';
import MainDesc from '../components/MainDesc';
import mainarrow from '../images/main/mainarrow.svg';
import mainbackground from '../images/main/mainbackground.svg';
import thunder from '../images/main/thunder.svg';
import bubble from '../images/main/bubble.svg';
import icon1 from '../images/main/icon1.gif';
import icon2 from '../images/main/icon2.gif';
import icon3 from '../images/main/icon3.gif';
import icon4 from '../images/main/icon4.gif';
import icon5 from '../images/main/icon5.gif';
import icon6 from '../images/main/icon6.gif';
import icon7 from '../images/main/icon7.gif';
import { buttonPB } from '../global/sound';

const Main = () => {
  const moveRef = useRef();
  const move2Ref = useRef();

  const handlesMove = () => {
    move2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainContainer>
      <TopScroll />
      <Background />

      <Title>
        <Line1>
          <Icon1 />
          <span>ENJOY</span>
          <Titlebubble />
          <Icon2 />
        </Line1>
        <br />
        <Line2>
          <Icon3 />
          <Icon4 />
          <Icon5 />
          <p>DELIGHT</p>
          AND
          <span>HAPPINESS</span>
        </Line2>
        <Line3>
          <Icon6 />
          <span>WITH PICBOY!</span>
          <Icon7 />
        </Line3>
      </Title>

      <Thunder />
      <Start>PRESS START...</Start>
      <DownScroll
        onClick={() => {
          buttonPB.play();
          handlesMove();
        }}
      />

      <MainDesc moveRef={moveRef} move2Ref={move2Ref} />
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

const Background = styled.div`
  min-width: 100%;
  height: 100vh;
  background: url(${mainbackground});
  ${({ theme }) => theme.backgroundSet('cover')};
  display: block;
`;

const Title = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  font-family: 'PopBold';
  font-size: 90px;
  text-align: center;
  letter-spacing: 0.02em;
  color: white;
  ${Position}
  top: 50%;
  color: #a3a3a3;
`;

const Line1 = styled.div`
  margin-top: 90px;
  span {
    position: absolute;
    top: 13%;
    left: 26%;
  }
`;

const Icon1 = styled.div`
  width: 60px;
  height: 60px;
  background: url(${icon1});
  ${({ theme }) => theme.backgroundSet('contain')};
  position: absolute;
  left: 23.3%;
`;

const Icon2 = styled(Icon1)`
  width: 55px;
  height: 65px;
  background: url(${icon2});
  top: 16%;
  left: 71.5%;
`;
const Icon3 = styled(Icon1)`
  height: 66px;
  background: url(${icon3});
  top: 48%;
  left: 39.3%;
`;

const Icon4 = styled(Icon1)`
  height: 66px;
  background: url(${icon4});
  top: 48%;
  left: 42.3%;
`;

const Icon5 = styled(Icon1)`
  height: 65px;
  background: url(${icon5});
  top: 48%;
  left: 55.3%;
`;

const Icon6 = styled(Icon1)`
  width: 50px;
  height: 66px;
  background: url(${icon6});
  top: 16%;
  left: 29%;
`;

const Icon7 = styled(Icon1)`
  width: 69px;
  height: 65px;
  background: url(${icon7});
  top: 20%;
  left: 67%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1.25rem);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const Titlebubble = styled.div`
  width: 500px;
  height: 140px;
  background: url(${bubble});
  ${({ theme }) => theme.backgroundSet('contain')};
  position: absolute;
  top: 12%;
  left: 45%;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-name: anim;
  @keyframes anim {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(359deg);
    }
  }
`;

const Line2 = styled.div`
  p {
    position: absolute;
    left: 18%;
  }
  span {
    position: absolute;
    left: 56%;
    margin: 0 40px;
  }
`;

const Line3 = styled.div`
  margin-top: 40px;
  position: relative;
`;

const Start = styled.div`
  width: 170px;
  height: 35px;
  font-family: 'SilkLight';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
  ${Position}
  top: 92%;
  left: 47.5%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;
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
    left: 45%;
  }
`;

const Thunder = styled.div`
  width: 20px;
  height: 20px;
  background: url(${thunder});
  ${({ theme }) => theme.backgroundSet('contain')};
  ${Position}
  top: 88%;
  left: 51%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;
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
    left: 50.4%;
  }
`;

const DownScroll = styled.button`
  width: 60px;
  height: 30px;

  background: url(${mainarrow});
  ${({ theme }) => theme.backgroundSet('contain')};
  ${Position}
  top: 95%;
  left: 50%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;

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
    top: 95%;
    left: 48.6%;
  }
`;
