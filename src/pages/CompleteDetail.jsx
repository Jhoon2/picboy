// 다솜님
// 완료된 움짤 디테일 페이지
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// img
import Download from '../images/download-btn.png';
import LikeBefore from '../images/like-before.png';
import LikeCount from '../images/like-count.png';

const CompleteDetail = () => {

  // axios 

  const [gif, setGif] = useState("");

  //
  const baseURL = process.env.REACT_APP_API_KEY;

  const gifApi = () => {
    const url = `${baseURL}/post/gif/detail/1`;
    axios
      .get(url)
      .then(function (response) {
        setGif(response.data.data);
      })
      .catch(function (error) {
        console.log("error");
      });
  }

  useEffect(() => {
    gifApi();
  }, []);


  // carousel
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6
  };

  const imgList = gif.frameImgList;
  console.log(gif && gif.commentListResponseDtoList[5].createdAt);


  // time moment

  return (
    <>
      <div>CompleteDetail Header</div>
      <TitleBanner>
        <ContentsTitle>COMPLETE</ContentsTitle>
      </TitleBanner>
      <WidthWrap>
        <GifInfo>
          <CompleteGif><GifWrap src={gif.gifUrl} alt="gif" /></CompleteGif>
          <Slider {...settings}>
            {
              imgList && imgList.map((list) => {
                return (
                  <>
                    <ImgListWrap>
                      <ImgGrey />
                      <ImgList src={list.imgUrl} alt="" />
                    </ImgListWrap>
                  </>
                );
              })
            }
          </Slider>
          <Community>
            <ContentsBtn>
              <BtnImg src={Download} alt="" />
              <BtnImg src={LikeBefore} alt="" />
            </ContentsBtn>
            <ContentsLine />
            <SuggestionInfo>
              <SuggestionInfoTitleWrap>
                <SuggestionInfoTitle>제시어</SuggestionInfoTitle>
                <SuggestionInfoLikeCountWrap>
                  <img src={LikeCount} alt="" />
                  <SuggestionInfoLikeCount>
                    {gif.likeCount}
                  </SuggestionInfoLikeCount>
                </SuggestionInfoLikeCountWrap>
              </SuggestionInfoTitleWrap>
              <Suggestion>{gif.topic}</Suggestion>
            </SuggestionInfo>
            <CommentWrap>
              <CommentTitle>댓글<div>{ }</div></CommentTitle>
              <ContentsLine />
              <CommentInput placeholder="댓글을 남겨주세요." />
              <CommentPostBtn>게시하기</CommentPostBtn>
              <CommentList>
                {
                  gif && gif.commentListResponseDtoList.map((commentList) => {
                    return (
                      <Comment>
                        <CommentUserProfileImg src={commentList.profileImg} alt="" />
                        <div>
                          <CommentUserNickName>{commentList.nickname}</CommentUserNickName>
                          <UserComment>{commentList.comment}</UserComment>
                        </div>
                      </Comment>
                    );
                  })
                }
              </CommentList>
            </CommentWrap>
          </Community>
        </GifInfo>

      </WidthWrap>
    </>
  )
}

const TitleBanner = styled.div`
    width: 100%;
    height: 314px;
    border-bottom: 1px solid #A3A3A3;
    display: flex;
    justify-content: center;
    background-color: #F4F4F4;
`;

const WidthWrap = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const ContentsTitle = styled.div`
    margin-top: 124px;
    font-size: 80px;
    font-weight: 400;
`;

const GifInfo = styled.div`
    margin-top: 64px;
`;

const CompleteGif = styled.div`
    width: 688px;
    height: 688px;
    margin: 0 auto;
    margin-bottom: 126px;
    background-color: #e9e9e9;
`;

const GifWrap = styled.img`
    width: 688px;
    height: 688px;
`;

const ImgListWrap = styled.div`
    width: 175px;
    height: 175px;
    margin-left: 12px;
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover{
        border: 3px solid #000;
    }
`;

const ImgList = styled.img`
    width: 169px;
    height: 169px;
`;

const ImgGrey = styled.img`
`;

const BtnImg = styled.img`
    cursor: pointer;
    margin-left: 12px;
`;

const Community = styled.div`
    margin-top: 92px;
`;

const ContentsBtn = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ContentsLine = styled.div`
    margin: 16px 0 24px 0;
    border-bottom: 1px solid #A3A3A3;
`;

const SuggestionInfo = styled.div`
    margin-bottom: 114px;
`;

const SuggestionInfoTitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const SuggestionInfoTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
`;

const SuggestionInfoLikeCountWrap = styled.div`
    display: flex;
    align-items: center;
`;

const SuggestionInfoLikeCount = styled.span`
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
    color: #A3A3A3;
`;

const Suggestion = styled.div`
    font-size: 30px;
    font-weight: 400;
`;

const CommentWrap = styled.div`
`;

const CommentTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
`;

const CommentInput = styled.textarea`
    width: 1200px;
    height: 164px;
    margin-bottom: 32px;
    padding: 24px;
    border: 2px solid #e6e6e6;
    font-size: 20px;
`;

const CommentPostBtn = styled.div`
    cursor: pointer;
    display: inline;
    border: 2px solid #000;
    padding: 12px 58px;
    float: right;
    font-size: 16px;
    font-weight: 700;
`;

const CommentList = styled.div`
    width: 1200px;
    margin-top: 120px;
    border: 1px solid #A3A3A3;
`;

const Comment = styled.div`
    display: flex;
    padding: 36px;
    &:hover {
        background-color: #f8f8f8;
    }
`;

const CommentUserProfileImg = styled.img`
    width: 73px;
    height: 73px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 24px;
`;

const CommentUserNickName = styled.div`
    margin: 8px 0 24px 0;
    font-size: 20px;
    font-weight: 700;
`;

const UserComment = styled.div`
    font-size: 20px;
    font-weight: 400;
`;
export default CompleteDetail