import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
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
    focusOnSelect: true,
    centerPadding: '10px',
    speed: 3000,
    slidesToShow: 1,
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
          <>
            {bests.map((item, index) => {
              return (
                <Box>
                  <Bannerimage key={item.id} img={item.gifUrl} />
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

const Bannerimage = styled.div`
  height: 300px;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')};
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
    display: flex;
  }
  .center div {
    padding: 0px 60px 0px 30px;
    transition: all 0.3s ease;
  }
`;
