import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { removeCookieToken } from '../../shared/Cookie';
import { useMyContext } from '../../shared/ContextApi';
// import { useNavigate } from 'react-router-dom';
import UseGetUser from '../../hooks/UseGetUser';
import '../../elem/Down'
import Down from '../../elem/Down';

const ClickProfileModal = ({img}) => {
  const myContext = useMyContext();
  const node = useRef();

  const logonUser = UseGetUser();
  const logonUsername = logonUser && logonUser.data.data.username;

  const [selectContent, setSelectContent] = useState('myPage');

  //열고 닫는 함수
  const [select, setSelect] = useState(false);

  const myPage = (e) => {
    setSelectContent(e.target.id);
    // navigate(`/user-profile/${logonUsername}`)
    window.location.href = `/user-profile/${logonUsername}`;
    myContext.setLogonProfileImg(false);
  };
  const Logout = (e) => {
    setSelectContent(e.target.id);
    removeCookieToken();
    window.location.href = '/';
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
  return (
    
    <div ref={node}>
      <div>
        <div onClick={() => setSelect(!select)}>
          <LoginUserImg src={img}/>
        </div>
      </div>

          <SelectListBox onClick={(e) => {
                  e.stopPropagation();
                }}>
          <Down select={select}>
            <DownUl>
              
                <div style={{height:'169px'}}>
                  <ProfileImg src={logonUser && logonUser.data.data.profileImg} />
                  <ProfileNickname>{logonUser && logonUser.data.data.nickname}</ProfileNickname>
                  <ProfileUsername>{logonUser && logonUser.data.data.username}</ProfileUsername>
                </div>
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
  )
};
const LoginUserImg = styled.img`
  width: 50px;
  height: 50px;
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
  /* position: absolute; */
  /* z-index: 2; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor:default;
  border: 2px solid #000000;
  background-color: white;

  
`;

const ProfileImg = styled.img`
  width: 87px;
  height: 87px;
  margin-top: 22px;
`
const ProfileNickname = styled.div`
  font-weight: ${(props) => props.theme.BodyBD};
  font-size: ${(props) => props.theme.Caption1};
  
`
const ProfileUsername = styled.div`
   font-weight: ${(props) => props.theme.HeadlineRG};
  font-size: ${(props) => props.theme.Caption3};
  text-align: center;
`

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

  /* :first-child {
    margin-top: 15px;
  } */
  :hover {
    height: 60px;
    margin-bottom: -5px;
    background-color:${(props) => props.theme.basic};
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
