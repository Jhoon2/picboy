import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ProgressDetail = () => {
  const navigate = useNavigate();

  const [mainSlick, setMainSlick] = useState(null);
  const [pagingSlick, setPagingSlick] = useState(null);
  const mainSlickRef = useRef(null);
  const pagingSlickRef = useRef(null);

  const baseURL = process.env.REACT_APP_API_KEY;
  const params = useParams();
  const [Data, setData] = useState([]);

  const getProgressData = () => {
    const url = `${baseURL}/post/gif/images/detail/${params.id}`;
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log('error');
      });
  };

  const test = Data.frameImgList;
  const tests = test?.reverse();

  const imgList = Data.frameImgList;
  const Topics = Data && Data.topic;

  const Move = () => {
    navigate(`/post-topic-relay/${params.id}`);
  };

  useEffect(() => {
    getProgressData();
  }, []);

  useEffect(() => {
    setMainSlick(mainSlickRef.current);
    setPagingSlick(pagingSlickRef.current);
  }, []);

  const onClickPrev = useCallback((ref) => () => ref.current.slickPrev(), []);
  const onClickNext = useCallback((ref) => () => ref.current.slickNext(), []);

  const showMaxCnt = 6;

  const mainSettings = {
    dots: false,
    // centerMode: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const pagingSettings = {
    dots: true,
    arrows: false,
    infinite: imgList?.length > showMaxCnt,
    slidesToShow: showMaxCnt,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <>
      <ImgBox>
        <span>PROGRESS</span>
      </ImgBox>
      <Wrap>
        <Inner>
          <Slider ref={mainSlickRef} asNavFor={pagingSlick} {...mainSettings}>
            {tests &&
              tests.map((item, index) => {
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
          <Slider ref={pagingSlickRef} asNavFor={mainSlick} {...pagingSettings}>
            <ProgressButton
              onClick={() => {
                Move();
              }}
            />
            {imgList &&
              imgList.map((item, index) => {
                return (
                  <PagingItems key={item} className="paging_items">
                    <img src={item.imgUrl} alt="" />
                  </PagingItems>
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
        <HR />
        <TopicBox>
          <Topic>{Topics}</Topic>
        </TopicBox>
      </Wrap>
      <Footer />
    </>
  );
};

export default ProgressDetail;

const Wrap = styled.div`
  overflow: hidden;
  margin-top: 50px;

  & > div + div {
    margin-top: 20px;
  }
`;

//배너
const ImgBox = styled.div`
  width: 100%;
  height: 200px;
  ${({ theme }) => theme.flexSet('column', 'space-between', 'center')}
  text-align: center;
  background: #f4f4f4;
  border: 0.5px solid #a3a3a3;
  span {
    margin-top: 50px;
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

  .slick-slide {
    padding-right: 60px;
  }
  .slick-list {
    margin-right: -110px;
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
  height: 350px;

  img {
    max-width: 100%;
    margin: auto;
  }
`;

//리스트 이미지
const PagingItems = styled(defaultItemStyle)`
  max-width: 1200px;
  height: 200px;
  cursor: pointer;

  img {
    width: 200px;
    height: 200px;
  }
`;

const ProgressButton = styled.button`
  width: 200px;
  height: 200px;

  background: #f8f8f8;
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
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')}
`;

const Topic = styled.div`
  font-size: 30px;
  line-height: 150%;
  font-family: 'NotoLight';
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
  left: 0;
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
