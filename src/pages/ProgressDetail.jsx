import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Footer from '../global/Footer';
import plusButton from '../images/plusButton.svg';
import basicImg from '../images/basicImg.jpg';

const ProgressDetail = () => {
  const navigate = useNavigate();

  //토픽이 있을 때
  const [mainSlick, setMainSlick] = useState(null);
  const [pagingSlick, setPagingSlick] = useState(null);
  const mainSlickRef = useRef(null);
  const pagingSlickRef = useRef(null);

  //토픽이 없을 때
  const [mainSlick2, setMainSlick2] = useState(null);
  const [pagingSlick2, setPagingSlick2] = useState(null);
  const mainSlickRef2 = useRef(null);
  const pagingSlickRef2 = useRef(null);

  const baseURL = process.env.REACT_APP_API_KEY;
  const params = useParams();
  const [Data, setData] = useState([]);

  const getProgressData = () => {
    const url = `${baseURL}/post/gif/images/detail/${params.id}`;
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.data);
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.log('error');
      });
  };

  const imgList = Data.frameImgList;
  const Topics = Data && Data.topic;

  const Move = () => {
    navigate(`/post-relay/${params.id}`);
  };

  useEffect(() => {
    getProgressData();
  }, []);

  useEffect(() => {
    setMainSlick(mainSlickRef.current);
    setPagingSlick(pagingSlickRef.current);
    setMainSlick2(mainSlickRef2.current);
    setPagingSlick2(pagingSlickRef2.current);
  }, []);

  const onClickPrev = useCallback((ref) => () => ref.current.slickPrev(), []);
  const onClickNext = useCallback((ref) => () => ref.current.slickNext(), []);

  const showMaxCnt = 6;

  const mainSettings = {
    dots: false,
    initialSlide: imgList && imgList.length - 1,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 100,
  };
  // imgList && imgList.length - 1,

  const pagingSettings = {
    dots: true,
    arrows: false,
    initialSlide: ProgressButton,
    infinite: imgList?.length > showMaxCnt,
    slidesToShow: showMaxCnt,
    slidesToScroll: 6,
    swipeToSlide: true,
    focusOnSelect: true,
    touchThreshold: 100,
  };

  const displayedAt = (paramTime) => {
    const parseTime = Date.parse(paramTime);
    const date = new Date(parseTime);
    const returnDate =
      date.getFullYear() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes();
    return returnDate;
  };

  return (
    <>
      {Topics === null ? (
        <>
          <ImgBox>
            <span>PROGRESS</span>
          </ImgBox>
          <Wrap>
            <Inner>
              <Slider
                ref={mainSlickRef2}
                asNavFor={pagingSlick2}
                {...mainSettings}
              >
                {imgList.map((item, index) => {
                  return (
                    <MainSlickItems key={item}>
                      <img src={Data.imgUrl} alt="" />
                    </MainSlickItems>
                  );
                })}
              </Slider>
              <>
                <PrevButton onClick={onClickPrev(pagingSlickRef2)}>
                  <PrevIcon />
                </PrevButton>

                <NextButton onClick={onClickNext(pagingSlickRef2)}>
                  <NextIcon />
                </NextButton>
              </>
            </Inner>
            <Inner2>
              <Slider
                ref={pagingSlickRef2}
                asNavFor={mainSlick2}
                {...pagingSettings}
              >
                {imgList.map((item, index) => {
                  return (
                    <div className="bg">
                      <Container>
                        <PagingItems key={item} className="paging_items">
                          <div style={{ position: 'relative' }}>
                            <Overlay>
                              <Personnel>
                                {item.frameNum} / {Data.frameTotal}
                              </Personnel>
                              <ProBox>
                                <Profileimg img={item.profileimg}></Profileimg>
                                <LastNickname>{item.nickname}</LastNickname>
                              </ProBox>
                            </Overlay>
                            <img src={basicImg} alt="" />
                          </div>
                        </PagingItems>
                      </Container>
                    </div>
                  );
                })}

                <ProgressButton
                  onClick={() => {
                    Move();
                  }}
                >
                  <Buttonimg />
                </ProgressButton>
              </Slider>
              <>
                <PrevButton onClick={onClickPrev(pagingSlickRef2)}>
                  <PrevIcon />
                </PrevButton>

                <NextButton onClick={onClickNext(pagingSlickRef2)}>
                  <NextIcon />
                </NextButton>
              </>
            </Inner2>
            <HR />
            <TopicBox>
              <Topic>
                <span>{Topics}</span>
                <span>
                  {displayedAt(Data.createdAt)}~{displayedAt(Data.expiredAt)}
                </span>
              </Topic>
            </TopicBox>
          </Wrap>
          <Footer />
        </>
      ) : (
        <>
          <ImgBox>
            <span>PROGRESS</span>
          </ImgBox>
          <Wrap>
            <Inner>
              <Slider
                ref={mainSlickRef}
                asNavFor={pagingSlick}
                {...mainSettings}
              >
                {imgList &&
                  imgList.map((item, index) => {
                    return (
                      <MainSlickItems key={item}>
                        <img src={item.imgUrl} alt="" />
                      </MainSlickItems>
                    );
                  })}
              </Slider>
              <>
                <PrevButton onClick={onClickPrev(pagingSlickRef)}>
                  <PrevIcon />
                </PrevButton>

                <NextButton onClick={onClickNext(pagingSlickRef)}>
                  <NextIcon />
                </NextButton>
              </>
            </Inner>
            <Inner>
              <Slider
                ref={pagingSlickRef}
                asNavFor={mainSlick}
                {...pagingSettings}
              >
                {imgList &&
                  imgList.map((item, index) => {
                    return (
                      <div className="bg">
                        <Container>
                          <PagingItems key={item} className="paging_items">
                            <div style={{ position: 'relative' }}>
                              <Overlay>
                                <Personnel>
                                  {item.frameNum} / {Data.frameTotal}
                                </Personnel>
                                <ProBox>
                                  <Profileimg
                                    img={item.profileimg}
                                  ></Profileimg>
                                  <LastNickname>{item.nickname}</LastNickname>
                                </ProBox>
                              </Overlay>
                              <img src={item.imgUrl} alt="" />
                            </div>
                          </PagingItems>
                        </Container>
                      </div>
                    );
                  })}
                <ProgressButton
                  onClick={() => {
                    Move();
                  }}
                >
                  <Buttonimg />
                </ProgressButton>
              </Slider>
              <>
                <PrevButton onClick={onClickPrev(pagingSlickRef)}>
                  <PrevIcon />
                </PrevButton>

                <NextButton onClick={onClickNext(pagingSlickRef)}>
                  <NextIcon />
                </NextButton>
              </>
            </Inner>
            <HR />
            <TopicBox>
              <Topic>
                <span>{Topics}</span>
                <span>
                  {displayedAt(Data.createdAt)}~{displayedAt(Data.expiredAt)}
                </span>
              </Topic>
            </TopicBox>
          </Wrap>
          <Footer />
        </>
      )}
    </>
  );
};

