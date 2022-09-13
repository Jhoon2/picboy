import React from 'react';
import styled, { css } from 'styled-components';

const BestAll = () => {
  return (
    <>
      <BestBox>
        <div style={{ position: 'relative' }}>
          <OverlayWrap>
            <Overlay>
              <DescBox>
                <Keyword>제시어 혹은 제목...</Keyword>
                <LikeButton />
              </DescBox>
            </Overlay>
          </OverlayWrap>
          <BestImg />
        </div>
        <BestDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </BestDesc>
      </BestBox>

      <BestBox>
        <div style={{ position: 'relative' }}>
          <OverlayWrap>
            <Overlay>
              <DescBox>
                <Keyword>제시어 혹은 제목...</Keyword>
                <LikeButton />
              </DescBox>
            </Overlay>
          </OverlayWrap>
          <BestImg />
        </div>
        <BestDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </BestDesc>
      </BestBox>

      <BestBox>
        <div style={{ position: 'relative' }}>
          <OverlayWrap>
            <Overlay>
              <DescBox>
                <Keyword>제시어 혹은 제목...</Keyword>
                <LikeButton />
              </DescBox>
            </Overlay>
          </OverlayWrap>
          <BestImg />
        </div>
        <BestDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </BestDesc>
      </BestBox>
    </>
  );
};

export default BestAll;

const Width = styled.div`
  width: 380px;
`;

const BestBox = styled(Width)`
  height: 350px;
  margin-top: 150px;
  margin-right: 30px;
`;

const BestDesc = styled(Width)`
  height: 50px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
  background: #b2b2b2;
`;

const DescBox = styled(Width)`
  height: 110px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
`;

const LikeButton = styled(Button)`
  width: 60px;
  height: 60px;
  margin-left: 60px;
  border-radius: 50px;
`;

const Profile = styled(Button)`
  margin-right: 20px;
  background: #7f7f7f;
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

const Keyword = styled(Span)`
  padding-left: 20px;
`;

const Nickname = styled(Span)`
  font-size: 12px;
  margin-right: 100px;
`;

const Count = styled(Span)`
  font-size: 12px;
`;

const OverlaySize = css`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  ${OverlaySize}
  margin-top: 100%;
  background: rgba(0, 0, 0, 0.3);
  transition: all 1s;
`;

const OverlayWrap = styled.div`
  ${OverlaySize}
  overflow: hidden;
  position: absolute;
  background: gray;
  &:hover ${Overlay} {
    margin-top: 50%;
  }
`;

const BestImg = styled.img`
  width: 380px;
  height: 300px;
  display: block;
  background: #686868;
`;

const Like = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background: #7f7f7f;
`;
