import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user from '../../images/user.png';
import bubble1 from '../../images/bubble1.png';

const TopicNew = () => {
  const navigate = useNavigate();
  const [randomData, setRandomData] = useState([]);
  const [page, setPage] = useState(0);
  const lastIntersectingData = useRef(null);
  const baseURL = process.env.REACT_APP_API_KEY;

  const TopicNewData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/post/gif/topic-ok/1?size=6&page=${page}`
      );
      if (!data) {
        return;
      }
      setRandomData(randomData.concat(data.data));
      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TopicNewData();
  }, [page]);

  //observe 콜백 함수
  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //조건이 트루
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        setPage((page) => page + 1);
        // 현재 타겟을 observe한다.
        observer.observe(entry.target); // unobserve가 아님
      }
    });
  };

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer;
    if (lastIntersectingData) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersectingData.current);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingData]);

  return (
    <ListBox>
      <>
        {randomData.map((item, index) => {
          return (
            <BestBox
              key={item.id}
              onClick={() => {
                navigate(`/complete-detail/${item.id}`);
              }}
            >
              <div style={{ position: 'relative' }}>
                <OverlayWrap productImg={item?.imgUrl}>
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
                <Profile />
                <Nickname>
                  {item?.nickname} 외 {item?.participantCount} 명
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
        <div ref={lastIntersectingData}>.</div>
      </>
    </ListBox>
  );
};

export default TopicNew;

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
