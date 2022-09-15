import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCookieToken, getRefreshToken } from '../shared/Cookie';
import nike from '../images/nikebanner.jpg';

const throttle = function (callback, waitTime) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const ProgressDetail = () => {
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () =>
      documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);
  const myToken = getCookieToken();
  const refreshToken = getRefreshToken();

  const baseURL = process.env.REACT_APP_API_KEY;
  const params = useParams();

  const [Data, setData] = useState([]);

  const getProgressData = () => {
    const url = `${baseURL}/post/gif/images/detail/${params.id}`;
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log('error');
      });
  };

  const imgList = Data.frameImgList;

  useEffect(() => {
    getProgressData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <ProContainer>
      <ImgBox className={hide && 'hide'}>
        <span>PROGRESS</span>
      </ImgBox>
      <Firstimg img={Data.imgUrl} />

      <Bannerbox>
        <style>{cssstyle}</style>
        <Slider {...settings}>
          {imgList &&
            imgList.map((item, index) => {
              return (
                <Box key={item}>
                  <img src={item.imgUrl} alt="" />
                </Box>
              );
            })}
        </Slider>
      </Bannerbox>
      <ButtonBox>
        <ToEnter>TO ENTER</ToEnter>
      </ButtonBox>
      <Footer />
    </ProContainer>
  );
};

export default ProgressDetail;

const ProContainer = styled.div`
  width: 100%;
`;

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

  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-250px);
  }
`;

const Firstimg = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  margin-top: 20px;
  background: red;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')};
`;

const Bannerbox = styled.div`
  max-width: 1800px;
  height: 400px;
  margin: auto;
`;

const Box = styled.div`
  width: 280px;
  height: 250px;
  display: block;
  &:hover {
    border: 3px solid #000;
  }
`;

const cssstyle = css`
  img {
    width: 280px;
    height: 250px;
    color: #fff;
    font-size: 36px;
    margin: 10px;
    position: relative;
    text-align: center;
    &:hover {
      background: gray;
    }
  }

  .slick-next:before,
  .slick-prev:before {
    color: #000;
  }
`;

const ButtonBox = styled.div`
  max-width: 1800px;
  height: 200px;
  margin: auto;
  ${({ theme }) => theme.flexSet('row', 'flex-end', 'center')};
`;

const ToEnter = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid white;
  border-radius: 10px;
  font-family: 'SilkLight';
  font-size: 20px;
  color: white;
  background: black;
  &:hover {
    background: white;
  }
`;
