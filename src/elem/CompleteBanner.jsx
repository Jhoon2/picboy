import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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
    <ImgBox className={hide && 'hide'}>
      <span>COMPLETE</span>
      <SelectBox>
        <SelectButton
          onClick={() => {
            props.setProTap(0);
          }}
        >
          <Underline>ALL</Underline>
        </SelectButton>
        <SelectButton
          onClick={() => {
            props.setProTap(1);
          }}
        >
          <Underline>TOPIC</Underline>
        </SelectButton>
        <SelectButton
          onClick={() => {
            props.setProTap(2);
          }}
        >
          <Underline>FREE</Underline>
        </SelectButton>
      </SelectBox>
    </ImgBox>
  );
};

export default CompleteBanner;

const ImgBox = styled.div`
  width: 100%;
  height: 300px;
  ${({ theme }) => theme.flexSet('column', 'space-between', 'center')}
  text-align: center;
  background: #f4f4f4;
  border: 0.5px solid #a3a3a3;
  span {
    margin-top: 140px;
    font-family: 'SilkLight';
    font-size: 80px;
    line-height: 102px;
    font-weight: 400;
  }

  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-250px);
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

  font-family: 'NotoBold';
  font-size: 13px;
  line-height: 30px;
`;

const ListBox = styled.div``;

const Underline = styled.p`
  color: #2e3248;
  display: inline-block;
  position: relative;
  text-decoration: none;
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
