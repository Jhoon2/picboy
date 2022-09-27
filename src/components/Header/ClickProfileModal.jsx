import React, { useRef, useState, useEffect } from 'react';
import { useMyContext } from '../../shared/ContextApi';
import { useNavigate } from 'react-router-dom';

import { removeCookieToken } from '../../shared/Cookie';

import styled, { css } from 'styled-components';
import UseGetUser from '../../hooks/UseGetUser';
import '../../elem/Down'
import Down from '../../elem/Down';
import basicImg from '../../images/mypage/basicImg.png'
import { headerPB } from '../../global/sound';
import { pop1PB } from '../../global/sound';

//로그아웃 알림창
import AnyModal from '../../elem/AnyModal';



const ClickProfileModal = ({ img }) => {
  const myContext = useMyContext();
  const node = useRef();
  const navigate = useNavigate();
  const logonUser = UseGetUser();
  const logonUsername = logonUser && logonUser.data.data.username;
  
  const [selectContent, setSelectContent] = useState('myPage');
  const openClick = () => {
    setSelect(!select)
    headerPB.play()
  }
  //열고 닫는 함수
  const [select, setSelect] = useState(false);

  //로그아웃
  const Logout = (e) => {
    pop1PB.play();
    myContext.setLogoutBtn(true)
    setSelectContent(e.target.id);
    removeCookieToken();
  };

  useEffect(() => {
    
    const clickOutside = (e) => {
      if (select && node.current && !node.current.contains(e.target)) {
        setSelect(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [select]);


  let anyData = 1;
  if(!logonUser?.data?.data) return
  return (
    <div ref={node}>
         {myContext.logoutBtn ? (
        <ErrorBox onClick={() => window.location.href = '/'}>
          <AnyModal title="안내" content="로그아웃 되었습니다" anyData={anyData} />
        </ErrorBox>
      ) : null}
      <div>
        <div onClick={openClick}>
          <LoginUserImg src={img}/>
        </div>
      </div>

          <SelectListBox onClick={(e) => {
                  e.stopPropagation();
                }}>
          <Down select={select}>
            <DownUl>
              
                <ProfileModalContainer >
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ProfileImg src={img ? img : basicImg} />
                  </div>
                  <ProfileNickname>{logonUser?.data?.data?.status === 1 ? logonUser?.data?.data?.nickname : logonUser?.data?.data?.nickname.slice(0,8)}</ProfileNickname>
                  <ProfileUsername>{logonUser?.data?.data?.status === 1 ?  logonUser?.data?.data?.username : 'Kakao user'}</ProfileUsername>
                </ProfileModalContainer>
                <HR />
                <ModalText
                    id="myPage"
                    name="myPage"
                 onClick={(e) => {
                      pop1PB.play();
                      setSelectContent(e.target.id);
                      navigate(`/user-profile/${logonUsername}`)
                      // myContext.setLogonProfileImg(false);
                    }}
                    selectContent={selectContent}
                  >
                    마이페이지
                  </ModalText>
                  <HR />
                  <ModalText
                    id="Logout"
                    name="Logout"
                    onClick={Logout}
                    categoryContent={selectContent}
                  >
                    로그아웃
                  </ModalText>
                 </DownUl>
                </Down>
          </SelectListBox>
    </div>
  )
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
const LoginUserImg = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 5px;
  margin-left: 30px;
  border-radius: 50px;
  background-color: white;

  cursor: pointer;

`;

const SelectListBox = styled.div`
  width: 150px;
  position: relative;
  top: 10px;
  right: 170px;
  z-index: 1;
`;

const DownUl = styled.ul`
  width: 268px;
  height: 284px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor:default;
  border: 2px solid #000000;
  background-color: white;
`;

const ProfileModalContainer = styled.div`
  height: 169px;
  margin: 0 auto;
`

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 22px;
  margin-left: 5px;
`
const ProfileNickname = styled.div`
  font-weight: ${(props) => props.theme.BodyBD};
  font-size: ${(props) => props.theme.Caption1};
  margin-top: 11px;
  text-align: center;

`
const ProfileUsername = styled.div`
   font-weight: ${(props) => props.theme.HeadlineRG};
  font-size: ${(props) => props.theme.Caption3};
  text-align: center;
`

const ModalText = styled.div`
  width: 268px;
  height: 58px;

  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => props.theme.Caption2};
  color: ${(props) => props.theme.inactive};
  cursor: pointer;

  :hover {
    height: 65px;
    background-color:${(props) => props.theme.basic};
  }
`;
const HR = styled.hr`
  width: 264px;
  height: 1px;
  border: none;
  margin: 0;
  background: #ccc;
`;

export default ClickProfileModal;
