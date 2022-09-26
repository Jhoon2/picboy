import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

//불러오기
import { useMyContext } from '../shared/ContextApi';
import SignupErrorModal from '../components/Signup/SignupErrorModal';
import UseTimer from '../elem/UseTimer';
import SignUpDone from '../components/Signup/SignUpDone';
import api from '../shared/apis'

//이미지
import Listbanner from '../images/Com/Listbanner.svg';

const SignUp = () => {
  const myContext = useMyContext();

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [focusedInput, setFocusedInput] = useState('')

  //유효성검사
  const schema = yup.object().shape({
    id: yup
      .string()
      .min(3, '3글자 이상 입력해주세요!')
      .max(10, '10글자 이하로 입력해주세요!')
      .matches(
        /^[a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        'ID에 특수문자가 포함되면 안되고 영어로 시작해야합니다'
      )
      .required('아이디를 입력해주세요'),

    pw: yup
      .string()
      .max(16, '비밀번호는 최대 16자리입니다!')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
        '알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요'
      )
      .required('비밀번호를 입력해주세요'),
    checkPw: yup
      .string()
      .oneOf([yup.ref('pw'), null], '비밀번호가 일치하지 않습니다')
      .required('비밀번호를 한번 더 입력해주세요'),

    // phone_number: yup.number()
    // .required('핸드폰 인증을 해주세요.'),

    phone_valid_number: yup.string().required('핸드폰 인증을 해주세요'),

    nickname: yup
      .string()
      .min(3, '닉네임은 최소 3글자 이상입니다!')
      .max(10, '닉네임은 최대 10글자입니다!')
      .required('닉네임을 입력해주세요'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  //ID중복확인
  const [existedId, setExistedId] = useState(false);
  const [availableId, setAvailableId] = useState(false);

  const checkSameId = async () => {
    const id = watch().id;
    if (id.length < 3 || id.length > 10) return;

    try {
      const response = await api.get(`/user/id-double-check/${id}`);
      if (!response.data.success) {
        setExistedId(true);
      } else {
        setAvailableId(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  ////////////////////////
  //ID input창 빈값
  const [any, setAny] = useState(0)
  const IDinputVacant = (e) => {
    // console.log(e)

    setFocusedInput(e.target.name)
    setExistedId(false);
    // setAvailableId(false);
    setPhoneValid(false)
    setCodeError(false)
    // setCodeTrue(false)
  };

  // NickName 중복확인
  const [existedNick, setExistedNick] = useState(false);
  const [availableNick, setAvailableNick] = useState(false);
  
  const checkSameNick = async () => {
    const nickname = watch().nickname;
    if (nickname.length < 2 || nickname.length > 10) return;

    try {
      const response = await api.get(
        `/user/nickname-double-check/${nickname}`
      );
      if (!response.data.success) {
        setExistedNick(true);
      } else {
        setAvailableNick(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Nickname input창 빈값
  const NickInputVacant = () => {
    setExistedNick(false);
    setAvailableNick(false);
  };

  // 핸드폰 번호 중간 - 넣기
  const numberAddHyphen = (e) => {
    const regax = /^[0-9\b -]{0,13}$/;
    if (regax.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  useEffect(() => {
    myContext.signUpBtnClickOff();
    if (inputValue.length === 10) {
      setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (inputValue.length === 13) {
      setInputValue(
        inputValue
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      );
    }
  }, [inputValue]);

  //핸드폰 코드 전송 버튼
  const [phoneValid, setPhoneValid] = useState(false);
  const [noSendPhone, setNoSendPhone] = useState(false);
  //핸드폰 인증버튼
  const [codeTrue, setCodeTrue] = useState(false)
  const [codeError, setCodeError] = useState(false)

  //핸드폰 유효시간
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);

  const phoneCheck = async () => {
    if(inputValue.length <= 9) return
    setCodeTrue(false)

    setNoSendPhone(true)
    const info = {
      phoneNum: inputValue
    }
    try {
      const response = await api.post(`/user/phonenumber-send`,info);
    } catch (error) {
      console.log(error);
    }
    setPhoneValid(false);
    myContext.setTimerMessage(true);

    setTimeout(() => {
      myContext.setTimerMessage(false);
      if (!codeTrue) { setPhoneValid(true) }
      setNoSendPhone(false)
    }, 180000);
    
  };



  const validatePhone = async () => {
    //핸드폰 인증번호 감지
    const phone_valid_number = watch().phone_valid_number;
    // console.log(phone_valid_number)

    const info = {
      phoneNum: inputValue,
      numStr: phone_valid_number
    }
    console.log(info)
    try {
      const response = await api.post(`/user/code-send`, info);
      console.log(response)
      if (response.data.success) {
        setPhoneValid(false);
        setCodeTrue(true)
        myContext.setTimerMessage(false);
        // setMinutes(0);
        // setSeconds(0);
        setNoSendPhone(false)

      } else {
        setCodeError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //회원가입 버튼
  const [openSignupDone, setOpenSignupDone] = useState(false)
  const [myNickname, setMyNickname] = useState()

  const onClickSignUp = async (data) => {
    if (!codeTrue) return myContext.btnClickOn();
    if (!availableId) return myContext.btnClickOn();
    if (!availableNick) return myContext.btnClickOn();
    setMyNickname(data.nickname)
    const info = {
      username: data.id,
      nickname: data.nickname,
      password: data.pw,
      phoneNumber: inputValue,
    };
    console.log(info)
    try {
      const response = await api.post(`/user/signup`, info);
      if (response.status === 200) {
        // reset();
        ////
        //회원가입 완료 창 만들기
        myContext.signUpBtnClickOn();
        // setOpenSignupDone(true)
        // navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ImgBox src={Listbanner} />
    <LoginContainer>

      {myContext.signUpBtn ? <ErrorBox>
        <SignUpDone nickname={myNickname} />
      </ErrorBox> : null}
      {myContext.btnOpen ? (
        <ErrorBox onClick={() => myContext.btnClickOff()}>
          <SignupErrorModal codeTrue={codeTrue} />
        </ErrorBox>
      ) : null}
      <FormContainer>
        <form onSubmit={handleSubmit(onClickSignUp)}>
          <InputBox>
            <Title>JOIN</Title>
            <InputBoxInner>
              <InputFlex>
                <TextAndInput onFocus={IDinputVacant} focusedInput ={focusedInput}>
                  <SignupText>아이디</SignupText>
                  <InputWithButton
                    id="userId"
                    name="id"
                    placeholder="ID를 입력해주세요"
                    {...register('id')}
                  />
                </TextAndInput>
                <CheckButton
                  type="button"
                  id="checkId"
                  name="checkId"
                  onClick={checkSameId}
                >
                  중복확인
                </CheckButton>
              </InputFlex>
              <Errorsmessage>{errors.id?.message} </Errorsmessage>
              <Errorsmessage>{existedId && '중복 아이디입니다'} </Errorsmessage>
              <NoErrorsmessage>
                {availableId && '사용 가능한 아이디입니다'}{' '}
              </NoErrorsmessage>

              <InputFlex>
                <NoButtonInput onFocus={IDinputVacant} focusedInput ={focusedInput}>
                  <SignupText>비밀번호</SignupText>
                  <OnlyInput
                    id="password"
                    name="pw"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    autoComplete="off"
                    {...register('pw', {
                      required: true,
                    })}
                  />
                </NoButtonInput>
              </InputFlex>
              <Errorsmessage>{errors.pw?.message}</Errorsmessage>

              <InputFlex>
                <NoButtonInput onFocus={IDinputVacant} focusedInput ={focusedInput}>
                  <SignupText>비밀번호 확인</SignupText>
                  <OnlyInput
                    id="checkPsasword"
                    name="checkPw"
                    autoComplete="off"
                    type="password"
                    placeholder="비밀번호를 확인해주세요"
                    {...register('checkPw', {
                      required: true,
                    })}
                  />
                </NoButtonInput>
              </InputFlex>
              <Errorsmessage>{errors.checkPw?.message}</Errorsmessage>

              <InputFlex>
                <TextAndInput>
                  <SignupText>휴대폰</SignupText>
                  <InputWithButton
                    id="phone_number"
                    name="phone_number"
                    placeholder="핸드폰번호를 입력해주세요"
                    type="text"
                    value={inputValue}
                    onChange={numberAddHyphen}
                    onFocus={IDinputVacant}
                  />
                </TextAndInput>
                <CheckButton type="button" disabled={noSendPhone? true:false} onClick={phoneCheck}>
                  코드전송
                </CheckButton>
              </InputFlex>

              <InputFlex>
                <PhoneTextAndInput>
                  <div style={{ display: 'flex' }}>
                    <SignupText>휴대폰 인증</SignupText>
                    <InputWithButton
                      id="phone_valid_number"
                      name="phone_valid_number"
                      placeholder="인증번호를 입력해주세요"
                      // onChange={checkValidatePhone}
                      onFocus={IDinputVacant}
                      {...register('phone_valid_number', {
                        required: true,
                      })}
                    />
                  </div>
                  <div style={{ color: 'red' }}>
                    {myContext.timerMessage ? (
                      <UseTimer
                        minutes={minutes}
                        setMinutes={setMinutes}
                        seconds={seconds}
                        setSeconds={setSeconds}
                      />
                    ) : null}
                  </div>
                </PhoneTextAndInput>
                <CheckButton type='button'
                  disabled={!noSendPhone ? true : false}
                  onClick={validatePhone}>인증확인</CheckButton>
              </InputFlex>
              <Errorsmessage>{errors.phone_valid_number?.message}</Errorsmessage>

              <div
                style={{ color: 'red', marginLeft: '130px', fontSize: '13px' }}
              >
                {phoneValid ? '유효시간이 만료되었습니다' : false}
                {codeError? '인증번호를 다시 입력해주세요' : false}
              </div>
              <div style={{ color: 'green', marginLeft: '130px', fontSize: '13px' }}>
                {codeTrue? '인증되었습니다' :null}
              </div>
              <InputFlex>
                <TextAndInput>
                  <SignupText>닉네임</SignupText>
                  <InputWithButton
                    id="nickname"
                    name="nickname"
                    placeholder="닉네임은 최대 8글자입니다"
                    {...register('nickname')}
                    onFocus={NickInputVacant}
                  />
                </TextAndInput>
                <CheckButton
                  type="button"
                  id="checkNickname"
                  name="checkNickname"
                  onClick={checkSameNick}
                >
                  중복확인
                </CheckButton>
              </InputFlex>
              {/* {errors.checkNickname?.message} */}
              <Errorsmessage>{errors.nickname?.message}</Errorsmessage>
              <Errorsmessage>
                {existedNick && '중복 아이디입니다'}{' '}
              </Errorsmessage>
              <NoErrorsmessage>
                {availableNick && '사용 가능한 아이디입니다'}{' '}
              </NoErrorsmessage>

              {/* 회원가입 버튼창 */}
              <SignupButton type="submit">회원가입</SignupButton>
            </InputBoxInner>
          </InputBox>
        </form>
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
  z-index: 2;
`;
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;
const ImgBox = styled.img`
  width: 100%;
  position: absolute;
  z-index: -100;
  /* background-repeat: no-repeat; */
`;
const FormContainer = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin-top: 200px;

`;
const InputBox = styled.div`
  width: 700px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.div`
  text-align: center;
  font-family: 'SilkBold';
  font-size: 80px;
  font-weight: 700;
`;

const InputBoxInner = styled.div`
  width: 580px;
  margin-top: 72px;
  margin-left: 10%;
`;

const InputFlex = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
`;
const TextAndInput = styled.div`
  width: 450px;
  padding: 0.8rem;
  display: flex;
  border-bottom: 1px solid lightgray;
  color: #a3a3a3;

  &:focus-within {
    border-bottom: 2px solid black;
    color: black;

  }
`
  

const NoButtonInput = styled.div`
  width: 575px;
  padding: 0.8rem;
  display: flex;
  border-bottom: 1px solid lightgray;
  color: #a3a3a3;

  &:focus-within {
    border-bottom: 2px solid black;
    color: black;
  }
`;
const PhoneTextAndInput = styled.div`
  width: 450px;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
  color: #a3a3a3;

&:focus-within {
  color: black; 
}
`;

const SignupText = styled.div`
  width: 120px;
  margin-left: -8px;
  font-family: 'NotoLight';
  font-weight: 900;
  font-size: 16px;
`;

const InputWithButton = styled.input`
  width: 200px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const OnlyInput = styled.input`
  width: 200px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const CheckButton = styled.button`
  width: 180px;
  margin-left: 10px;
  font-size: 16px;
  font-family: 'NotoLight';
  font-weight:  ${(props) => props.theme.HeadlineBD};
  border: 1px solid grey;
  cursor: pointer;
  background-color: white;

  :hover {
    color: white;
    background-color: black;
  }
`;
const Errorsmessage = styled.div`
  width: 300px;
  margin-left: 130px;
  font-size: 13px;
  font-family: 'NotoLight';
  color: red;
`;

const NoErrorsmessage = styled.div`
  width: 300px;
  margin-left: 130px;
  font-size: 13px;
  font-family: 'NotoLight';
  color: green;
`;

const SignupButton = styled.button`
  width: 586px;
  height: 90px;
  font-family: 'NotoLight';
  font-size: 20px;
  font-weight: 400;

  margin-top: 50px;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  background-color: black;
`;

export default SignUp;
