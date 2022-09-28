import React from 'react';
import styled from 'styled-components';
import Loadings from '../images/newloading.gif';

const Loading = () => {
  return (
    <div>
      <LoadingSpinner>
        <LoadingText><Text>now loading...</Text></LoadingText>
        <img style={{width:'130px',height:'130px',marginTop:'26px'}} src={Loadings} alt="로딩중" width="5%" />
      </LoadingSpinner>
    </div>
  );
};

export default Loading;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 800px;
  margin: 2rem auto;
  /* background: linear-gradient(
    360deg,
    #000000 -90.11%,
    rgba(103, 103, 103, 0) 30.83%
  ); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-family: 'SilkLight';
  font-size: 35px;
`

const LoadingText = styled.div`
  font: 1rem 'NotoBold';
  text-align: center;
`;
