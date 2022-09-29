import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import eventback from '../images/event/eventback.svg';
import desc from '../images/event/desc.svg';
import icon1 from '../images/event/icon1.svg';
import icon2 from '../images/event/icon2.svg';
import icon3 from '../images/event/icon3.svg';
import icon4 from '../images/event/icon4.svg';
import icon5 from '../images/event/icon5.svg';
import icon6 from '../images/event/icon6.svg';

const Event = () => {
  return (
    <Container>
      <Back>
        <Icon1 />
        <Icon2 />
        <Icon3 />
        <Icon4 />
        <Icon5 />
        <Icon6 />
        <Title1 />
        <Fade bottom>
          <Button>
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfnDqAdAXNB4BDkT5pHCx0xfS-mEjMH6UO4mD-DsHvFp5vldw/viewform"
              rel="noreferrer"
            >
              피드백 남기러 가기
            </a>
          </Button>
        </Fade>
      </Back>
    </Container>
  );
};

export default Event;

const Container = styled.div`
  width: 100%;
  background: #000000;
`;

const Back = styled.div`
  width: 100%;
  position: relative;
  background: url(${eventback});
  ${({ theme }) => theme.backgroundSet('cover')};
  ${({ theme }) => theme.flexSet('column', 'center', 'center')};
`;

const Title1 = styled.div`
  width: 700px;
  height: 975px;

  margin-top: 110px;
  background: url(${desc});
  ${({ theme }) => theme.backgroundSet('cover')}
`;

const Button = styled.button`
  width: 500px;
  height: 74px;
  position: relative;

  border: 2px solid #ffffff;
  background: black;
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 18px;
  line-height: 200%;

  text-align: center;
  letter-spacing: -0.04em;

  color: #ffffff;

  &:hover {
    background: white;
    color: black;
    border: 2px solid black;
  }
`;

const Icon1 = styled.div`
  width: 75px;
  height: 70px;
  position: absolute;
  left: 30%;
  background: url(${icon1});
  ${({ theme }) => theme.backgroundSet('cover')}
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce2;
  animation-timing-function: linear;
  @keyframes bounce2 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1.3rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    left: 65%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    left: 20%;
  }
`;

const Icon2 = styled(Icon1)`
  width: 60px;
  height: 60px;
  left: 68%;
  top: 60%;
  background: url(${icon2});
  @media ${({ theme }) => theme.device.laptop} {
    left: 75%;
  }
`;

const Icon3 = styled(Icon1)`
  width: 45px;
  height: 60px;
  position: absolute;
  top: 89%;
  left: 55%;
  animation: fadeInUp 1s;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  background: url(${icon3});
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    left: 59%;
  }
`;

const Icon4 = styled(Icon3)`
  width: 70px;
  height: 80px;
  background: url(${icon4});
  top: 87%;
  left: 58%;
  @media ${({ theme }) => theme.device.laptop} {
    left: 63%;
  }
`;

const Icon5 = styled(Icon2)`
  width: 42px;
  height: 42px;
  background: url(${icon5});
  top: 35%;
  left: 65%;
`;

const Icon6 = styled(Icon1)`
  width: 45px;
  height: 45px;
  background: url(${icon6});
  top: 85%;
  left: 33%;
`;
