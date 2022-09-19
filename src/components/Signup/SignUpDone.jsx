import React from 'react'
import styled from 'styled-components'
import { useMyContext } from '../../shared/ContextApi'

const SignUpDone = () => {
  const myContext = useMyContext();

return (
  <SignupDontContainer onClick={(e) => { e.stopPropagation(); }}>
    <div style={{textAlign:'center'}}>
      <SignupTitle>회원가입이<br />완료되었습니다!
      </SignupTitle>
      <SignupContent>
        반가워요. 닉네임님!<br />
        예측할 수 없는 즐거움을 만나보세요!
      </SignupContent>
      <SignupButton onClick={() => myContext.btnClickOff()}><div style={{ marginTop: '13px' }}>로그인</div></SignupButton>
      <SignupButton onClick={()=>myContext.btnClickOff()}><div style={{marginTop:'13px'}}>홈으로</div></SignupButton>
    </div>
  </SignupDontContainer>
)
}

const SignupDontContainer = styled.div`
min-width: 374px;
min-height: 534px;
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

const SignupTitle = styled.div`
margin-top: 80px;
font-size: 16px;
font-weight: 400;
`
const SignupContent = styled.div`

`
const SignupButton = styled.div`
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
export default SignUpDone