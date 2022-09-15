import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { __getBest } from '../redux/modules/Best';

const BestSlider = () => {
  const dispatch = useDispatch();
  const { bests } = useSelector((state) => state.bests);
  console.log(bests);

  useEffect(() => {
    dispatch(__getBest());
  }, [dispatch]);

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
          <>
            {bests.data.data.map((item, index) => {
              return (
                <Box>
                  <Bannerimage key={item.id} src={item.gifUrl} alt="" />
                </Box>
              );
            })}
          </>
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

const Bannerimage = styled.img`
  height: 300px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
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
