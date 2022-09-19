import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
// import kakaoButton from '../images/kakao_login_medium_wide.png'
import axios from "axios"
import { setAccessToken, setRefreshToken } from '../shared/Cookie';
import { useMyContext } from '../shared/ContextApi'
import LoginErrorModal from '../components/login/LoginErrorModal'
import {KAKAO_AUTH_URL} from '../shared/Kakao_oauth'
import kakaoImg from '../images/kakao_login_medium.png'
const { Kakao } = window;

const Login = () => {
  const baseURL = process.env.REACT_APP_API_KEY;
  const myContext = useMyContext();
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState('')

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  
  //카카오 로그인버튼
  const loginWithKakao = () => {
    // console.log('hello');
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:8080/user/kakao',
    });
  };
  
  
  //일반 로그인버튼
  const onClickLogin = async (data) => {
    const info = {
      username: data.userId,
      password: data.password
    }
    const response = await axios.post(`${baseURL}/user/login`, info)
    try {
      console.log(response)
      // 헤더로 받는 것으로 추후 수정 예정
      setAccessToken(response.headers.authorization);
      setRefreshToken(response.headers['refresh-token'])
      // 바디로 받는 값
      // setAccessToken(response.data.data.authorization);
      // setRefreshToken(response.data.data.refreshToken)
      if (response.status === 200) {window.location.href = '/';}
    } catch (error) {
      //에러메시지 모달창
      if (response.data.errorResponse.status === 400) {
        myContext.btnClickOn();
     }
    }

  }



  return (
    <>
      <LoginContainer>
      {myContext.btnOpen ? <ErrorBox onClick={()=>myContext.btnClickOff()}>
        <LoginErrorModal />
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

          {/* <KakaoButton onClick={() => { navigate('/') }}>카카오 소셜 로그인</KakaoButton> */}
            <a onClick={loginWithKakao}>
              <KakaoButton src={kakaoImg} />
            </a>
          <SignMove onClick={() => { navigate('/join') }}>아직 회원이 아니신가요? <span style={{ fontWeight: 900 }}>회원가입</span ></SignMove>
        </InputBox>
      </FormContainer>
      </LoginContainer>

    </>
  )
}
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
  z-index: 2;
`
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
`
const FormContainer = styled.div`
    max-width: 1200px;
    height: 50vh;
    margin-top: 160px;

`
const InputBox = styled.div`
    width: 900px;
    height: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const InputBoxInner = styled.div`

`
const Title = styled.div`
    margin-bottom: 82px;
    text-align: center;
    font-family: 'SilkBold';
    font-size: 80px;
    font-weight: 700;
`

const TextAndInput = styled.div`
  width: 585px;
  margin-left: 160px;
  padding: 0.7rem;
  display: flex;
  border-bottom: 2px solid ${(props) => ('userId' === props.focusedInput) ? 'black' : 'lightgray'};
`
const TextAndInput2 = styled.div`
  width: 585px;
  margin-left: 160px;
  padding: 0.7rem;
  display: flex;
  border-bottom: 2px solid ${(props) => ('password' === props.focusedInput) ? 'black' : 'lightgray'};
  `

const SignupText = styled.div`
  width: 120px;
  font-size: 16px;
  font-weight: 900;
  text-align: left;
`
const InputWithButton = styled.input`
  width: 320px;
  font-size: 16px;
  border : none;
  outline: none;
  background-color: transparent;
`

const SignMove = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin-top: 30px;
  cursor: pointer;
  :hover {
    color: blue;
  }
`;

const LoginButton = styled.button`
  width: 585px;
  height: 90px;
  margin-top: 80px;
  color: white;
  font-family: 'NotoLight';
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  background-color: black;
`

const KakaoButton = styled.img`
  width: 585px;
  height: 90px;
  margin-top: 32px;
  margin-left: 155px;
  border: none;
  border-radius: 5px;
  color:#000000 85%;
  font-family: 'NotoLight';
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  background-color: #FEE500;
`

const Errorsmessage = styled.div`
  width: 300px;
  margin-top: 10px;
  margin-left: 290px;
  font-size: 16px;
  text-align: left;
  color: red;
`;
export default Login

