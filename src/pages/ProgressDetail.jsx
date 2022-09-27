import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

//불러오기
import UseGetUser from '../hooks/UseGetUser';
import { useMyContext } from '../shared/ContextApi';
import AnyModal from '../elem/AnyModal';

//이미지
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import addBef from '../images/detail/addBef.svg';
import addAft from '../images/detail/addAft.svg';
import noImage from '../images/detail/noImage.png';
import Listbanner from '../images/Com/Listbanner.svg';
import Listfooter from '../images/Com/Listfooter.svg';
import  api  from '../shared/apis';

//소리
import { error1PB } from '../global/sound';

const ProgressDetail = () => {
  const navigate = useNavigate();
  const logonUser = UseGetUser();
  const myContext = useMyContext();

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

  const params = useParams();
  const [Data, setData] = useState([]);

  const getProgressData = () => {
    const url = `/post/gif/images/detail/${params.id}`;
    api
      .get(url)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log('error');
      });
  };

  const imgList = Data.frameImgList;
  const Topics = Data && Data.topic;
  
  //에러창
  const clickError = () => {
    error1PB.play();
    myContext.btnClickOn()
  }
  const Move = () => {
    if (!logonUser)
      return clickError();
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
          {myContext.btnOpen ? (
        <ErrorBox onClick={() => myContext.btnClickOff()}>
          <AnyModal title="회원정보" content="로그인 후 가능합니다" />
        </ErrorBox>
      ) : null}
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
                    <MainSlickItems key={index}>
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
                    <div className="bg"  key={item}>
                      <Container>
                        <PagingItems className="paging_items">
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
                            <img src={noImage} alt="" />
                          </div>
                        </PagingItems>
                      </Container>
                    </div>
                  );
                })}

                <ProgressButton>
                  <AddButton
                    onClick={() => {
                      Move();
                    }}
                  >
                    <Buttonimg />
                  </AddButton>
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
            <Footerimg />
          </Wrap>
        </>
      ) : (
        <>
          <Wrap>
            <ImgBox>
              <span>PROGRESS</span>
            </ImgBox>
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
                      <div className="bg" key={item}>
                        <Container>
                          <PagingItems  className="paging_items">
                            <div style={{ position: 'relative' }}>
                              <Overlay>
                                <Personnel>
                                  <span>
                                    {item.frameNum} / {Data.frameTotal}
                                  </span>
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
                <ProgressButton>
                  <AddButton
                    onClick={() => {
                      Move();
                    }}
                  >
                    <Buttonimg />
                  </AddButton>
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
                <TopicText>제시어</TopicText>
                <span>
                  {displayedAt(Data.createdAt)}~{displayedAt(Data.expiredAt)}
                </span>
              </Topic>
              <TopicName>{Topics}</TopicName>
            </TopicBox>
            <Footerimg />
          </Wrap>
        </>
      )}
    </>
  );
};

export default ProgressDetail;

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

const Wrap = styled.div`
  overflow: hidden;
  margin-top: 60px;
  position: relative;

  & > div + div {
    margin-top: 50px;
  }
`;

//배너
const ImgBox = styled.div`
  width: 100%;
  height: 636px;
  ${({ theme }) => theme.flexSet('column', 'space-between', 'center')}
  text-align: center;
  background: url(${Listbanner});
  position: absolute;
  z-index: -1;
  span {
    margin-top: 200px;
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
  z-index: 1;
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
  background: none;
  margin-top: 300px;

  img {
    max-width: 100%;
    margin: auto;
    border: 2px solid #e6e6e6;
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
    margin: auto;
    border: 2px solid #e6e6e6;
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
  left: 15px;
  width: 170px;
  height: 170px;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')}
  background: rgba(0, 0, 0, 0.50);
  opacity: 0;
  transition: all 1s;
  &:hover {
    opacity: 1;
  }
`;

const Personnel = styled.div`
  width: 40px;
  height: 20px;
  background: black;
  margin-bottom: 100px;
  margin-left: 110px;
  font-family: 'NotoLight';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: white;
`;

const ProBox = styled.div`
  width: 170px;
  height: 30px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Profileimg = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  border-radius: 50%;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.flexSet('cover')}
  background-size: 100% 100%;
`;

const LastNickname = styled.div`
  margin-left: 12px;
  font-family: 'NotoLight';
  font-weight: 500;
  font-size: 10px;
  line-height: 180%;
  /* or 18px */

  letter-spacing: -0.02em;
  color: white;
  line-height: 20px;
`;

const ProgressButton = styled.div`
  height: 170px;
`;

const AddButton = styled.button`
  width: 170px;
  height: 170px;
  margin: auto;
  border: 1px solid black;
  background: none;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')}
`;

const Buttonimg = styled.div`
  width: 30px;
  height: 30px;
  margin: auto;
  background: url(${addBef});
  ${({ theme }) => theme.backgroundSet('cover')}
  &:hover {
    background: url(${addAft});
  }
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
  height: 110px;
  margin: auto;
  margin-top: 50px;
`;

const TopicText = styled.div`
  font-family: 'NotoBold';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;

  letter-spacing: -0.04em;

  color: #000000;
`;

const TopicName = styled.div`
  font-family: 'NotoLight';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 200%;

  letter-spacing: -0.04em;

  color: #000000;
`;

const Topic = styled.div`
  font-family: 'NotoLight';
  font-weight: 400;
  font-size: 14px;
  line-height: 180%;

  letter-spacing: -0.02em;

  color: #a3a3a3;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'center')}
  @media ${({ theme }) => theme.device.laptop} {
    span {
      margin-left: 740px;
    }
  }
`;

const Footerimg = styled.div`
  width: 100%;
  height: 320px;
  margin: auto;
  background: url(${Listfooter});
  ${({ theme }) => theme.backgroundSet('cover')}
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
  left: -10%;
  @media ${({ theme }) => theme.device.laptop} {
    left: -0.7%;
  }
`;

const NextButton = styled.button`
  ${defaultButtonStyle}
  right: -10%;
  @media ${({ theme }) => theme.device.laptop} {
    right: -0.7%;
  }
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
