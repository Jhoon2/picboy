import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import first from '../images/mainDesc/first.svg';
import banner from '../images/mainDesc/banner.svg';
import { __getBest } from '../redux/modules/Best';

const BestSlider = () => {
  const dispatch = useDispatch();
  const { bests } = useSelector((state) => state.bests);

  useEffect(() => {
    dispatch(__getBest());
  }, [dispatch]);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    centerPadding: '200px',
    pauseOnHover: true,
    touchThreshold: 100,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, //화면 사이즈 960px
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 1,
          centerPadding: '270px',
        },
      },
    ],
  };

  return (
    <BestContainer>
      <style>{cssstyle}</style>
      <Slider {...settings}>
        {bests.map((item, index) => {
          console.log(item.id);
          return (
            <div key={item} className="box">
              <div className="rank" />
              <Rankimg src={item.gifUrl} alt="" />
            </div>
          );
        })}
      </Slider>
    </BestContainer>
  );
};

export default BestSlider;

const BestContainer = styled.div`
  max-width: 1800px;
  margin: auto;
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 1000px;
  }
`;

const Rankimg = styled.img`
  margin: auto;
  height: 300px;
  margin-top: 60px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
`;

const cssstyle = css`
  .center .slick-center .box {
    position: relative;
    height: 410px;
    background: url(${banner});
    background-position: center;
    background-size: 100% 100%;
  }

  .box {
    height: 500px;
  }

  .center .slick-center .rank {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 85%;
    left: 77%;
    background: url(${first});
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .slick-next:before,
  .slick-prev:before {
    color: none;
  }
  .center .slick-center img {
    margin-top: px;
    opacity: 1;
    -ms-transform: scale(1.3);
    transform: scale(1.3);
  }

  .center img {
    transition: all 0.3s ease;
  }
`;

const ProfileBox = styled.div`
  width: 300px;
  height: 150px;
  margin: auto;
  /* position: absolute;
  top: 50%;
  left: 150px; */
  ${({ theme }) => theme.flexSet('column', 'space-evenly', 'center')}
`;

const Topic = styled.span`
  font-family: 'NotoBold';
  font-size: 30px;
`;

const Nickname = styled.span`
  font-family: 'NotoLight';
  font-size: 20px;
`;
