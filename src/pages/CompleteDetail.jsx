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
import Arrow from '../images/complete-detail-arrow-left.png';
import BgTop from '../images/complete-detail-bg-top.png';
import BgBottom from '../images/complete-detail-bg-bottom.png';
import clickDownload from '../images/clickDownload.png'
// components
import CommentBox from '../components/completeDetail/CommentBox';
import { useMyContext } from '../shared/ContextApi';
import AnyModal from '../elem/AnyModal';

//apis
import { anyApis } from '../shared/apis';
import instance from '../shared/apis';
import { api } from '../shared/apis';

const CompleteDetail = () => {
  const baseURL = process.env.REACT_APP_API_KEY;

  const params = useParams();
  const myContext = useMyContext();
  //redux
  const [commentInput, setCommentInput] = useState('')
  const { comments } = useSelector((state) => state.comments)
  const dispatch = useDispatch();

  ///////////////////////
  //댓글등록
  const commentChange = (e) => {
    if (accessToken === undefined) return myContext.setCommetApplyBtn(true);
    setCommentInput(e.target.value)
    
  }
  
  const commentApply = () => {
    if (accessToken === undefined) return myContext.setCommetApplyBtn(true);
    if (commentInput === '') return
    const payload = {
      id: params.id,
      content: commentInput
    }
    dispatch(__postComment(payload))
    setCommentInput('')
    myContext.setCommetDeleteBtn(false)
  }


  useEffect(() => {
    dispatch(__getComment(params.id))
  }, [dispatch])

  /////////////////////////
  // axios get

  const [gif, setGif] = useState("");
  const [likeCountState, setLikeCountState] = useState();

  const gifApi = () => {
    instance.get(`/post/gif/detail/${params.id}`)
      .then(function (response) {
        setGif(response.data.data);
        setLikeCountState(response.data.data.likeCount);
        setLikeApi(response.data.data.liked);
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
  const [likeApi, setLikeApi] = useState();
  const accessToken = getCookieToken();

  const likeHandler = (e) => {

    if (accessToken === undefined) {
      myContext.setCommetApplyBtn(true);
    } else {
      // setLikeState(!likeState);
      const info = {
        like: 0
      }
      anyApis.liked(params.id, info)

        .then(function (response) {
          setLikeApi(response.data.data.like);
          if (likeApi === false) {
            setLikeCountState(likeCountState + 1);
          } else if (likeApi === true) {
            setLikeCountState(likeCountState - 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  /////////////////
  // toggle
  const [toggleBoolean, setToggleBoolean] = useState(false);

  const toggleHandler = () => {
    setToggleBoolean(!toggleBoolean);
  }

  //////////////
  // nav
  const arrowNav = () => {
    window.location.replace("/CompList");
  }

  ///////////////////////
  // save image
  const saveImg = () => {
    if (accessToken === undefined) return myContext.setCommetApplyBtn(true);

  }


  return (
    <>
      {myContext.commetApplyBtn ? (
        <ErrorBox onClick={() => myContext.setCommetApplyBtn(false)}>
          <AnyModal title="회원정보" content="로그인 후 가능합니다" />
        </ErrorBox>
      ) : null}
      <div style={{ position: 'relative' }}>
        <TitleBanner>
          <div onClick={arrowNav}><TitleArrow src={Arrow} alt="" /></div>
          <ContentsTitle>COMPLETE</ContentsTitle>
        </TitleBanner>
        <WidthWrap>


          {/* git / img info start */}
          <GifInfo>
            <CompleteGif><GifWrap src={gif.gifUrl} alt="gif" /></CompleteGif>
            <ImgListToggleWrap>
              <ImgListToggleText>사용자 정보 한번에 보기</ImgListToggleText>
              <ToggleWrap style={toggleBoolean ? { backgroundColor: '#000' } : {}}>
                <ToggleInput type="checkbox" onClick={toggleHandler} />
                <ToggleCheck style={toggleBoolean ? { left: '52%' } : {}} />
              </ToggleWrap>
            </ImgListToggleWrap>
            <Slider {...settings}>
              {
                imgList && imgList.map((img) => (
                  <ImgListWrap key={img.frameNum} >
                    <ImgList src={img.imgUrl} alt="" />
                    <ImgListHoverInfoWrap
                      style={toggleBoolean ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : { opacity: '0' }}
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
                <a href={`${baseURL}/download?postId=${Number(params.id)}&fileName=${gif.gifUrl}`} onClick={saveImg}>
                  <DownloadImg />
                </a>
                {
                  likeApi ?
                    <BtnImg src={LikeClick} onClick={likeHandler} alt="" />
                    :
                    <BtnImg src={LikeBefore} onClick={likeHandler} alt="" />
                }
              </ContentsBtn>
              <ContentsLine />
              <SuggestionInfo>
                <SuggestionInfoTitleWrap>
                  <SuggestionInfoTitle>제시어</SuggestionInfoTitle>
                  <SuggestionInfoLikeCountWrap>
                    <img src={LikeCount} alt="" />
                    <SuggestionInfoLikeCount>{likeCountState}</SuggestionInfoLikeCount>
                  </SuggestionInfoLikeCountWrap>
                </SuggestionInfoTitleWrap>
                <Suggestion>{
                  gif.topic === null ? <div>제시어가 없습니다.</div> : `${gif.topic}`
                }</Suggestion>
              </SuggestionInfo>
              {/* topic info end */}


              {/* comment start */}
              <CommentWrap>
                <CommentTitle>댓글<span style={{ marginLeft: '8px', color: '#a3a3a3' }}>{comments.length}</span></CommentTitle>
                <ContentsLine />
                <CommentInput onChange={commentChange} maxLength='80' value={commentInput} placeholder="댓글을 남겨주세요." />
                <CommentPostBtn onClick={commentApply}>게시하기</CommentPostBtn>
                <CommentList style={comments.length === 0 ? { border: 'none' } : {}}>
                  {
                    comments && comments.map((commentList, idx) =>
                      <CommentBox commentList={commentList} key={idx} accessToken={accessToken} />
                    )
                  }
                </CommentList>
              </CommentWrap>
              {/* comment end */}
            </Community>
          </GifInfo>
          <BgTopStyle src={BgTop} alt='' />
          <BgBottomStyle src={BgBottom} alt='' />
        </WidthWrap>
      </div>
    </>
  )
}
const ErrorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const BgTopStyle = styled.img`
  width: 100%;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: -100;
`;

const BgBottomStyle = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -100;
`;

const TitleBanner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const WidthWrap = styled.div`
  width: 944px;
  margin: 0px auto;
  padding-bottom: 120px;
`;

const ContentsTitleWrap = styled.div`
  display: flex;
  `;

const ContentsTitle = styled.div`
  margin-top: 230px;
  font-family: 'SilkBold';
  font-size: 65px;
  letter-spacing: -0.04em;
`;

const TitleArrow = styled.img`
  float: left;
  margin-top: 270px;
  margin-left: -280px;
  cursor: pointer;
`;

const GifInfo = styled.div`
  margin-top: 64px;
`;

const CompleteGif = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto;
  margin-bottom: 25px;
  border: 1px solid #e6e6e6;
`;

const GifWrap = styled.img`
  width: 400px;
  height: 400px;
  background-color: #fff;
  z-index: 999;
`;

const ImgListWrap = styled.div`
  position: relative;
`;

const ImgList = styled.img`
  width: 145px;
  height: 145px;
  transition: 0.2s;
  border: 1px solid #e6e6e6;
`;

const ImgListHoverInfoWrap = styled.div`
  position: absolute;
  top: 0;
  width: 145px;
  height: 145px;
`;

const ImgListHoverFrameInfo = styled.div`
  padding: 2px 6px 0 6px;
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #000;
`;

const ImgListHoverUserInfoWrap = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  color: #fff;
`;

const ImgListHoverUserProfile = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ImgListHoverUserNickName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-top: 2px;
`;

const ImgListToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const ImgListToggleText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #a3a3a3;
  margin-right: 8px;
  margin-top: -24px;
`;

const ToggleWrap = styled.label`
    width: 50px;
    height: 26px;
    margin-bottom: 26px;
    display: flex;
    position: relative;
    display: inline-block;
    background-color: #D9D9D9;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s;
`;

const ToggleInput = styled.input`
    opacity: 0;
`;

const ToggleCheck = styled.span`
    width: 22px;
    height: 22px;
    position: absolute;
    top: 8%;
    left: 5%;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
    &:after{
        background-color: red;
    }
`;
const DownloadImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background: url(${Download});
  ${({ theme }) => theme.backgroundSet('contain')};
  cursor: pointer;
  margin-left: 12px;

  &:hover{
    background: url(${clickDownload});
    ${({ theme }) => theme.backgroundSet('contain')};
  }
`;

const BtnImg = styled.img`
  width: 46px;
  height: 46px;
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
  border: 1px solid #E6E6E6;
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
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.04em;
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
  font-size: 18px;
  font-weight: 400;
`;

const CommentWrap = styled.div``;

const CommentTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const CommentInput = styled.textarea`
  width: 944px;
  height: 123px;
  margin-bottom: 16px;
  padding: 24px;
  border: 2px solid #e6e6e6;
  font-size: 14px;
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
  width: 944;
  margin-top: 120px;
  border: 1px solid #e6e6e6;
`;

export default CompleteDetail;
