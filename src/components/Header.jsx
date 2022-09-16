import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMyContext } from '../shared/ContextApi';
import styled from 'styled-components';
import PostCategories from '../elem/PostCategories';
import logo from '../images/logo.svg';
import {
  getCookieToken,
  removeCookieToken,
  removeRefreshCookieToken,
} from '../shared/Cookie';
import UseGetUser from '../hooks/UseGetUser' 
import ClickProfileModal from './Header/ClickProfileModal';
import basicImg from '../images/basicImg.jpg'

const myToken = getCookieToken();

const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const Header = () => {
  const useGet = UseGetUser();
  const loginUser = useGet && useGet.data.data.profileImg
  // console.log(loginUser)


  useEffect(() => {

  }, [loginUser])
  
  const navigate = useNavigate();
  const documentRef = useRef(document);
  const location = useLocation();
  const myContext = useMyContext();
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [openProfile, setOpenProfile] = useState(false)

  const clickOpenModal = () => {
    myContext.setLogonProfileImg(!myContext.logonOpenProfileImg)
  }

  if (location.pathname === '/login') return null;
  if (location.pathname === '/join') return null;


  // const throttleScroll = throttle(handleScroll, 50);


  return (
    <HeaderArea>
      <HeaderContainer>
        <HeaderBox>
          <Logo src={logo}
            onClick={() => {
              navigate('/');
            }}
          ></Logo>
          <ProceedingButton
            onClick={() => {
              navigate('/list');
            }}
          >
            PROCEEDING
          </ProceedingButton>
          <CompleteButton
            onClick={() => {
              navigate('/CompList');
            }}
          >
            COMPLETE
          </CompleteButton>
          <PostCategories />
          {myToken ? (
            <div>
              <LoginUserImg src={!loginUser? basicImg : loginUser}  onClick={clickOpenModal}></LoginUserImg>
              
            </div>
          ) : (
            <LoginButton
              onClick={() => {
                navigate('/login');
              }}
            >
              LOGIN
            </LoginButton>
          )}
        </HeaderBox>
        {myContext.logonOpenProfileImg ? <ClickProfileModal shown={myContext.logonOpenProfileImg}
                close={() => { myContext.setLogonProfileImg(false) }}/> : null}
      </HeaderContainer>
    </HeaderArea>
  );
};

export default Header;

const Button = styled.button`
  width: 200px;
  height: 50px;
  background: none;
  font-family: 'PopLight';
  font-size: 13px;
  color: white;
`;

const HeaderArea = styled.div`
  position: relative;
  width: 100%;
  z-index: 9999;
`;

const HeaderContainer = styled.div`
  width: 100%;
  /* position: fixed; */
  top: 0;
  left: 0;
  z-index: 2;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-80px);
  }
  background: black;
`;

const HeaderBox = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100px;
  margin: auto;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Logo = styled.img`
  width: 104px;
  height: 30px;
  margin-right: 100px;
  cursor: pointer;
`;

const ProceedingButton = styled(Button)`
  width: 150px;
  margin-right: 60px;
  background: none;
  font-size: 20px;
  color: white;
`;

const CompleteButton = styled(Button)`
  width: 150px;
  margin-right: 420px;
  font-size: 20px;
  background: none;
`;

const LoginButton = styled(Button)`
  width: 80px;
  ${({ theme }) => theme.backgroundSet('cover')}
  font-size: 16px;
`;

const LoginUserImg = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 58px;
  cursor: pointer;
  
`