export default ProgressDetail;

const Wrap = styled.div`
  overflow: hidden;
  margin-top: 60px;

  & > div + div {
    margin-top: 50px;
  }
`;

//배너
const ImgBox = styled.div`
  width: 100%;
  height: 300px;
  ${({ theme }) => theme.flexSet('column', 'space-between', 'center')}
  text-align: center;
  background: #f4f4f4;
  border: 0.5px solid #a3a3a3;
  span {
    margin-top: 140px;
    font-family: 'SilkLight';
    font-size: 80px;
    line-height: 102px;
    font-weight: 400;
  }

  top: 0;
  left: 0;
  z-index: 1;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-150px);
  }
`;
const Inner = styled.div`
  width: 1200px;
  margin: auto;
  position: relative;
  .paging_items {
    filter: grayscale(1);

    &:hover {
      filter: none;
    }
  }

  .slick-current .paging_items {
    filter: none;
  }

  .slick-dots {
    top: 200px;
  }
`;

const Inner2 = styled.div`
  position: relative;

  .paging_items {
  }

  &:hover {
    filter: none;
  }

  .slick-current .paging_items {
    filter: blur(0px);
  }

  .slick-slide {
  }
  .slick-list {
  }
`;

const defaultItemStyle = styled.div`
  width: 100%;
  text-align: center;

  img {
    height: 100%;
    vertical-align: top;
  }
`;

// 메인 이미지
const MainSlickItems = styled(defaultItemStyle)`
  width: 100%;
  height: 400px;

  img {
    max-width: 100%;
    margin: auto;
    border: 5px solid black;
  }
`;

const Text = styled.div`
  width: 170px;
  height: 170px;
  display: none;
  background: red;
  font-family: 'NotoBold';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

//리스트 이미지
const PagingItems = styled(defaultItemStyle)`
  cursor: pointer;

  img {
    width: 170px;
    height: 170px;
    border: 3px solid black;
    display: block;

    &:hover ${Text} {
      display: block;
    }
  }
`;

const Container = styled.div`
  display: flex;
`;

const Overlay = styled.div`
  position: absolute;
  width: 170px;
  height: 170px;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')}
  background: rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: all 1s;
  &:hover {
    opacity: 1;
  }
`;

const Personnel = styled.div`
  padding-bottom: 100px;
  padding-left: 100px;
  font-family: 'NotoLight';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: white;
`;

const ProBox = styled.div`
  width: 170px;
  height: 30px;
  background: red;
  ${({ theme }) => theme.flexSet('row', 'space-around', 'center')}
`;

const Profileimg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.flexSet('contain')}
  background-size: 100% 100%;
`;

const LastNickname = styled.div`
  font-family: 'NotoLight';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: white;
  line-height: 20px;
`;

const ProgressButton = styled.button`
  width: 130px;
  height: 170px;
  background: #f8f8f8;
`;

const Buttonimg = styled.div`
  width: 50px;
  height: 50px;
  background: red;
  margin: auto;
  background: url(${plusButton});
  ${({ theme }) => theme.flexSet('cover')}
`;

const HR = styled.hr`
  max-width: 1200px;
  margin-top: 90px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const TopicBox = styled.div`
  max-width: 1200px;
  height: 50px;
  margin: auto;
  margin-top: 30px;
`;

const Topic = styled.div`
  font-family: 'NotoLight';
  font-size: 24px;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'center')}
  @media ${({ theme }) => theme.device.laptop} {
    span {
      margin-left: 740px;
    }
  }
`;

// 화살표 버튼

const defaultButtonStyle = css`
  position: absolute;
  top: 50%;
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 1;
  border: none;
  border-radius: 50%;
  background: none;
  outline: none;
  transform: translateY(-50%);
  cursor: pointer;
`;

const PrevButton = styled.button`
  ${defaultButtonStyle}
  left: -30px;
`;

const NextButton = styled.button`
  ${defaultButtonStyle}
  right: 0;
`;

const defaultIconStyle = css`
  font-size: 22px;
  color: #dedede;

  &:focus,
  &:hover {
    color: #666;
  }
`;

const PrevIcon = styled(LeftOutlined)`
  ${defaultIconStyle}
`;

const NextIcon = styled(RightOutlined)`
  ${defaultIconStyle}
`;
