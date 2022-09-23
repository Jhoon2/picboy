import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMyContext } from '../shared/ContextApi';
import styled from 'styled-components';
// 소켓
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import PostCategories from '../elem/PostCategories';
import logo from '../images/logo.svg';
import {
  getCookieToken,
  removeCookieToken,
  removeRefreshCookieToken,
  getRefreshToken,
} from '../shared/Cookie';
import UseGetUser from '../hooks/UseGetUser';
import ClickProfileModal from '../components/Header/ClickProfileModal';
import basicImg from '../images/basicImg.jpg';
import '../elem/Down'

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
  const usernames = useGet.data?.data.username;
  const loginUser = useGet && useGet.data.data.profileImg;
  const myToken = getCookieToken();
  ////////////////////////////////////////////////////
  // //헤더 모달창 열고닫기
  // const [select, setSelect] = useState(false);

  const [messageList, setMessageList] = useState([]);
  const refreshToken = getRefreshToken();
  const baseURL = process.env.REACT_APP_API_KEY;
  const socket = new SockJS(`${baseURL}/socket/`, '', {
    headers: {
      Authorization: myToken,
      'refresh-token': refreshToken,
    },
  });

  // const stompClient = Stomp.over(socket);

  useEffect(() => {
    // stompConnect();
  });

  // const stompConnect = () => {
  //   try {
  //     stompClient.connect(
  //       () => {
  //         stompClient.subscribe(`/sub/${usernames}`, (data) => {
  //           const returnMessage = JSON.parse(data.body);

  //           setMessageList(returnMessage.message);
  //         });
  //       },
  //       () => {}
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  //////////////////////////////////////////////////////
  const location = useLocation();

  //usegetuser 훅을 쓸지 RTK로 할지 고민중
  // const dispatch = useDispatch();
  // const  getLogonUser  = useSelector((state) => state && state.logonUser)
  // const loginUser = getLogonUser.logonUser&&getLogonUser.logonUser.profileImg

  useEffect(() => { }, [loginUser]);

  const navigate = useNavigate();
  const documentRef = useRef(document);

  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () =>
      documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);



  if (location.pathname === '/login') return null;
  if (location.pathname === '/join') return null;

  return (
    <HeaderArea>
      <HeaderContainer className={hide && 'hide'}>
        <HeaderBox>
          <Logo
            src={logo}
            alt=""
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
            <ClickProfileModal img={!loginUser ? basicImg : loginUser } />
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-80px);
  }
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #000000;
`;

const HeaderBox = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 80px;
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
  font-size: 15px;
  color: #a3a3a3;
  &:hover {
    color: white;
  }
`;

const CompleteButton = styled(Button)`
  width: 150px;
  margin-right: 420px;
  font-size: 15px;
  background: none;
  color: #a3a3a3;
  &:hover {
    color: white;
  }
`;

const LoginButton = styled(Button)`
  width: 80px;
  ${({ theme }) => theme.backgroundSet('cover')}
  font-size: 12px;
  color: #a3a3a3;
  &:hover {
    color: white;
  }
`;




