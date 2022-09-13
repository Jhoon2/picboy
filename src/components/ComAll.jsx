import React from 'react';
import styled, { css } from 'styled-components';

const ComAll = () => {
  return (
    <>
      <ComBox>
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
        <ComDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </ComDesc>
      </ComBox>

      <ComBox>
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
        <ComDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </ComDesc>
      </ComBox>

      <ComBox>
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
        <ComDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </ComDesc>
      </ComBox>

      <ComBox>
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
        <ComDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </ComDesc>
      </ComBox>

      <ComBox>
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
        <ComDesc>
          <Profile />
          <Nickname>닉네임 어쩌구 저쩌구</Nickname>
          <Like />
          <Count>333</Count>
        </ComDesc>
      </ComBox>
    </>
  );
};

export default ComAll;

const Width = styled.div`
  width: 250px;
`;

const ComBox = styled(Width)`
  display: inline-block;
  height: 250px;
  margin-top: 150px;
  margin-left: 40px;
`;

const ComDesc = styled(Width)`
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
  width: 50px;
  height: 50px;
  margin-left: 60px;
  border-radius: 50px;
`;

const Profile = styled(Button)`
  margin-right: 10px;
  background: #7f7f7f;
`;

const Span = styled.span`
  font-size: 25px;
  font-weight: 800;
`;

const Keyword = styled(Span)`
  font-size: 13px;
  padding-left: 20px;
`;

const Nickname = styled(Span)`
  font-size: 10px;
  padding-right: 8px;
`;

const Count = styled(Span)`
  font-size: 12px;
  padding-left: 8px;
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
  width: 250px;
  height: 250px;
  display: block;
  background: #686868;
`;

const Like = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  background: #7f7f7f;
`;
