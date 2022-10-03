import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import topbutton from '../images/topbutton.svg';
import { upPB } from './sound';

//버튼 색상

const TopScroll = () => {
  const [scroll, setScroll] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleScroll = () => {
    setScroll(window.pageYOffset);
    if (scroll > 1000) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScroll(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {}, [scroll]);

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleScroll);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleScroll); // addEventListener 함수를 삭제
    };
  });
  return (
    <>
      {BtnStatus ? (
        <TopScrolls
          aria-label="top scroll"
          onClick={() => {
            handleTop();
            upPB.play();
          }}
        ></TopScrolls>
      ) : (
        <ScrollActive />
      )}
    </>
  );
};

export default TopScroll;

const Button = styled.button`
  width: 60px;
  height: 60px;
  position: absolute;
`;

const TopScrolls = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50px;
  opacity: 1;
  z-index: 1;
  background: url(${topbutton});
  ${({ theme }) => theme.backgroundSet('contain')};
  font-family: 'Neo';
  font-size: 20px;
  color: white;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce3;
  animation-timing-function: linear;
  @keyframes bounce3 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const ScrollActive = styled(TopScrolls)`
  opacity: 0;
`;

// ${TopScroll}:hover,:focus,:active {
//   outline: 0 none;
// }
