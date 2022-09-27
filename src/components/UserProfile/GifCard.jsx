import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useMyContext } from '../../shared/ContextApi';

//axios, apis
import instance from '../../shared/apis';
import api from '../../shared/apis';
import axios from 'axios';
import { anyApis } from '../../shared/apis';
import styled from 'styled-components';
import AllParticipants from './AllParticipants';
import MySpecialButton from './MySpecialButton';

//이미지
import download from '../../images/mypage/download.png'
import heart from '../../images/mypage/like-before.png'
import colorHeart from '../../images/mypage/like-after.png'
import basicImg from '../../images/mypage/basicImg.png'
import favorite from '../../images/favorite@2x.png'
import moreHoriz from '../../images/More horiz@2x.png'
import textbox from '../../images/Mode comment.png'
import grayEyes from '../../images/mypage/grayEyes.png'
import completeIcon from '../../images/mypage/complete.png'
import progressIcon from '../../images/mypage/progress.png'
import clickDownload from '../../images/mypage/clickDownload.png'

const GifCard = ({ data, myImg, myNickname }) => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_KEY;

  // 참여자들 보여주기
  const [allParticipants, setAllParticipants] = useState(false)
  const [peopleData, setPeopleData] = useState()
  const showAllParticipants = async(e) => {
    e.stopPropagation();
    const peopleData = await instance.get(`/post/join-list/${data.postId}`);
    const datas = peopleData && peopleData.data.data;
    if (datas.length <= 1) {
      setAllParticipants(false);
    } else {
      setPeopleData(datas);
      setAllParticipants(!allParticipants);
    }
  };

  //완료 페이지, 진행중 페이지 이동
  const movePage = () => {
    if (data.status === 1) {
      navigate(`/progressdetail/${data.postId}`);
    } else {
      navigate(`/complete-detail/${data.postId}`);
    }
  };

  //... 버튼
  const [openSpecialModal, setOpenSpecialModal] = useState(false);
  const buttonCollection = (e) => {
    e.stopPropagation();
    setOpenSpecialModal(!openSpecialModal);
  };

  //좋아요 버튼

  const [likePlus, setLikePlus] = useState(data.likesFlag && data.likesFlag);
  const [smallLikeBtn, setSmallLikeBtn] = useState(
    data.likeCount && data.likeCount
  );

  useEffect(() => {
    setSmallLikeBtn(data.likeCount && data.likeCount);
  }, [data.likeCount && data.likeCount]);

  const clickLikeBtn = (e) => {
    e.stopPropagation();
    setLikePlus(!likePlus);
    anyApis.liked(data.postId, '').then((response) => {
      if (!response.data.data.like) {
        setSmallLikeBtn(smallLikeBtn - 1);
      } else {
        setSmallLikeBtn(smallLikeBtn + 1);
      }
    });
  };

  return (
    <CardContainer>
     
        <OverlayWrap>
          <GifImg src={data.gifUrl ??data.imgUrl } />
          <Badge src={data.status === 1 ? progressIcon : completeIcon} />          
          <OverlayImg onClick={movePage} openSpecialModal={openSpecialModal}>
          <HoverSideButton onClick={buttonCollection}><HorizBtn src={moreHoriz} /></HoverSideButton>
          <HoverContent>
            <div style={{ color: 'white' }}>
              {data.topic ? data.topic : null}
            </div>
            <div style={{ display: 'flex' }}>
              {data.status === 2 ? (
                <a
                  href={`${baseURL}/download?postId=${data.postId}&fileName=${data.gifUrl}`}
                  download="free"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ClickCircleDownload />
                </a>
              ) : null}
              {/* 좋아요기능 */}
              <ClickCircle
                src={likePlus ? colorHeart : heart}
                onClick={clickLikeBtn}
              />
            </div>
          </HoverContent>
        </OverlayImg>
      </OverlayWrap>
      <GifContents>
        <UserProfileContent onClick={showAllParticipants}>
          <ProfileImage src={!data.profileImg ? basicImg : data.profileImg} />
          {data.memberCount ? (
            <Participants>
              <div
                style={{
                  marginTop: '5px',
                  marginLeft: '5px',
                  fontSize: '10px',
                }}
              >
                +{data.memberCount}
              </div>
            </Participants>
          ) : null}
          <Texts>
            {data.nickname}
            {data.memberCount ? <>외 {data.memberCount}명</> : null}
          </Texts>
        </UserProfileContent>
        <div style={{ display: 'flex' }}>
          <Icons>
            <IconImg src={grayEyes} />
          </Icons>
          <LikeCount>{data.viewCount}</LikeCount>
          {data.status === 2 ? (
            <>
              <Icons>
                <IconImg src={textbox} />
              </Icons>
              <LikeCount>{data.commentCount}</LikeCount>
            </>
          ) : null}
          <Icons>
            <IconImg src={favorite} />
          </Icons>
          <LikeCount>{smallLikeBtn}</LikeCount>
        </div>
      </GifContents>
      {/* ...버튼 */}
      <MySpecialButton
        shown={openSpecialModal}
        close={() => {
          setOpenSpecialModal(false);
        }}
        setOpenSpecialModal={setOpenSpecialModal}
        postId={data.postId}
        data={data}
      />
      {/* 참여자들 */}.
      <CardInner>
        <AllParticipantsContainer>
          {allParticipants ? (
            <AllParticipants
              shown={allParticipants}
              close={() => {
                setAllParticipants(false);
              }}
              data={peopleData}
              Firstickname={data.nickname}
              FirstProfileImg={!data.profileImg ? basicImg : data.profileImg}
            />
          ) : null}
        </AllParticipantsContainer>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 350px;
  height: 400px;
  margin-top: 50px;
  margin-left: 35px;
  position: relative;
`;

const CardInner = styled.div`
  width: 350px;
  height: 30px;
  position: relative;
  top: 400px;
  left: -350px;
`;

const GifImg = styled.img`
  width: 350px;
  height: 310px;
  background-color: white;
`;

const OverlayImg = styled.div`
  width: 350px;
  height: 330px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.openSpecialModal ? 1 : 0)};
  cursor: pointer;

  ${GifImg}
  margin-top: 100%;
  height: 310px;
  background: linear-gradient(
    360deg,
    #000000 -90.11%,
    rgba(103, 103, 103, 0) 67.83%
  );
  transition: all 1s;

  &:hover {
    opacity: 1;
  }
