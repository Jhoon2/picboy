import React, { createContext, useContext } from 'react'

export const myContext = createContext();

export const useMyContext = () => {
    return useContext(myContext)
}


export const Context = (props) => {
    const [imgAddress, setImgAddress] = React.useState();
    const [timerMessage, setTimerMessage] = React.useState(false)
    const [btnOpen, setBtnOpen] = React.useState(false);
    const btnClickOff = () => setBtnOpen(false);
    const btnClickOn = () => setBtnOpen(!btnOpen);

    const [isOpenProfileImg, setIsOpenProfileImg] = React.useState(false)  


    const value = {
        imgAddress,
        setImgAddress,
        timerMessage,
        setTimerMessage,
        btnOpen,
        btnClickOff,
        btnClickOn,
        isOpenProfileImg,
        setIsOpenProfileImg
    };

    return (
        <myContext.Provider value={value} >
            {props.children}
        </myContext.Provider >
    )
};