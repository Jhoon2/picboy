import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Loadings from '../../global/Loading';
import Report from '../../elem/Report';
import LikeButton from '../../images/Com/like.svg';
import DownButton from '../../images/Com/download.svg';
import userView from '../../images/Com/userView.svg';
import userLike from '../../images/Com/userLike.svg';
import userComm from '../../images/Com/userComm.svg';

const All = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [newData, setNewdata] = useState([]);
  const [ref, setRef] = useState(null);
  const baseURL = process.env.REACT_APP_API_KEY;

  const getCompleteData = async () => {
    setLoad(true);
    try {
      const { data } = await axios.get(
        `${baseURL}/post/gif/0/1?page=${page}&size=6`
      );
      if (!data) {
        return;
      }

      setNewdata(newData.concat(data.data.content));
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    getCompleteData();
  }, [page]);

  const options = {
    rootMargin: '30px',
    threshold: 0.5,
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);

        observer.observe(entry.target);
      }
    });
  };

  // setTimeout(() => {
  //   observer.observe(ref);
  // }, 500);


  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, options);
      setTimeout(() => {
        observer.observe(ref);
      }, 500);
    }
    return () => observer && observer.disconnect();
  }, [ref]);

  return (
    <ListBox>
      {/* {load === true ? <Loadings /> : null} */}
      {newData.map((item, index) => {
        return (
          <BestBox key={uuidv4()}>
            <div style={{ position: 'relative' }}>
              <OverlayWrap productImg={item?.gifUrl}>
                <Report item={item} />
                <Overlay
                  onClick={() => {
                    navigate(`/complete-detail/${item.id}`);
                  }}
                >
                  <DescBox>
                    <DescBox>
                      {item?.topic === null ? (
                        <Keyword>FREE</Keyword>
                      ) : (
                        <Keyword> {item?.topic}</Keyword>
                      )}
                    </DescBox>
                    <Download />
                    <Like />
                  </DescBox>
                </Overlay>
              </OverlayWrap>
              <BestImg />
            </div>
            <BestDesc>
              <Profile img={item?.profileImg} />
              <Nickname>
                {item?.participantCount <= 0 ? (
                  <>{item?.nickname} </>
                ) : (
                  <>
                    {item?.nickname} 외 {item?.participantCount} 명
                  </>
                )}
              </Nickname>
              <InforBox>
                <ViewsBox>
                  <ViewsImg />
                  {item?.viewCount > 999 ? (
                    <DescText>999+</DescText>
                  ) : (
                    <DescText> {item?.viewCount}</DescText>
                  )}
                </ViewsBox>
                <CommentBox>
                  <CommentImg />
                  {item?.commentCount > 999 ? (
                    <DescText>999+</DescText>
                  ) : (
                    <DescText>
                      <DescText> {item?.commentCount}</DescText>
                    </DescText>
                  )}
                </CommentBox>

                <LikeBox>
                  <LikesImg />
                  {item?.likeCount > 999 ? (
                    <DescText>999+</DescText>
                  ) : (
                    <DescText>
                      <DescText> {item?.likeCount}</DescText>
                    </DescText>
                  )}
                </LikeBox>
              </InforBox>
            </BestDesc>
          </BestBox>
        );
      })}
      <>
        <div ref={setRef}></div>
      </>
    </ListBox>
  );
};

export default All;

const Width = styled.div`
  width: 350px;
`;

const ListBox = styled.div`
  max-width: 1200px;
  margin: auto;
  position: sticky;
  z-index: 1;
`;

const BestBox = styled(Width)`
  height: 300px;
  margin-top: 50px;
  display: inline-block;
  margin-left: 35px;
  background: white;
  transition: 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }
`;

const DescBox = styled(Width)`
  height: 110px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
  position: relative;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
`;

const Profile = styled(Button)`
  margin-right: 15px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('cover')};
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

const Keyword = styled(Span)`
  padding-top: 290px;
  padding-left: 10px;
  font-family: 'Noto Bold';
  font-size: 20px;
  color: white;
`;

const Download = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  top: 165px;
  right: 70px;
  background: url(${DownButton});
  ${({ theme }) => theme.backgroundSet('contain')};
`;

const Like = styled(Download)`
  right: 10px;
  background: url(${LikeButton});
`;

const OverlaySize = css`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  ${OverlaySize}
  margin-top: 100%;
  height: 300px;
  background: white;

  cursor: pointer;
  background: linear-gradient(
    360deg,
    #000000 -90.11%,
    rgba(103, 103, 103, 0) 67.83%
  );
  transition: all 1s;
`;

const OverlayWrap = styled.div`
  ${OverlaySize}
  overflow: hidden;
  position: absolute;
  background: url(${(props) => props.productImg});
  ${({ theme }) => theme.backgroundSet('contain')};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);

  &:hover ${Overlay} {
    margin-top: 20%;
  }
`;

const BestDesc = styled(Width)`
  height: 50px;
  margin-top: 15px;
  position: relative;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

//여기
const Nickname = styled(Span)`
  width: 150px;
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #2e3248;
  line-height: 180%;
  letter-spacing: -0.02em;
`;

const BestImg = styled.div`
  width: 350px;
  height: 300px;
  display: block;
`;

const InforBox = styled.div`
  position: absolute;
  right: 0;
  ${({ theme }) => theme.flexSet('row', 'flex-end', 'center')};
`;

const CommentBox = styled.div`
  width: 50px;
  ${({ theme }) => theme.flexSet('row', 'flex-end', 'center')};
`;

const CommentImg = styled.div`
  width: 13px;
  height: 13px;
  background: url(${userComm});
  ${({ theme }) => theme.backgroundSet('cover')}
  background-size: 100% 100%;
`;

const LikeBox = styled(CommentBox)``;

const LikesImg = styled(CommentImg)`
  width: 14px;
  height: 14px;
  background: url(${userLike});
  background-size: 100% 100%;
`;

const ViewsBox = styled(CommentBox)``;

const ViewsImg = styled(CommentImg)`
  width: 14px;
  height: 10px;
  background: url(${userView});
`;

const DescText = styled.span`
  margin-left: 2px;
  font-family: 'NotoLight';
  font-size: 13px;
  line-height: 20px;
  color: #a3a3a3;
`;
