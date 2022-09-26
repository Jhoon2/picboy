import React from 'react';
import styled from 'styled-components';
import Loadings from '../images/Loading.gif';

const Loading = () => {
  return (
    <div>
      <LoadingSpinner>
        <LoadingText>로딩중</LoadingText>
        <img src={Loadings} alt="로딩중" width="5%" />
      </LoadingSpinner>
    </div>
  );
};

export default Loading;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 800px;
  margin: 2rem auto;
  background: linear-gradient(
    360deg,
    #000000 -90.11%,
    rgba(103, 103, 103, 0) 30.83%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem 'NotoBold';
  text-align: center;
`;
