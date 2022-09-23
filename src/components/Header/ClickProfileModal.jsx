import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  removeCookieToken,
} from '../../shared/Cookie';
import { useMyContext } from '../../shared/ContextApi';
// import { useNavigate } from 'react-router-dom';
import UseGetUser from '../../hooks/UseGetUser';

const ClickProfileModal = ({shown, close}) => {
  const myContext = useMyContext();
  const logonUser = UseGetUser();
  // console.log(logonUser)
  const logonUsername =logonUser && logonUser.data.data.username;

  const [selectContent, setSelectContent] = useState('myPage')

  // const navigate = useNavigate();
  console.log(logonUsername)
  const myPage = (e) => {
    setSelectContent(e.target.id)
    // navigate(`/user-profile/${logonUsername}`)
    window.location.href = `/user-profile/${logonUsername}`
    myContext.setLogonProfileImg(false)
  }
  const Logout = (e) => {
    setSelectContent(e.target.id)
    removeCookieToken();
    window.location.href = '/';
  }


  return shown? (
    <Overlay onClick={()=>{close()}}>
      <OverlayPosition >
        <OverlayContainer>
          <ModalContainer onClick={e => {e.stopPropagation();}}>
            <ModalText id='myPage' name='myPage' onClick={myPage} selectContent={selectContent}
            >
              마이페이지
              </ModalText>
            <TextBr />
            <ModalText id='Logout' name='Logout'onClick={Logout} categoryContent={selectContent}>
              로그아웃
            </ModalText>
          </ModalContainer>
        </OverlayContainer>
      </OverlayPosition>
    </Overlay>
  ) : null
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
`
const OverlayContainer = styled.div`
  width: 200px;
  position: absolute;
`
const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top: 100px;
  left: 530px;
`
const ModalContainer = styled.div`
  width: 132px;
  height: 100px;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`

const ModalText = styled.div`
  width: 132px;
  height: 23px;
  margin-top: 5px;
  padding: 15px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${(props)=> (props.name === (props.selectContent)) ? '#000000' : '#A3A3A3'} ;
  cursor: pointer;

  :first-child {
    margin-top: 15px;
  }
`
const TextBr = styled.div`
  width: 84px;
  height: 0px;
  margin-top: 5px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 0.5px solid #A3A3A3;
`

export default ClickProfileModal