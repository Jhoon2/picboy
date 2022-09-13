import React from 'react';
import styled from 'styled-components';
import user from '../images/user.png';
const BestFree = () => {
    return (
        <>
            <BestBox>
                <BestImg />
                <BestDesc>
                    <Profile />
                    <Nickname>일이삼사오육 외 8명</Nickname>
                </BestDesc>
            </BestBox>
        </>
    );
};

export default BestFree;

const Width = styled.div`
  width: 350px;
`;

const BestBox = styled(Width)`
  height: 300px;
  margin-top: 50px;
  display: inline-block;
  margin-left: 35px;
`;

const BestImg = styled.div`
  width: 350px;
  height: 300px;
  display: block;
  background: #e6e6e6;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  transition: 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }
`;

const BestDesc = styled(Width)`
  height: 50px;
  margin-top: 20px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
`;

const Profile = styled(Button)`
  margin-right: 20px;
  border-radius: 50%;
  background: url(${user});
  ${({ theme }) => theme.backgroundSet('contain')};
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

const Nickname = styled(Span)`
  font-family: 'NotoLight';
  font-size: 16px;
  margin-right: 100px;
  color: #2e3248;
  display: inline-block;
  padding: 15px 0;
  position: relative;
  text-decoration: none;
`;