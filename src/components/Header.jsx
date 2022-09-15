import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostCategories from '../elem/PostCategories';
import logo from '../images/logo.svg';

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
    const [hide, setHide] = useState(false);
    const [pageY, setPageY] = useState(0);
    const documentRef = useRef(document);
    const location = useLocation();

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
    const navigate = useNavigate();

    if (location.pathname === '/login') return null;
    if (location.pathname === '/join') return null;

    return (
        <HeaderArea>
            <HeaderContainer className={hide && 'hide'}>
                <HeaderBox>
                    <Logo
                        onClick={() => {
                            navigate('/');
                        }}
                    ></Logo>
                    <ProceedingButton
                        onClick={() => {
                            navigate('/list');
                        }}
                    >
                        Proceeding
                    </ProceedingButton>
                    <CompleteButton
                        onClick={() => {
                            navigate('/CompList');
                        }}
                    >
                        Complete
                    </CompleteButton>
                    <PostCategories />
                    <LoginButton
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        LOGIN
                    </LoginButton>
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
  background: black;
`;

const HeaderBox = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 80px;
  margin: auto;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Logo = styled(Button)`
  height: 30px;
  padding-bottom: 5px;
  border-radius: 10px;
  background: url(${logo});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  /* font-family: 'SilkBold';
  font-size: 35px;
  -webkit-text-stroke: 2px black;
  text-shadow: 5px 5px black; */
`;

const ProceedingButton = styled(Button)`
  width: 150px;
  background: none;

  color: white;
`;

const CompleteButton = styled(Button)`
  width: 150px;
  margin-right: 420px;
  background: none;
`;

const LoginButton = styled(Button)`
  width: 80px;
  ${({ theme }) => theme.backgroundSet('cover')}

  font-size: 13px;
`;
