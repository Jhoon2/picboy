import React from 'react';
import styled, { css } from 'styled-components';
import user from '../images/user.png';

const BestKeyword = () => {
    return (
        <>
            <BestBox>
                <div style={{ position: 'relative' }}>
                    <OverlayWrap>
                        <Overlay>
                            <DescBox>
                                <Keyword>제시어 혹은 제목...</Keyword>
                            </DescBox>
                        </Overlay>
                    </OverlayWrap>
                    <BestImg />
                </div>
                <BestDesc>
                    <Profile />
                    <Nickname>일이삼사오육 외 8명</Nickname>
                </BestDesc>
            </BestBox>

            <BestBox>
                <div style={{ position: 'relative' }}>
                    <OverlayWrap>
                        <Overlay>
                            <DescBox>
                                <Keyword>제시어 혹은 제목...</Keyword>
                            </DescBox>
                        </Overlay>
                    </OverlayWrap>
                    <BestImg />
                </div>
                <BestDesc>
                    <Profile />
                    <Nickname>일이삼사오육 외 8명</Nickname>
                </BestDesc>
            </BestBox>

            <BestBox>
                <div style={{ position: 'relative' }}>
                    <OverlayWrap>
                        <Overlay>
                            <DescBox>
                                <Keyword>제시어 혹은 제목...</Keyword>
                            </DescBox>
                        </Overlay>
                    </OverlayWrap>
                    <BestImg />
                </div>
                <BestDesc>
                    <Profile />
                    <Nickname>일이삼사오육 외 8명</Nickname>
                </BestDesc>
            </BestBox>
        </>
    );
};

export default BestKeyword;

const Width = styled.div`
  width: 350px;
`;

const BestBox = styled(Width)`
  height: 300px;
  margin-top: 50px;
  display: inline-block;
  margin-left: 35px;
`;

const BestDesc = styled(Width)`
  height: 50px;
  margin-top: 20px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const DescBox = styled(Width)`
  height: 110px;
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

const Keyword = styled(Span)`
  padding-top: 20px;
  padding-left: 10px;
  font-family: 'Noto Bold';
  font-size: 20px;
  color: white;
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

const OverlaySize = css`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  ${OverlaySize}
  margin-top: 100%;
  height: 200px;
  background: rgb(212, 212, 212);
  background: linear-gradient(360deg, rgba(103, 103, 103, 0) 67.83%);
  transition: all 1s;
`;

const OverlayWrap = styled.div`
  ${OverlaySize}
  overflow: hidden;
  position: absolute;
  background: #e6e6e6;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  transition: 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }

  &:hover ${Overlay} {
    margin-top: 60%;
  }
`;

const BestImg = styled.div`
  width: 350px;
  height: 300px;
  display: block;
`;