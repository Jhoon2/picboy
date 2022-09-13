import React,{ createContext, useContext } from 'react'

export const myContext = createContext();

export const useMyContext = () => {
    return useContext(myContext)
}


export const Context = (props) => {
  const [nickname, setNickname] = React.useState();
  const [timerMessage, setTimerMessage] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState(false)
    
  const value = {
    nickname,
    setNickname,
    timerMessage,
    setTimerMessage,
    userInfo,
    setUserInfo
    };

    return (
        <myContext.Provider value={value} >
            {props.children}
        </myContext.Provider >
    )
};