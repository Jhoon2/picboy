import React from 'react'
import styled from 'styled-components'
import { useMyContext } from '../../shared/ContextApi'

const SignupErrorModal = ({codeTrue}) => {
  const myContext = useMyContext();

  return (
    <ErrorContainer onClick={(e) => { e.stopPropagation(); }}>
      <div style={{textAlign:'center'}}>
        <ErrorContent>{!codeTrue ? '핸드폰 인증 해주세요': '중복확인 버튼을 눌러주세요' }</ErrorContent>
        <ErrorButton onClick={()=>myContext.btnClickOff()}><div style={{marginTop:'13px'}}>확인</div></ErrorButton>
      </div>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.div`
  min-width: 400px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  position: fixed;
  border: 2px solid black;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
  background-color: white;
`

const ErrorContent = styled.div`
  margin-top: 80px;
  font-size: 16px;
  font-weight: 400;
`
const ErrorButton = styled.div`
  width: 175px;
  height: 49px;
  margin-top: 43px;
  margin-left: 112px;
  font-size: 16px;
  color: #FFFFFF;
  border: 1px solid #000000;
  background: #000000;
  cursor: pointer;
`
export default SignupErrorModal

