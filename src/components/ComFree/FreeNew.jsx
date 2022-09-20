import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loadings from '../../global/Loading';
import user from '../../images/user.png';
import bubble1 from '../../images/bubble1.png';

const FreeNew = () => {
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
        `${baseURL}/post/gif/topic-no/1?size=6&page=${page}`
      );
      if (!data) {
        return;
      }
      setNewdata(newData.concat(data.data));
    } catch (error) {
      console.log(error);
    }

    setLoad(false);
  };

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
      {/* {load === true ? <Loadings /> : null} */}
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
                    <Download />
                    <Like />
                  </DescBox>
                </Overlay>
              </OverlayWrap>
              <BestImg />
            </div>
            <BestDesc>
              <Profile />
              <Nickname>
                {item?.nickname} 외 {item?.participantCount}
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
        <div ref={setRef}></div>
      </>
    </ListBox>
  );
};

export default FreeNew;

const ListBox = styled.div`
  max-width: 1200px;
  margin: auto;
`;

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
  margin-top: 15px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const DescBox = styled(Width)`
  height: 110px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
  position: relative;
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

const Download = styled.div`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50px;
  position: absolute;
  right: 70px;
`;

const Like = styled(Download)`
  background: white;
  right: 10px;
`;

const Nickname = styled(Span)`
  font-family: 'NotoLight';
  font-size: 13px;
  margin-right: 20px;
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
  background: url(${(props) => props.productImg});
  ${({ theme }) => theme.backgroundSet('contain')};
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

const CommentBox = styled.div`
  width: 70px;
  padding-left: 20px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const CommentImg = styled.div`
  width: 20px;
  height: 20px;
  background: url(${bubble1});
  ${({ theme }) => theme.backgroundSet('contain')}
`;

const LikeBox = styled(CommentBox)`
  margin-left: 10px;
`;

const LikesImg = styled(CommentImg)``;

const DescText = styled.span`
  margin-left: 5px;
  font-family: 'NotoLight';
  font-size: 15px;
  line-height: 20px;
  color: #a3a3a3;
`;
