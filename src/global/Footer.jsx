import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import footerimg from '../images/footerimg.svg';

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/login') return null;
  if (location.pathname === '/join') return null;
  return (
    <FooterContainer>
      <LogoBox>
        <Title />
        <Sub>DEVELOP</Sub>
        <Desc>
          <span>FE</span> Cho dasom | Jung Min-Hee | Woo Jong Hun
        </Desc>
        <Desc>
          <span>BE</span> Lee Dong-Keon | Shin Sun-Ho | Jang Chang-Kyoon | Jeong
          Yong-Wook
        </Desc>
        <Sub>DESIGN</Sub>
        <Desc>KIM NAYOUNG</Desc>
        <End>@ 2022 PICBOY ALL RIGHT RESERVERD</End>
      </LogoBox>
      <LogoBox>ㅎㅇ</LogoBox>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  height: 520px;
  background: black;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'center')}
`;

const LogoBox = styled.div`
  width: 620px;
  height: 400px;
  margin-left: 100px;
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'stretch')}
`;

const Title = styled.div`
  width: 200px;
  height: 100px;
  background: url(${footerimg});
  ${({ theme }) => theme.backgroundSet('')};
`;

const Sub = styled.div`
  margin-top: 30px;
  font-family: 'PopLight';
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
  color: #ffffff;
`;

const Desc = styled.div`
  margin-top: 20px;
  font-family: 'PopLight';
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  text-transform: uppercase;
  color: #ffffff;

  span {
    font-weight: 700;
  }
`;

const End = styled.div`
  margin-top: 30px;
  font-family: 'PopLight';
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  text-transform: uppercase;
  color: #a3a3a3;
`;
