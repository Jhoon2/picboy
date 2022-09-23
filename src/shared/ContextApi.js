import React, { createContext, useContext } from 'react'

export const myContext = createContext();

export const useMyContext = () => {
    return useContext(myContext)
}


export const Context = (props) => {
    const [timerMessage, setTimerMessage] = React.useState(false)
    const [btnOpen, setBtnOpen] = React.useState(false);
    const btnClickOff = () => setBtnOpen(false);
    const btnClickOn = () => setBtnOpen(!btnOpen);

    const [tabNum, setTabNum] = React.useState(0);
    const [categoryNum, setCategoryNum] = React.useState(1);

    const [isOpenProfileImg, setIsOpenProfileImg] = React.useState(false)
    const [logonOpenProfileImg, setLogonProfileImg] = React.useState(false)

    const [signUpBtn, setSignUpBtn] = React.useState(false)
    const signUpBtnClickOff = () => setSignUpBtn(false)
    const signUpBtnClickOn = () => setSignUpBtn(!signUpBtn)


    const value = {

        timerMessage,
        setTimerMessage,
        btnOpen,
        btnClickOff,
        btnClickOn,
        isOpenProfileImg,
        setIsOpenProfileImg,

        //회원가입 창
        signUpBtn,
        signUpBtnClickOn,
        signUpBtnClickOff,
        //탭넘버
        tabNum,
        setTabNum,

        //카테고리넘버
        categoryNum,
        setCategoryNum,

        //로그온 멤버
        logonOpenProfileImg,
        setLogonProfileImg
    };

    return (
        <myContext.Provider value={value} >
            {props.children}
        </myContext.Provider >
    )
};