import React, { createContext, useContext } from 'react';

export const myContext = createContext();

export const useMyContext = () => {
  return useContext(myContext);
};

export const Context = (props) => {
    const [timerMessage, setTimerMessage] = React.useState(false)
    const [btnOpen, setBtnOpen] = React.useState(false);
    const btnClickOff = () => setBtnOpen(false);
    const btnClickOn = () => setBtnOpen(!btnOpen);

    const [tabNum, setTabNum] = React.useState(0);
    const [categoryNum, setCategoryNum] = React.useState(1);

    const [isOpenProfileImg, setIsOpenProfileImg] = React.useState(false)  
    // const [logonOpenProfileImg, setLogonProfileImg] = React.useState(false)  

    const [signUpBtn, setSignUpBtn]= React.useState(false)
    const signUpBtnClickOff = () => setSignUpBtn(false)
    const signUpBtnClickOn = () => setSignUpBtn(!signUpBtn)
   
    //모든 참가자 보기 모달창 관련
    const [allParticipants, setAllParticipants] = React.useState(false)

    //페이지넘버
    const [pageNum, setPageNum] = React.useState(0)
    
    //로그아웃
    const [logoutBtn, setLogoutBtn] = React.useState(false);

    //신고
    const [declarBtn, setDecalrBtn] = React.useState(false);

    //신고취소
    const [declarCancel, setDeclarCancel] = React.useState(false);

    //List 중 신고
    const [listDeclarBtn, setListDecalrBtn] = React.useState(false);

    //List 중 신고취소
    const [listDeclarCancel, setListDeclarCancel] = React.useState(false);
    //댓글 삭제
    const [commetDeleteBtn, setCommetDeleteBtn] = React.useState(false);

    //댓글 로그인 이용 후 가능
    const [commetApplyBtn, setCommetApplyBtn] = React.useState(false);
        
    //프레임 개수
    const [setttingFrameBtn, setSettingFrameBtn] = React.useState(false);
    
    //그리기 완료
    const [drawingDoneBtn, setDrawingDoneBtn] = React.useState(false);

    //제시어 입력
    const [topicBtn, setTopicBtn] = React.useState(false);

    //포스트 릴레이 추가할때
    const [ postTopicBtn, setPostTopicBtn] = React.useState(false)

    //그림판이 비어있을 떄
    const [ vacantCanvas , setVacantCanvas] =React.useState(false)


    const value = React.useMemo(() => ({
  
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

            //로그아웃버튼
            logoutBtn,
            setLogoutBtn,

            // 모든 참가자 모달창
            allParticipants,
            setAllParticipants,

            //페이지 넘버
            pageNum,
            setPageNum,
    
            //신고
            declarBtn,
            setDecalrBtn,

            //신고취소
            declarCancel,
            setDeclarCancel,

            //list 중 신고
            listDeclarBtn,
            setListDecalrBtn,

            //List 중 신고취소
            listDeclarCancel,
            setListDeclarCancel,
        
            //댓글삭제
            commetDeleteBtn,
            setCommetDeleteBtn,

            //댓글 로그인 이후 가능
            commetApplyBtn,
            setCommetApplyBtn,

            //프레임 개수 설정
            setttingFrameBtn,
            setSettingFrameBtn,

            //그리기 완료
            drawingDoneBtn,
            setDrawingDoneBtn,

            //제시어 입력
            topicBtn,
            setTopicBtn,

            //추가하기 로그인 후 이용
            postTopicBtn,
            setPostTopicBtn,
        
            //그림판이 비어있을 떄
            vacantCanvas,
            setVacantCanvas,

    }),[allParticipants, btnClickOn, btnOpen, categoryNum, commetApplyBtn, commetDeleteBtn, declarBtn, declarCancel, drawingDoneBtn, isOpenProfileImg, listDeclarBtn, listDeclarCancel, logoutBtn, pageNum, postTopicBtn, setttingFrameBtn, signUpBtn, signUpBtnClickOn, tabNum, timerMessage,topicBtn,vacantCanvas])

    return (
        <myContext.Provider value={value} >
            {props.children}
        </myContext.Provider >
    )
}
