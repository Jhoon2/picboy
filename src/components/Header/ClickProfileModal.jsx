import React, { useRef, useState, useEffect } from 'react';
import { useMyContext } from '../../shared/ContextApi';

import { removeCookieToken } from '../../shared/Cookie';

import styled, { css } from 'styled-components';
import UseGetUser from '../../hooks/UseGetUser';
import '../../elem/Down';
import Down from '../../elem/Down';
import basicImg from '../../images/mypage/basicImg.png';
//로그아웃 알림창
import AnyModal from '../../elem/AnyModal';

const ClickProfileModal = ({ img }) => {
  const myContext = useMyContext();
  const node = useRef();
  const logonUser = UseGetUser();
  const logonUsername = logonUser && logonUser.data.data.username;

  const [selectContent, setSelectContent] = useState('myPage');

  //열고 닫는 함수
  const [select, setSelect] = useState(false);

  const myPage = (e) => {
    setSelectContent(e.target.id);
    window.location.href = `/user-profile/${logonUsername}`;
    myContext.setLogonProfileImg(false);
  };
  const Logout = (e) => {
    myContext.setLogoutBtn(true);
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
  if (!logonUser?.data?.data) return;
  return (
    <div ref={node}>
      {myContext.logoutBtn ? (
        <ErrorBox onClick={() => (window.location.href = '/')}>
          <AnyModal
            title="안내"
            content="로그아웃 되었습니다"
            anyData={anyData}
          />
        </ErrorBox>
      ) : null}
      <div>
        <div onClick={() => setSelect(!select)}>
          <LoginUserImg src={img} />
        </div>
      </div>

      <SelectListBox
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Down select={select}>
          <DownUl>
            <ProfileModalContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ProfileImg src={img ? img : basicImg} />
              </div>
              <ProfileNickname>
                {logonUser && logonUser.data.data.nickname}
              </ProfileNickname>
              <ProfileUsername>
                {logonUser && logonUser.data.data.username}
              </ProfileUsername>
            </ProfileModalContainer>
            <TextBr />
            <ModalText
              id="myPage"
              name="myPage"
              onClick={myPage}
              selectContent={selectContent}
            >
              마이페이지
            </ModalText>
            <TextBr />
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
const LoginUserImg = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 30px;
  border-radius: 50px;
  background-color: white;

  cursor: pointer;
  @media ${({ theme }) => theme.device.laptop} {
    position: absolute;
    bottom: 30%;
    right: 3%;
  }
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
  cursor: default;
  border: 2px solid #000000;
  background-color: white;
`;

const ProfileModalContainer = styled.div`
  height: 169px;
  margin: 0 auto;
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 22px;
  /* margin-left: 5px; */
`;
const ProfileNickname = styled.div`
  font-weight: ${(props) => props.theme.BodyBD};
  font-size: ${(props) => props.theme.Caption1};
  margin-top: 11px;
  text-align: center;
`;
const ProfileUsername = styled.div`
  font-weight: ${(props) => props.theme.HeadlineRG};
  font-size: ${(props) => props.theme.Caption3};
  text-align: center;
`;

const ModalText = styled.div`
  width: 268px;
  height: 56px;

  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: ${(props) => props.theme.Caption2};
  color: ${(props) => props.theme.inactive};
  cursor: pointer;

  :hover {
    height: 60px;
    background-color: ${(props) => props.theme.basic};
  }
`;
const TextBr = styled.div`
  width: 264px;
  height: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 0.5px solid #a3a3a3;
`;

export default ClickProfileModal;
