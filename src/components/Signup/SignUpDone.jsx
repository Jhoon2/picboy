import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useMyContext } from '../../shared/ContextApi'

const SignUpDone = ({nickname}) => {
  // const myContext = useMyContext();
  const navigate = useNavigate();
  const loginButton = () => {
    navigate('/login')
  }
  const goHome = () => {
    navigate('/')
  }
return (
  <SignupDontContainer onClick={(e) => { e.stopPropagation(); }}>
    <div style={{textAlign:'center'}}>
      <SignupTitle>회원가입이<br />완료되었습니다!
      </SignupTitle>
      <SignupContent>
        반가워요. <BoldNickname>{nickname}</BoldNickname>님!<br />
        예측할 수 없는 즐거움을 만나보세요!
      </SignupContent>
      <div style={{ marginTop: '53px' }}>
        <SignupButton onClick={loginButton}><div style={{ marginTop: '13px' }}>로그인</div></SignupButton>
        <SignupButton1 onClick={goHome} style={{marginTop:'16px'}}><div style={{marginTop:'13px'}}>홈으로</div></SignupButton1>
      </div>
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
  margin-top: 171px;
  font-size:  ${(props) => props.theme.SubTitle};
  font-weight: ${(props) => props.theme.SubTitleBD};
  line-height: 36px;
`
const SignupContent = styled.div`
  margin-top: 16px;
  font-size:  ${(props) => props.theme.Caption2};
  font-weight: ${(props) => props.theme.CaptionRG};
  line-height: 25.2px;
`
const BoldNickname = styled.div`
  display: inline;
  font-size:  ${(props) => props.theme.Caption2};
  font-weight: ${(props) => props.theme.SubTitleBD};
`

const SignupButton = styled.div`
  width: 175px;
  height: 49px;
  margin-top: 43px;
  margin-left: 112px;
  font-size:  ${(props) => props.theme.Caption1};
  font-weight: ${(props) => props.theme.SubTitleBD};
  color: #FFFFFF;
  border: 1px solid #000000;
  background: #000000;
  cursor: pointer;

  :hover{
    color: #000000;
    background: #FFFFFF;
  }
`
const SignupButton1 = styled.div`
  width: 175px;
  height: 49px;
  margin-top: 43px;
  margin-left: 112px;
  font-size:  ${(props) => props.theme.Caption1};
  font-weight: ${(props) => props.theme.SubTitleBD};
  color: #000000;
  border: 1px solid #000000;
  background: #FFFFFF;
  cursor: pointer;

  :hover{
    color: #FFFFFF;
    background: #000000;
  }
`
export default SignUpDone