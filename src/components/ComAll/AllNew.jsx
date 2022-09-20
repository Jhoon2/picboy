import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loadings from '../../global/Loading';
import user from '../../images/user.png';
import LikeButton from '../../images/Com/like.svg';
import DownButton from '../../images/Com/download.svg';
import bubble1 from '../../images/bubble1.png';
import Comm from '../../images/Com/Comm.svg';
import Heart from '../../images/Com/Heart.svg';

const All = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [newData, setNewdata] = useState([]);
  const [check, setCheck] = useState([]);
  const [ref, setRef] = useState(null);
  const baseURL = process.env.REACT_APP_API_KEY;

  const getCompleteData = async () => {
    setLoad(true);
    try {
      const { data } = await axios.get(
        `${baseURL}/post/gif/1?size=6&page=${page}`
      );
      if (!data) {
        return;
      }
      setNewdata(newData.concat(data.data));
      setCheck(check.concat(data));
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  console.log(check[0]);

  useEffect(() => {
    getCompleteData();
  }, [page]);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

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
      {load === true ? <Loadings /> : null}
      {newData.map((item, index) => {
        return (
          <BestBox
            key={item.id}
            onClick={() => {
              navigate(`/complete-detail/${item.id}`);
            }}
          >
            <div style={{ position: 'relative' }}>
              <OverlayWrap productImg={item?.gifUrl}>
                <Overlay>
                  <DescBox>
                    <Keyword>{item?.topic}</Keyword>
                    <Download />
                    <Like />
                  </DescBox>
                </Overlay>
              </OverlayWrap>
              <BestImg />
            </div>
            <BestDesc>
              <Profile img={user} />
              <Nickname>
                {item?.nickname} 등 {item?.participantCount} 명
              </Nickname>
              <CommentBox>
                <CommentImg />
                <DescText>{item?.commentCount}</DescText>
              </CommentBox>
              <LikeBox>
                <LikesImg />
                <DescText>{item?.likeCount}</DescText>
              </LikeBox>
            </BestDesc>
          </BestBox>
        );
      })}
      <>
        <div ref={setRef}>isLoading</div>
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
`;

const BestBox = styled(Width)`
  height: 300px;
  margin-top: 50px;
  display: inline-block;
  margin-left: 35px;
`;

const BestDesc = styled(Width)`
  height: 50px;
  margin-top: 15px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
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
  margin-right: 20px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')};
  background-size: 100% 95%;
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
`;

const Keyword = styled(Span)`
  padding-top: 230px;
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
  top: 130px;
  right: 70px;
  background: url(${DownButton});
  ${({ theme }) => theme.backgroundSet('contain')};
`;

const Like = styled(Download)`
  right: 10px;
  background: url(${LikeButton});
`;

const Nickname = styled(Span)`
  margin-right: 60px;
  display: inline-block;
  padding: 15px 0;
  position: relative;
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #2e3248;
  line-height: 180%;
  letter-spacing: -0.02em;
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
  transition: 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }
  &:hover ${Overlay} {
    margin-top: 30%;
  }
`;

const BestImg = styled.div`
  width: 350px;
  height: 300px;
  display: block;
`;

const CommentBox = styled.div`
  width: 70px;
  padding-left: 20px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const CommentImg = styled.div`
  width: 18px;
  height: 15px;
  background: url(${Comm});
  ${({ theme }) => theme.backgroundSet('contain')}
`;

const LikesImg = styled(CommentImg)`
  background: url(${Heart});
`;

const LikeBox = styled(CommentBox)`
  margin-left: 10px;
`;

const DescText = styled.span`
  margin-left: 5px;
  font-family: 'NotoLight';
  font-size: 15px;
  line-height: 20px;
  color: #a3a3a3;
`;
