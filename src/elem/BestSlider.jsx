import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { __getBest } from '../redux/modules/Best';
import first from '../images/mainDesc/first.svg';
import second from '../images/mainDesc/second.svg';
import third from '../images/mainDesc/third.svg';
import banner from '../images/mainDesc/banner.svg';

const BestSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bests } = useSelector((state) => state.bests);

  const Top1 = bests.top3?.[0];
  const Top2 = bests.top3?.[1];
  const Top3 = bests.top3?.[2];
  const top7 = bests.top410;

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
    touchThreshold: 1,
    focusOnChange: true,
    autoplay: true,
    draggable: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200,
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 1,
          centerPadding: '270px',
        },
      },

      {
        breakpoint: 1520,
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
        <div className="box">
          <div className="rank1" />
          <Rankimg src={Top1?.gifUrl} alt="" />
        </div>

        <div className="box">
          <div className="rank2" />
          <Rankimg src={Top2?.gifUrl} alt="" />
        </div>

        <div className="box">
          <div className="rank3" />
          <Rankimg src={Top3?.gifUrl} alt="" />
        </div>

        {top7?.map((item, index) => {
          return (
            <div key={uuidv4()} className="box">
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
    height: 410px;
    position: relative;
    background: url(${banner});
    background-position: center;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .box {
    height: 500px;
  }

  .center .slick-center .rank1 {
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

  .center .slick-center .rank2 {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 85%;
    left: 77%;
    background: url(${second});
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .center .slick-center .rank3 {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 85%;
    left: 77%;
    background: url(${third});
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