`;

const OverlayWrap = styled.div`
  ${OverlayImg}
  overflow: hidden;
  position: absolute;
  background: url(${(props) => props.productImg});
  ${({ theme }) => theme.backgroundSet('contain')};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  transition: 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }
  &:hover ${GifImg} {
    /* margin-top: 20%; */
  }
`;

const Badge = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 5;
`;

const HoverSideButton = styled.button`
  padding: 1rem;
  font-size: 30px;
  border: none;
  float: right;
  cursor: pointer;
  background-color: transparent;
`;
const HorizBtn = styled.img`
  width: 30px;
  height: 30px;
`;

const HoverContent = styled.div`
  margin-top: 260px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
`;

const ClickCircle = styled.img`
  width: 46px;
  height: 46px;
  margin-top: -18px;
  border-radius: 46px;
  cursor: pointer;

  :first-child {
    margin-right: 10px;
  }
`;

const ClickCircleDownload = styled.img`
  width: 46px;
  height: 46px;
  margin-top: -18px;
  border-radius: 46px;
  background: url(${download});
  ${({ theme }) => theme.backgroundSet('contain')};

  cursor: pointer;

  :first-child {
    margin-right: 10px;
  }

  &:hover {
    background: url(${clickDownload});
    ${({ theme }) => theme.backgroundSet('contain')};
  }
`;

const GifContents = styled.div`
  margin-top: 330px;
  display: flex;
  justify-content: space-between;
`;

const Icons = styled.div`
  margin-left: 15px;
  font-size: 30px;
`;

const UserProfileContent = styled.div`
  display: flex;

  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 50px;
  border: 2px lightgray solid;
  cursor: pointer;
`;
const IconImg = styled.img`
  width: 17px;
  height: 15px;
`;

const Texts = styled.div`
  margin-top: 17px;
  margin-left: 15px;
  font-size: ${(props) => props.theme.Caption2};
`;
const LikeCount = styled.div`
  margin-top: 13px;
  margin-left: 3px;
  font-weight: ${(props) => props.theme.HeadlineRG};
  font-size: ${(props) => props.theme.Caption2};
  color: ${(props) => props.theme.inactive};
`;
const AllParticipantsContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;

const Participants = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 40px;
  border-radius: 24px;
  font-size: 9px;
  color: white;
  background-color: black;
`;

export default GifCard;
