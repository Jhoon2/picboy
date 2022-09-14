import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const baseUrl = 'https://picsum.photos';

const ProgressDetail = () => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${baseUrl}/id/10${i + 1}/400/300`} />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <ProContainer>
      <Header />
      <div className="container">
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <style>{cssstyle}</style>
        <Slider {...settings}>
          <div>
            <img src={baseUrl + `/id/101/400/300`} />
          </div>
          <div>
            <img src={baseUrl + `/id/102/400/300`} />
          </div>
          <div>
            <img src={baseUrl + `/id/103/400/300`} />
          </div>
          <div>
            <img src={baseUrl + `/id/104/400/300`} />
          </div>
        </Slider>
      </div>
      <Footer />
    </ProContainer>
  );
};

export default ProgressDetail;

const ProContainer = styled.div`
  width: 100%;
`;

const cssstyle = css`
  .container {
    margin: auto;
    margin-top: 200px;
    padding: 0px 40px 40px 40px;
    width: 1000px;
    height: 100vh;
  }
  h3 {
    background: #5f9ea0;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
  }
  .slick-next:before,
  .slick-prev:before {
    color: #000;
  }
  .slick-thumb {
    bottom: -300px;
  }
  .slick-thumb li {
    width: 200px;
    height: 45px;
    cursor: pointer;
  }
  img {
    max-width: 100%;
    margin: 0 0 1.45rem;
    padding: 0;
  }
`;
