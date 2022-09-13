import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import axios from "axios"
import TimerPage from '../components/Signup/TimerPage';
import { useMyContext } from '../shared/ContextApi';
import styled from 'styled-components'


const SignUp = () => {
    const baseURL = process.env.REACT_APP_API_KEY;

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('')

    //유효성검사
    const schema = yup.object().shape({
        id: yup.string()
            .min(3, '3글자 이상 입력해주세요!')
            .max(10, "10글자 이하로 입력해주세요!")
            .matches(
                /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                "ID에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!")
            .required('아이디를 입력해주세요'),

        pw: yup.string()
            .max(16, "비밀번호는 최대 16자리입니다!")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
                "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요"
            )
            .required('비밀번호를 입력해주세요'),
        checkPw: yup
            .string()
            .oneOf([yup.ref('pw'), null], '비밀번호가 일치하지 않습니다')
            .required('비밀번호를 한번 더 입력해주세요'),

        // phone_number: yup.string()
        // .required(),

        phone_valid_number: yup.string()
            .required(),

        nickname: yup.string()
            .min(3, "닉네임은 최소 3글자 이상입니다!")
            .max(10, "닉네임은 최대 10글자입니다!")
            .required('닉네임을 입력해주세요'),
    })


    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    //ID중복확인
    const [existedId, setExistedId] = useState(false)
    const [availableId, setAvailableId] = useState(false)

    const checkSameId = async () => {
        const id = watch().id
        if (id.length < 3 || id.length > 10) return;

        try {
            const response = await axios.get(`${baseURL}/user/id-double-check/${id}`)
            if (!response.data.success) {
                setExistedId(true)
            } else {
                setAvailableId(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    //ID input창 빈값
    const IDinputVacant = () => {
        setExistedId(false)
        setAvailableId(false)
    }

    // NickName 중복확인
    const [existedNick, setExistedNick] = useState(false)
    const [availableNick, setAvailableNick] = useState(false)

    const checkSameNick = async () => {
        const nickname = watch().nickname
        if (nickname.length < 2 || nickname.length > 10) return;

        try {
            const response = await axios.get(`${baseURL}/user/nickname-double-check/${nickname}`)
            if (!response.data.success) {
                setExistedNick(true)
            } else {
                setAvailableNick(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Nickname input창 빈값
    const NickInputVacant = () => {
        setExistedNick(false)
        setAvailableNick(false)
    }

    // 핸드폰 번호 중간 - 넣기
    const numberAddHyphen = (e) => {
        const regax = /^[0-9\b -]{0,13}$/;
        if (regax.test(e.target.value)) {
            setInputValue(e.target.value)
        }
    }

    useEffect(() => {
        if (inputValue.length === 10) {
            setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (inputValue.length === 13) {
            setInputValue(inputValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [inputValue]);


    //핸드폰 코드 전송 버튼
    const myContext = useMyContext();
    const [phoneValid, setPhoneValid] = useState(false)

    const phoneCheck = () => {
        setPhoneValid(false)

        console.log('코드전송시작!')
        myContext.setTimerMessage(true)
        setTimeout(() => {
            myContext.setTimerMessage(false)
            setPhoneValid(true)
        },6000)
    }

    //회원가입 버튼
    const onClickSignUp = async (data) => {
        //에러메시지 창?
        if (!availableId) { console.log('아이디 중복확인 누르는 창') }
        if (!availableNick) { console.log('닉네임 중복확인 누르는 창') }

        const info = {
            username: data.id,
            nickname: data.nickname,
            password: data.pw,
            phoneNumber: data.phone_number,
        }
        try {
            const response = await axios.post(`${baseURL}/user/signup`, info)
            console.log(response)
            if (response.status === 200) {
                reset();
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <LoginContainer>
            <FormContainer>
                <form onSubmit={handleSubmit(onClickSignUp)}>
                    <InputBox>
                        <div style={{
                            textAlign:
                                'center', marginBottom:'80px',fontSize: '50px', fontWeight: '700' 
                            
                        }}>회원가입</div>
                        <InputBoxInner>

                            <InputFlex>
                                <TextAndInput>
                                    <SignupText>아이디</SignupText>
                                    <InputWithButton onFocus={IDinputVacant} id='userId' name='id' placeholder='ID를 입력해주세요'  {...register('id')} />
                                </TextAndInput>
                                <CheckButton type="button"
                                    id='checkId' name='checkId' onClick={checkSameId}
                                >중복확인</CheckButton>
                            </InputFlex>
                            <Errorsmessage>{errors.id?.message} </Errorsmessage>
                            <Errorsmessage>{existedId && '중복 아이디입니다'} </Errorsmessage>
                            <NoErrorsmessage>{availableId && '사용 가능한 아이디입니다'} </NoErrorsmessage>

                            <InputFlex>
                                <TextAndInput>
                                    <SignupText>비밀번호</SignupText>
                                    <OnlyInput id='password' name='pw' type='password' placeholder='비밀번호를 입력해주세요' autoComplete="off"
                                        {...register('pw', {
                                            required: true
                                        })} />
                                </TextAndInput>
                            </InputFlex>
                            <Errorsmessage>{errors.pw?.message}</Errorsmessage>

                            <InputFlex>
                                <TextAndInput>
                                    <SignupText>비밀번호 확인</SignupText>
                                    <OnlyInput id='checkPsasword' name='checkPw' autoComplete="off" type='password' placeholder='비밀번호를 확인해주세요'
                                        {...register('checkPw', {
                                            required: true
                                        })} />
                                </TextAndInput>
                            </InputFlex>
                            <Errorsmessage>
                                {errors.checkPw?.message}
                            </Errorsmessage>

                            <InputFlex>
                                <TextAndInput>
                                    <SignupText>휴대폰</SignupText>
                                    <InputWithButton
                                        id='phone_number' name='phone_number' placeholder='핸드폰번호를 입력해주세요'
                                        type='text' value={inputValue}
                                        onChange={numberAddHyphen}
                                    />
                                </TextAndInput>
                                <CheckButton type='button' onClick={phoneCheck}>코드전송</CheckButton>
                            </InputFlex>
                            
                            <InputFlex>
                                <PhoneTextAndInput>
                                    <div style={{display:'flex'}}>
                                        <SignupText>휴대폰 인증</SignupText>
                                        <InputWithButton
                                            id='phone_valid_number' name='phone_valid_number' placeholder='인증번호를 입력해주세요'
                                            {...register('phone_valid_number')} />
                                    </div>
                                    <div style={{color: 'red'}}>{myContext.timerMessage ? <TimerPage /> : null}</div>
                                </PhoneTextAndInput>
                                <CheckButton >인증확인</CheckButton>
                            </InputFlex>
                                <div style={{ color: 'red', marginLeft: '130px',fontSize: '13px' }}>{phoneValid ? '유효시간이 만료되었습니다' : false}</div>

                            <InputFlex>
                                <TextAndInput>
                                    <SignupText>닉네임</SignupText>
                                    <InputWithButton id='nickname' name='nickname'
                                        placeholder='닉네임은 최대 8글자입니다'
                                        {...register('nickname')} onFocus={NickInputVacant} />
                                </TextAndInput>
                                <CheckButton type="button"
                                    id='checkNickname' name='checkNickname'
                                    onClick={checkSameNick} >중복확인</CheckButton>
                            </InputFlex>
                            {/* {errors.checkNickname?.message} */}
                            <Errorsmessage>{errors.nickname?.message}</Errorsmessage>
                            <Errorsmessage>{existedNick && '중복 아이디입니다'} </Errorsmessage>
                            <NoErrorsmessage>{availableNick && '사용 가능한 아이디입니다'} </NoErrorsmessage>


                            {/* 회원가입 버튼창 */}
                            <SignupButton type='submit' >회원가입</SignupButton>
                        </InputBoxInner>
                    </InputBox>
                </form>
            </FormContainer>
        </LoginContainer>
    )
}
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
`
const FormContainer = styled.div`
  max-width: 1200px;
  height: 50vh;
  margin-top: 20%;

`
const InputBox = styled.div`
  width: 700px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InputBoxInner = styled.div`
  width: 580px;
  margin-left: 10%;
  `

const InputFlex = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  `
const TextAndInput = styled.div`
  width: 450px;
  padding: 0.8rem;
  display: flex;
  border-bottom: 2px solid lightgray;
`
const PhoneTextAndInput = styled.div`
  width: 450px;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
`

const SignupText = styled.div`
  width: 120px;
  margin-left: -8px;
  font-weight: 900;
`

const InputWithButton = styled.input`
  width: 200px;
  font-size: 16px;
  border : none;
  outline: none;
  background-color: transparent;
`

const OnlyInput = styled.input`
  width: 200px;
  font-size: 16px;
  border : none;
  outline: none;
  background-color: transparent;
`

const CheckButton = styled.button`
  width: 100px;
  margin-left: 10px;
  font-size: 16px;
  border: 1px solid grey ;
  cursor: pointer;
  background-color: white;
`
const Errorsmessage = styled.div`
  width: 300px;
  margin-left: 130px;
  font-size: 13px;
  color: red;
`;

const NoErrorsmessage = styled.div`
  width: 300px;
  margin-left: 130px;
  font-size: 13px;
  color: green;
`

const SignupButton = styled.button`
  width: 586px;
  height: 52px;
  margin-top: 50px;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  background-color: black;
`

export default SignUp