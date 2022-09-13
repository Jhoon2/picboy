import React from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import nikebanner from '../images/nikebanner.jpg';
import user from '../images/user.png';
const BestSlider = () => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    centerPadding: '40px',
    autoplay: true,
    autoplaySpeed: 3000,
    addaptiveHeight: true,
    cssEase: 'linear',
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, //화면 사이즈 960px
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <>
      <Container>
        <style>{cssstyle}</style>
        <Slider {...settings}>
          <Box>
            <Bannerimage />
          </Box>
          <Box>
            <Bannerimage />
          </Box>
          <Box>
            <Bannerimage />
          </Box>
          <Box>
            <Bannerimage />
          </Box>
          <Box>
            <Bannerimage />
          </Box>
        </Slider>
      </Container>
    </>
  );
};

export default BestSlider;

const Container = styled.div`
  max-width: 1800px;
  margin: auto;
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 1100px;
  }
`;
const Box = styled.div`
  position: relative;
`;

const Bannerimage = styled.div`
  height: 300px;
  background: url(${nikebanner});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  /* transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  } */
`;

const ProfileBox = styled.div`
  width: 200px;
  height: 150px;
  margin: auto;
  /* position: absolute;
  top: 50%;
  left: 150px; */
  ${({ theme }) => theme.flexSet('column', 'space-evenly', 'center')}
`;

const Img = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${user});
  ${({ theme }) => theme.backgroundSet('contain')}
`;

const Topic = styled.span`
  font-family: 'NotoBold';
  font-size: 30px;
`;

const Nickname = styled.span`
  font-family: 'NotoLight';
  font-size: 20px;
`;

const cssstyle = css`
  .slick-next:before,
  .slick-prev:before {
    display: none;
  }
  .center .slick-center div {
    opacity: 1;
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  .center div {
    padding: 0px 20px 0px 20px;
    transition: all 0.3s ease;
  }
`;
