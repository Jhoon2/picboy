// 다솜님
// 완료된 움짤 디테일 페이지
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getComment, __postComment } from '../redux/modules/comments';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';


// img
import Download from '../images/download-btn.png';
import LikeBefore from '../images/like-before.png';
import LikeClick from '../images/like-click.png'
import LikeCount from '../images/like-count.png';

// components
import CommentBox from '../components/completeDetail/CommentBox';
import Footer from '../components/Footer'

const CompleteDetail = () => {
  const baseURL = process.env.REACT_APP_API_KEY;
  const params = useParams();

  //redux
  const [commentInput, setCommentInput] = useState('')
  const { comments } = useSelector((state) => state.comments)
  const dispatch = useDispatch();

  ///////////////////////
  //댓글등록
  const commentChange = (e) => {
    setCommentInput(e.target.value)
  }

  const commentApply = () => {
    if (commentInput === '') return

    const payload = {
      id: params.id,
      content: commentInput
    }
    dispatch(__postComment(payload))
    setCommentInput('')
  }


  useEffect(() => {
    dispatch(__getComment(params.id))
  }, [dispatch])

  /////////////////////////
  // axios get

  const [gif, setGif] = useState("");

  const gifApi = () => {
    const url = `${baseURL}/post/gif/detail/${params.id}`;
    axios.get(`${baseURL}/post/gif/detail/${params.id}`,
      {
        headers: { "Authorization": accessToken, "Refresh-Token": refreshToken }
      }
    )
      .then(function (response) {
        setGif(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
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

  ////////////////////////////
  // like
  const [likeState, setLikeState] = useState(false);
  const [likeApi, setLikeApi] = useState();
  const accessToken = getCookieToken();
  const refreshToken = getRefreshToken();

  const likeHandler = (e) => {

    if (accessToken === undefined) {
      alert('로그인 후 이용 가능합니다.');
    } else {
      setLikeState(!likeState);
      axios.post(
        `${baseURL}/post/like/${params.id}`, {
        like: 0,
      },
        {
          headers: { "Authorization": accessToken, "Refresh-Token": refreshToken }
        }
      )
        .then(function (response) {
          setLikeApi(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    console.log(gif.liked);
  }, [likeApi])

  /////////////////
  // toggle
  const [toggleBoolean, setToggleBoolean] = useState(false);

  const toggleHandler = () => {
    setToggleBoolean(!toggleBoolean);
  }

  return (
    <>
      <TitleBanner>
        <ContentsTitle>COMPLETE</ContentsTitle>
      </TitleBanner>
      <WidthWrap>


        {/* git / img info start */}
        <GifInfo>
          <CompleteGif><GifWrap src={gif.gifUrl} alt="gif" /></CompleteGif>
          <ImgListToggleWrap>
            <ImgListToggleText>사용자 정보 한번에 보기</ImgListToggleText>
            <ToggleWrap>
              <ToggleInput type="checkbox" onClick={toggleHandler} />
              <ToggleCheck style={toggleBoolean ? { left: '68%' } : {}} />
            </ToggleWrap>
          </ImgListToggleWrap>
          <Slider {...settings}>
            {
              imgList && imgList.map((img) => (
                <ImgListWrap key={img.frameNum} >
                  <ImgList src={img.imgUrl} alt="" />
                  <ImgListHoverInfoWrap
                    style={toggleBoolean ? { backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '3px solid #000' } : { opacity: '0' }}
                  >
                    <ImgListHoverFrameInfo>{img.frameNum}/{gif.frameTotal}</ImgListHoverFrameInfo>
                    <ImgListHoverUserInfoWrap>
                      <ImgListHoverUserProfile src={img.profileimg} alt="" />
                      <ImgListHoverUserNickName>{img.nickname}</ImgListHoverUserNickName>
                    </ImgListHoverUserInfoWrap>
                  </ImgListHoverInfoWrap>
                </ImgListWrap>
              ))
            }
          </Slider>
          {/* git / img info end */}


          {/* topic info start */}
          <Community>
            <ContentsBtn>
              <BtnImg src={Download} alt="" />
              {
                gif.liked ?
                  <BtnImg src={LikeClick} onClick={likeHandler} alt="" /> : <BtnImg src={LikeBefore} onClick={likeHandler} alt="" />
              }
            </ContentsBtn>
            <ContentsLine />
            <SuggestionInfo>
              <SuggestionInfoTitleWrap>
                <SuggestionInfoTitle>제시어</SuggestionInfoTitle>
                <SuggestionInfoLikeCountWrap>
                  <img src={LikeCount} alt="" />
                  <SuggestionInfoLikeCount>{gif.likeCount}</SuggestionInfoLikeCount>
                </SuggestionInfoLikeCountWrap>
              </SuggestionInfoTitleWrap>
              <Suggestion>{
                gif.topic === null ? <div>제시어가 없습니다.</div> : `${gif.topic}`
              }</Suggestion>
            </SuggestionInfo>
            {/* topic info end */}


            {/* comment start */}
            <CommentWrap>
              <CommentTitle>댓글<div>{ }</div></CommentTitle>
              <ContentsLine />
              <CommentInput onChange={commentChange} value={commentInput} placeholder="댓글을 남겨주세요." />
              <CommentPostBtn onClick={commentApply}>게시하기</CommentPostBtn>
              <CommentList style={comments.length === 0 ? { border: 'none' } : {}}>
                {
                  comments && comments.map((commentList, idx) =>
                    <CommentBox commentList={commentList} key={idx} />
                  )
                }
              </CommentList>
            </CommentWrap>
            {/* comment end */}
          </Community>
        </GifInfo>
      </WidthWrap>
      <Footer />
    </>
  )


}

const ImgListToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const ImgListToggleText = styled.div`
  margin-right: 16px;
`;

const ToggleWrap = styled.label`
    width: 65px;
    height: 26px;
    margin-bottom: 26px;
    display: flex;
    position: relative;
    display: inline-block;
    background-color: #D9D9D9;
    border-radius: 14px;
    cursor: pointer;
`;

const ToggleInput = styled.input`
    opacity: 0;
`;

const ToggleCheck = styled.span`
    width: 16px;
    height: 16px;
    position: absolute;
    top: 20.2%;
    left: 11%;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
    &:after{
        background-color: red;
    }
`;

const TitleBanner = styled.div`
  width: 100%;
  height: 314px;
  border-bottom: 1px solid #a3a3a3;
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
`;

const WidthWrap = styled.div`
  width: 1200px;
  margin: 120px auto;
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
  position: relative;
`;

const ImgList = styled.img`
  width: 175px;
  height: 175px;
  transition: 0.2s;
  &:hover{
    border: 3px solid #000;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ImgListHoverInfoWrap = styled.div`
  position: absolute;
  top: 0;
  width: 175px;
  height: 175px;
`;

const ImgListHoverFrameInfo = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;

const ImgListHoverUserInfoWrap = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  color: #fff;
`;

const ImgListHoverUserProfile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ImgListHoverUserNickName = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-top: 2px;
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
  border-bottom: 1px solid #a3a3a3;
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
  color: #a3a3a3;
`;

const Suggestion = styled.div`
  font-size: 30px;
  font-weight: 400;
`;

const CommentWrap = styled.div``;

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
  border: 1px solid #a3a3a3;
`;

export default CompleteDetail;
