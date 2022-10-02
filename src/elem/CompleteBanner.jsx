import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import back from '../images/Com/back.png';
import backscroll from '../images/Com/backscroll.png';
import { pop2PB } from '../global/sound';

const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const CompleteBanner = (props) => {
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () =>
      documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    <>
      <Back />
      <ImgBox className={hide && 'hide'}>
        <span>COMPLETE</span>
        <h3>
          여러 유저들의 이어 그리기로 완성된 움짤들을 감상해 보세요! <br />
          자유롭게 저장하고 소통해 보세요!
        </h3>
        <SelectBox>
          <SelectButton
            onClick={() => {
              props.setProTap(0);
              pop2PB.play();
            }}
          >
            <Underline color={'#868686'}>전체</Underline>
          </SelectButton>
          <SelectButton
            onClick={() => {
              props.setProTap(1);
              pop2PB.play();
            }}
          >
            <Underline color={'#868686'}>제시어</Underline>
          </SelectButton>
          <SelectButton
            onClick={() => {
              props.setProTap(2);
              pop2PB.play();
            }}
          >
            <Underline color={'#868686'}>자유</Underline>
          </SelectButton>
        </SelectBox>
      </ImgBox>
    </>
  );
};

export default CompleteBanner;

const Back = styled.div`
  width: 100%;
  height: 636px;
  background: url(${back});
  ${({ theme }) => theme.backgroundSet('cover')};
  position: fixed;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 400px;
  ${({ theme }) => theme.flexSet('column', 'space-between', 'center')}
  text-align: center;
  background: url(${backscroll});
  /* border: 1px solid black; */

  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-350px);
  }
  span {
    margin-top: 180px;
    font-family: 'SilkLight';
    font-style: normal;
    font-weight: 700;
    font-size: 65px;
  }
  h3 {
    font-family: 'NotoBold';
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.04em;
  }
`;

const SelectBox = styled.div`
  min-width: 1180px;
  height: 50px;
  ${({ theme }) => theme.flexSet('row', 'first-start', 'center')}
`;

const SelectButton = styled.button`
  width: 80px;
  height: 50px;
  background: none;

  font-family: 'Noto Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 180%;
  color: #a3a3a3;
`;

const Underline = styled.p`
  color: #a3a3a3;
  color: ${(props) => props.color};
  display: inline-block;
  position: relative;
  text-decoration: none;
  &:hover {
    color: black;
  }
  ::after {
    background: none repeat scroll 0 0 transparent;
    background: #2e3248;
    bottom: 0;
    content: '';
    display: block;
    height: 3px;
    left: 50%;
    position: absolute;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  :hover::after {
    left: 0;
    width: 100%;
  }
`;
