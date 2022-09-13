import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const ProceedingGif = () => {
  const [탭, 탭변경] = useState(0);
  return (
    <>
      <div>
        <LikeButton
          onClick={() => {
            탭변경(0);
          }}
        >
          1번
        </LikeButton>
        <LikeButton
          onClick={() => {
            탭변경(1);
          }}
        >
          2번
        </LikeButton>
        <LikeButton
          onClick={() => {
            탭변경(2);
          }}
        >
          3번
        </LikeButton>
      </div>
      <TabContent 탭={탭} />
    </>
  );
};

function TabContent({ 탭 }) {
  return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭];
}

export default ProceedingGif;

const Button = styled.button`
  width: 50px;
  height: 50px;
`;

const LikeButton = styled(Button)`
  width: 60px;
  height: 60px;
  margin-left: 60px;
  border-radius: 50px;
`;

const Contents = styled.div`
  width: 600px;
  height: 200px;
  background: gray;
`;
