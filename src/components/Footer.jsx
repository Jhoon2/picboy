import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';

const Footer = () => {
  return (
    <FooterContainer>
      <LogoBox>
        <Title>PICBOY</Title>
        <Desc>@2022 GROUP 1 All Right Reserverd</Desc>
      </LogoBox>
      <LogoBox>
        <Sub>CONTACT</Sub>
        <Desc>wjh2144@naver.com</Desc>
      </LogoBox>

      <LogoBox>
        <Sub>DESIGN</Sub>
        <Desc>KIM Nayoung</Desc>
      </LogoBox>

      <LogoBox>
        <Sub>DEVELOP</Sub>
        <Desc>FE Cho dasom Jung Min-Hee Woo Jong Hun</Desc>
        <Desc>
          BE Lee Dong-Keon Shin Sun-Ho
          <br />
          Jang Chang-Kyoon Jeong Yong-Wook
        </Desc>
      </LogoBox>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  height: 300px;
  background: black;
  ${({ theme }) => theme.flexSet('row', 'space-evenly', 'center')}
`;

const LogoBox = styled.div`
  width: 400px;
  height: 200px;
  ${({ theme }) => theme.flexSet('column', 'space-evenly', 'center')}
`;

const Title = styled.div`
  width: 200px;
  height: 100px;
  background: url(${logo});
  ${({ theme }) => theme.backgroundSet('')};
`;

const Desc = styled.span`
  font-family: 'NotoLight';
  font-size: 14px;
  color: #a3a3a3;
`;

const Sub = styled.span`
  font-family: 'NotoBold';
  font-size: 20px;
  color: white;
`;
