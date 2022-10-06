import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from '../shared/Kakao_oauth'
import api from '../shared/apis'
import { setAccessToken, setRefreshToken } from '../shared/Cookie';
import { useMyContext } from '../shared/ContextApi'
import LoginErrorModal from '../components/login/LoginErrorModal'
import AnyModal from '../elem/AnyModal';

//이미지
import logo from '../images/logo.svg'
import speechBubble from '../images/frame.png'
import Listbanner from '../images/Com/Listbanner.svg';
import Listfooter from '../images/picboy-bg-footer-2 1.png';

//소리
import { error1PB } from '../global/sound';

const Login = () => {
  const myContext = useMyContext();
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState('');

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

  //일반 로그인버튼
  const onClickLogin = async (data) => {
    const info = {
      username: data.userId,
      password: data.password
    }
    const response = await api.post(`/user/login`, info)
    setAccessToken(response.headers.authorization);
    setRefreshToken(response.headers['refresh-token'])

    if (response.data.success) { window.location.href = '/' }
    else if(response.data.errorResponse.status === 500) {
      error1PB.play();
      myContext.btnClickOn();
    } else {
      error1PB.play();
      myContext.setDeclarPerson(true);
    }

  }


  return (
    <>
      <LoginContainer>
        <LogoContainer onClick={()=>navigate('/')}>
          <LogoImg src={logo} />
        </LogoContainer>
        <ImgBox src={Listbanner} />

      {myContext.btnOpen ? <ErrorBox onClick={()=>myContext.btnClickOff()}>
        <LoginErrorModal />
        </ErrorBox> : null}

        {myContext.DeclarPerson ? <ErrorBox onClick={()=>myContext.setDeclarPerson(false)}>
          <AnyModal content='신고된 유저입니다' />
        </ErrorBox> : null}
        
      <FormContainer >
        <InputBox>
          <form onSubmit={handleSubmit(onClickLogin)}>
            <Title style={{ fontSize: '50Titlex', fontWeight: '700' }}>LOGIN</Title>
            <InputBoxInner>
              <TextAndInput onFocus={(e) => setFocusedInput(e.target.name)} onBlur={() => setFocusedInput('')} focusedInput={focusedInput} >
                <SignupText>아이디</SignupText>
                <InputWithButton id='userId' name='id' placeholder='ID'
                  {...register('userId', {
                    required: true
                  })} />
              </TextAndInput>
              <Errorsmessage>{errors.userId?.type === 'required' && '아이디를 입력하세요'} </Errorsmessage>

              <TextAndInput2 style={{ marginTop: '20px' }} onFocus={(e) => setFocusedInput(e.target.name)} onBlur={() => setFocusedInput('')} focusedInput={focusedInput}>
                <SignupText>비밀번호</SignupText>
                <InputWithButton id='password' name='password' type='password' placeholder='PASSWORD' autoComplete='on'
                  {...register('password', {
                    required: true,
                    pattern: {
                      value:
                        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                      message:
                        '비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요. ',
                    }
                  })} />
              </TextAndInput2>
              <Errorsmessage>
                {errors.password?.type === 'required' && '비밀번호를 입력해주세요'}
                {errors.password?.type === 'pattern' && errors.password.message}
              </Errorsmessage>
            </InputBoxInner>

            {/* 로그인 버튼창 */}
            <LoginButton type='submit' disabled={isSubmitting}>로그인</LoginButton>
          </form>

            <LoginKaKaoButton>
              <a href={KAKAO_AUTH_URL}>
                <KakaoContainer>
                  <Kakaoimg src={speechBubble} />
                  <KakaoText>카카오 로그인</KakaoText>
                </KakaoContainer>
              </a>
            </LoginKaKaoButton>
          <SignMove onClick={() => { navigate('/join') }}>아직 회원이 아니신가요? <span style={{ fontWeight: 900 }}>회원가입</span ></SignMove>
          </InputBox>
          <Footerimg src={Listfooter} />
      </FormContainer>
      </LoginContainer>
    </>
  );
};


const ErrorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const LoginContainer = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;

`;
//로고
const LogoContainer = styled.div`
  position: absolute;
  margin-top: 46px;
  cursor: pointer;
`

const LogoImg = styled.img`
  width: 119px;
  height: 34px;
`
//배너
const ImgBox = styled.img`
  width: 100%;
  position: absolute;
  z-index: -100;
`;
const FormContainer = styled.div`
    max-width: 1200px;
    z-index: 99 ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 260px;
`
const InputBox = styled.div`
  width: 900px;
  /* height: 900px; */
  text-align: center;
`;

const InputBoxInner = styled.div`
`;
const Title = styled.div`
  margin-bottom: 82px;
  text-align: center;
  font-family: 'SilkBold';
  font-size: 65px;
  font-weight: 700;
`;

const TextAndInput = styled.div`
  width: 379px;
  margin-left: 255px;
  padding: 0.7rem;
  display: flex;
  border-bottom: 2px solid ${(props) => ('userId' === props.focusedInput) ? 'black' : 'lightgray'};
`
const TextAndInput2 = styled.div`
  width: 379px;
  margin-left: 255px;
  padding: 0.7rem;
  display: flex;
  border-bottom: 2px solid ${(props) => ('password' === props.focusedInput) ? 'black' : 'lightgray'};
  `

const SignupText = styled.div`
  width: 120px;
  font-size: 16px;
  font-weight: 900;
  text-align: left;
`;
const InputWithButton = styled.input`
  width: 320px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const SignMove = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
  color : ${(props) => props.theme.ShadeRegular};
  cursor: pointer;
  :hover {
    color: black;
  }
`;

const LoginButton = styled.button`
  width: 380px;
  height: 74px;
  margin-top: 70px;
  color : ${(props) => props.theme.SecondaryColor};
  font-family: 'NotoLight';
  font-weight: ${(props) => props.theme.Display};
  font-size: 18px;
  cursor: pointer;
  background-color: black;
`;

const LoginKaKaoButton = styled.div`
   width: 380px;
  height: 74px;
  margin-top: 16px;
  margin-left: 260px;
  color : ${(props) => props.theme.PrimaryColor};
  font-family: 'NotoLight';
  font-weight: ${(props) => props.theme.Display};
  font-size: 18px;
  cursor: pointer;
  background-color: #fee500;
`
const KakaoContainer = styled.div`
  display: flex;
  margin-left: 120px;
`

const Kakaoimg = styled.img`
  width: 28px;
  height: 25px;
  margin-top: 25px;
`;

const KakaoText = styled.div`
  margin-top: 25px;
  margin-left: 10px;
`

const Errorsmessage = styled.div`
  width: 300px;
  margin-top: 10px;
  margin-left: 360px;
  font-size: 16px;
  text-align: left;
  color: red;
`;
const Footerimg = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  bottom:0;
  z-index: -100;

 ${({ theme }) => theme.backgroundSet('cover')}
`;
export default Login;
