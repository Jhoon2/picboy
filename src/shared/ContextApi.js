import React,{ createContext, useContext } from 'react'

// Context 객체 만들기(리덕스에서 Store와 같은 역할)
// createContext 를 실행하면 Provider와 Consumer을 담고 있는 컨텍스트 객체가 생성
// Provider는 state나 action.type에 따른 dispatch 함수들을 value prop에 넣어서 제공하는 역할.
// Consumer는 Provider에 담긴 state와 dispatch 함수들을 필요한 컴포넌트에서 접근할 수 있게 만드는 
// 역할.
export const myContext = createContext();

//  useContext를 통해 context.Consumer을 사용하지 않고 간단히 컨텍스트에 접근가능
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