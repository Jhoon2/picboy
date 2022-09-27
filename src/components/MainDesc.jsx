import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../shared/ContextApi';
import UseGetUser from '../hooks/UseGetUser';

import Fade from 'react-reveal/Fade';
import BestSlider from '../elem/BestSlider';
import Howarrow from '../images/mainDesc/Howarrow.svg';
import Howfirst from '../images/mainDesc/HowFirst.gif';
import Howsecond from '../images/mainDesc/Howsecond.gif';
import Howthird from '../images/mainDesc/Howthird.gif';
import Howfour from '../images/mainDesc/Howfour.gif';
import Heart from '../images/mainDesc/Heart.svg';
import Heart1 from '../images/mainDesc/Heart2.svg';
import Heart2 from '../images/mainDesc/Heart3.svg';
import topic from '../images/mainDesc/topic.png';
import free from '../images/mainDesc/free.png';
import Buttonarrow from '../images/mainDesc/Buttonarrow.svg';
import Desc1 from '../images/mainDesc/Desc1.gif';
import Desc2 from '../images/mainDesc/Desc2.gif';
import Desc3 from '../images/mainDesc/Desc3.gif';
import Desc4 from '../images/mainDesc/Desc4.gif';
import { buttonPB } from '../global/sound';
import { coinPB } from '../global/sound';

const MainDesc = ({ moveRef, move2Ref }) => {
  const navigate = useNavigate();
  const TopicgRef = useRef();
  const FreeRef = useRef();
  const myContext = useMyContext();
  const logonUser = UseGetUser();

  const moveTopic = () => {
    if (!logonUser) return myContext.btnClickOn();
    navigate('/post-topic');
    coinPB.play();
  };

  const moveFree = () => {
    if (!logonUser) return myContext.btnClickOn();
    navigate('/post-free');
    coinPB.play();
  };

  const handleMove = () => {
    FreeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMoves = () => {
    TopicgRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <DescContainer>
      <Fade bottom>
        <IntroBlock>
          <DescTitle ref={move2Ref}>
            유저들과 함께
            <br />
            예측할수 없는 즐거움을
            <br />
            만들어 보세요!
          </DescTitle>
        </IntroBlock>
      </Fade>
      <ButtonBox>
        <Fade left>
          <TopicButton
            onClick={() => {
              handleMoves();
              buttonPB.play();
            }}
          >
            ABOUT PICBOY
            <br />
            <span>픽보이 알아보기</span>
          </TopicButton>
        </Fade>
        <Fade right>
          <FreeButton
            onClick={() => {
              handleMove();
              buttonPB.play();
            }}
          >
            HOW TO
            <br />
            <span>사용방법</span>
          </FreeButton>
        </Fade>
      </ButtonBox>
      <DescBox1 ref={TopicgRef}>
        <Descimg1 img={Desc1} />
        <DescFirst>
          <Fade bottom>
            <Number1>#1</Number1>
            <Title1>
              누구나 나만의 움짤을
              <br />
              만들수 있어요!
            </Title1>
            <Des1>
              게임의 기본형식은 주어지는 단어를 그림판에 그림을 그려서
              <br />
              유저들과 같이 설명하고 하나의 "움짤을 만드는 게임"으로
              <br />
              무한한 창의적 발상과 상상력을 발휘해 보세요.
            </Des1>
          </Fade>
        </DescFirst>
      </DescBox1>
      <DescBox2>
        <DescSecond>
          <Fade left>
            <Number2>#2</Number2>
            <Title2>간단한 컨텐츠</Title2>
            <Des2>
              주제어를 정하고 그려보세요.참여된 그림들을 보고
              예측해서그려봅시다.
              <br />
              주제어 없이도 그려보세요.마지막에 그려진 그림만 보고
              예측해그려봅시다.
            </Des2>
          </Fade>
        </DescSecond>
        <Descimg2 img={Desc2} />
      </DescBox2>
      <DescBox3>
        <Descimg3 img={Desc3} />
        <DescThird>
          <Fade right>
            <Number3>#3</Number3>
            <Title3>
              자유롭게 저장하고
              <br />
              공유 및 소통해 보세요!
            </Title3>
            <Des3>
              유저들과 같이 만드는 움짤을 공유, 소통하고 마음에 드는
              <br />
              움짤을 저장 해보세요.
            </Des3>
          </Fade>
        </DescThird>
      </DescBox3>
      <DescBox4>
        <Fade bottom>
          <DescFourth>
            <Number4>#4</Number4>
            <Title4>
              유저들과
              <br />
              텔레파시
            </Title4>
            <Des4>
              유저들이 대체 어떤 상상을 하고 그렸을까요?
              <br />
              내 의도랑 같아서 자연스러운 결과물이 나와줄까요?
              <br />
              예측할 수 없는 재미를 즐겨보세요!
            </Des4>
          </DescFourth>
          <Descimg4 img={Desc4} />
        </Fade>
      </DescBox4>
      <HowContainer ref={FreeRef}>
        <HowTitle>사용 방법</HowTitle>
        <HowTitleDesc>
          제시어 없이 오직 유저들의 그림을 보고 <br />
          의미를 찾고 예측할 수 없는 움짤을 만들어 보세요.
        </HowTitleDesc>
        <HowBox>
          <HowBoxNumber>
            <HowTitleNumber>
              <HowNum>1</HowNum>
              <HowNum>2</HowNum>
              <HowNum>3</HowNum>
              <HowNum>4</HowNum>
            </HowTitleNumber>
            <Fade bottom>
              <Howimage>
                <HowImg img={Howfirst} />
                <img src={Howarrow} alt="" />
                <HowImg img={Howsecond} />
                <img src={Howarrow} alt="" />
                <HowImg img={Howthird} />
                <img src={Howarrow} alt="" />
                <HowImg img={Howfour} />
              </Howimage>
              <HowSubBox>
                <HowSub>시작</HowSub>
                <HowSub>그리기</HowSub>
                <HowSub1>진행중</HowSub1>
                <HowSub>완성</HowSub>
              </HowSubBox>
              <HowDescBox>
                <HowDesc2>드로잉 버튼 클릭</HowDesc2>
                <HowDesc>
                  제시어(FREE일 경우 PASS) <br />
                  프레임 선택 후 그리기
                </HowDesc>
                <HowDesc1>진행중인 그림 감상</HowDesc1>
                <HowDesc>
                  프레임 수 채워지면 <br />
                  완성버튼 클릭!
                </HowDesc>
              </HowDescBox>
            </Fade>
          </HowBoxNumber>
        </HowBox>
      </HowContainer>
      <BestContainer>
        <BestImg />
        <BestImg1 />
        <BestImg2 />
        <Fade bottom>
          <BestTitle>내가 PICBOY 왕!</BestTitle>
          <BestDesc>
            유저들에게 좋아할만한 움짤을 만든 후,
            <br />
            주간 베스트에 선정 되어 보세요.
          </BestDesc>
        </Fade>
        <SlideContainer>
          <BestSlider></BestSlider>
        </SlideContainer>
      </BestContainer>

      <StartBox>
        <Fade bottom>
          <StartTitle>그럼, 시작해볼까요?</StartTitle>
          <StartDesc>
            제시어와 자유주제를 골라서 창의력을 발휘해보세요! <br />
            예측하지못한 즐거움이 기다리고 있습니다.
          </StartDesc>
          <StartButtonBox>
            <TopicBox>
              <Startimg src={topic} alt="" />
              <StartTitles>제시어</StartTitles>
              <StartDescs>
                제시어를 설정하여 <br />
                유저들과 그림을 그릴 수 있어요!
              </StartDescs>
              <StartButton onClick={moveTopic}>
                제시어 그리러 가기
                <Arrow src={Buttonarrow} alt="" />
              </StartButton>
            </TopicBox>
            <FreeBox>
              <Startimg src={free} alt="" />
              <StartTitles>자유</StartTitles>
              <StartDescs>
                제시어 없이 <br />
                유저들과 그림을 그릴 수 있어요!
              </StartDescs>
              <StartButton onClick={moveFree}>
                자유주제 그리러 가기
                <Arrow src={Buttonarrow} alt="" />
              </StartButton>
            </FreeBox>
          </StartButtonBox>
        </Fade>
      </StartBox>
    </DescContainer>
  );
};

export default MainDesc;

const IntroBlock = styled.div``;

const DescContainer = styled.div`
  width: 100%;
  background: #161616;
  margin: auto;
`;

const DescTitle = styled.div`
  margin: auto;
  min-width: 75rem;
  padding-top: 200px;
  text-align: center;
  line-height: 150%;
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 3.5rem;
  color: white;
  @media ${({ theme }) => theme.device.laptop} {
    padding-top: 6.25rem;
  }
`;

const DescButton = styled.button`
  width: 15rem;
  height: 6.25rem;
  font-family: 'SilkBold';
  font-size: 1rem;
  span {
    font-family: "'NotoLight";
    font-size: 0.75rem;
  }
`;

const ButtonBox = styled.div`
  width: 62.5rem;
  margin: auto;
  padding-top: 140px;
  ${({ theme }) => theme.flexSet('row', 'center', 'center')}
`;

const TopicButton = styled(DescButton)`
  background: #161616;
  border: 0.0625rem solid white;
  color: white;
  &:hover {
    background: white;
    color: black;
  }
`;

const FreeButton = styled(DescButton)`
  border: none;
  background: white;
  margin-left: 3.125rem;
  &:hover {
    background: black;
    color: white;
  }
`;

const DescBox = styled.div`
  max-width: 75rem;
  height: 800px;
  margin: auto;
  ${({ theme }) => theme.flexSet('row', 'space-around', 'center')}
  @media ${({ theme }) => theme.device.laptop} {
    height: 50rem;
  }
`;

const Descimg = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  ${({ theme }) => theme.backgroundSet('contain')}

  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;
  left: 48.8%;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1.25rem);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const DescTextBox = css`
  width: 31.25rem;
  height: 43.75rem;
  ${({ theme }) => theme.flexSet('column', 'center', 'flex-start')}
`;

const Number = styled.span`
  font-family: 'SilkLight';
  font-size: 1.1875rem;
  color: white;
`;

const Title = css`
  font-family: 'NotoBold';
  font-size: 2.625rem;
  line-height: 4.5rem;
  font-weight: 700;
  line-height: 150%;
  color: white;
`;
const Desc = css`
  font-family: 'NotoLight';
  font-size: 1rem;
  line-height: 180%;
  font-weight: 400;
  color: white;
`;

const DescBox1 = styled(DescBox)`
  margin-top: 500px;
  height: 800px;
`;

const Descimg1 = styled(Descimg)`
  width: 600px;
  height: 600px;
  background: url(${(props) => props.img});
  animation-name: none;
`;

const DescFirst = styled.div`
  ${DescTextBox}
`;

const Number1 = styled(Number)``;

const Title1 = styled.div`
  margin-top: 6.25rem;
  ${Title}
`;
const Des1 = styled.div`
  margin-top: 3.125rem;
  ${Desc}
`;

const DescBox2 = styled(DescBox)`
  margin-top: 100px;
`;

const Descimg2 = styled(Descimg)`
  width: 37.5rem;
  height: 31.25rem;
  background: url(${(props) => props.img});
  animation-name: none;
`;

const DescSecond = styled.div`
  ${DescTextBox}
`;

const Number2 = styled(Number)``;

const Title2 = styled.div`
  margin-top: 6.25rem;
  ${Title}
`;
const Des2 = styled.div`
  margin-top: 3.125rem;
  ${Desc}
`;

const DescBox3 = styled(DescBox)`
  margin-top: 100px;
`;

const Descimg3 = styled(Descimg)`
  width: 600px;
  height: 600px;
  background: url(${(props) => props.img});
  animation-name: none;
`;

const DescThird = styled.div`
  ${DescTextBox}
`;

const Number3 = styled(Number)``;

const Title3 = styled.div`
  margin-top: 6.25rem;
  ${Title}
`;
const Des3 = styled.div`
  margin-top: 3.125rem;
  ${Desc}
`;

const DescBox4 = styled(DescBox)`
  @media ${({ theme }) => theme.device.laptop} {
    height: 50rem;
  }
`;

const Descimg4 = styled(Descimg)`
  width: 600px;
  height: 400px;
  margin-bottom: 150px;
  background: url(${(props) => props.img});
  animation-name: none;
`;

const DescFourth = styled.div`
  margin-bottom: 150px;
  ${DescTextBox}
`;

const Number4 = styled(Number)``;

const Title4 = styled.div`
  margin-top: 6.25rem;
  ${Title}
`;
const Des4 = styled.div`
  margin-top: 3.125rem;
  ${Desc}
`;

const HowContainer = styled.div`
  height: 57.6rem;
  background: white;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')}
  text-align: center;
`;

const HowTitle = styled.span`
  width: 18.75rem;
  height: 3.125rem;
  font-weight: 700;
  line-height: 150%;
  font-family: 'NotoBold';
  font-size: 2.625rem;
`;

const HowTitleDesc = styled.span`
  width: 25rem;
  height: 3.125rem;
  margin-top: 3.125rem;
  font-family: 'NotoLight';
  font-size: 1rem;
  line-height: 180%;
  font-weight: 400;
`;

const HowBox = styled.div`
  width: 100%;
  height: 25rem;
  margin-top: 3.125rem;
  background: #f8f8f8;
  ${({ theme }) => theme.flexSet('column', 'space-evenly', 'center')}
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 75rem;
    justify-content: space-around;
  }
`;

const HowBoxNumber = styled.div`
  width: 68.75rem;
  height: 25rem;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')}
`;

const HowTitleNumber = styled.div`
  width: 68.75rem;
  height: 3.125rem;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'center')}
`;

const Numbers = css`
  font-family: 'SilkLight';
  font-size: 1rem;
  line-height: 200%;
`;

const HowNum = styled.div`
  width: 1.875rem;
  width: 1.875rem;
  margin-bottom: 40px;
  background: #d9d9d9;
  border-radius: 50%;
  ${Numbers}
`;

const Howimage = styled.div`
  width: 73.4375rem;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'center')}
`;

const HowImg = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')}
`;

const HowSubBox = styled.div`
  width: 69.25rem;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'center')}
`;

const HowSub = styled.span`
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 18px;
  line-height: 200%;
  letter-spacing: -0.04em;
`;

const HowSub1 = styled.span`
  margin-right: 8px;
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 18px;
  line-height: 200%;
  letter-spacing: -0.04em;
`;

const HowDescBox = styled.div`
  width: 1190px;
  ${({ theme }) => theme.flexSet('row', 'space-between', 'flex-start')}
`;

const HowDesc = styled.span`
  font-family: 'NotoLight';
  font-size: 1rem;
  line-height: 180%;
  font-weight: 400;
  letter-spacing: -0.02em;
`;

const HowDesc1 = styled(HowDesc)`
  margin-right: 20px;
`;

const HowDesc2 = styled(HowDesc)`
  margin-left: 5px;
`;

const BestContainer = styled.div`
  height: 800px;
  position: relative;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')};
  text-align: center;
  background: white;
`;

const BestTitle = styled.div`
  font-family: 'NotoBold';
  font-size: 2.625rem;
  line-height: 150%;
  font-weight: 700;
`;

const BestDesc = styled.div`
  margin-top: 1.25rem;
  font-family: 'NotoLight';
  font-size: 1rem;
  line-height: 180%;
  font-weight: 400;
  letter-spacing: -0.02em;
`;

const BestImg = styled.div`
  width: 65px;
  height: 60px;
  position: absolute;
  ${({ theme }) => theme.backgroundSet('contain')};
  background: url(${Heart});
  top: 3%;
  left: 37%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce;
  animation-timing-function: linear;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1.25rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    left: 31%;
  }
`;

const BestImg1 = styled.div`
  width: 49px;
  height: 45px;
  position: absolute;
  ${({ theme }) => theme.backgroundSet('contain')};
  background: url(${Heart1});
  top: 15%;
  left: 35%;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: bounce1;
  animation-timing-function: linear;
  @keyframes bounce1 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1.35rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    left: 28%;
  }
`;

const BestImg2 = styled.div`
  width: 79px;
  height: 73px;
  position: absolute;
  ${({ theme }) => theme.backgroundSet('contain')};
  background: url(${Heart2});
  top: 10%;
  left: 60%;
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
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 31.25rem;
  margin-top: 6.25rem;
`;

const StartBox = styled.div`
  height: 1090px;

  background: #f8f8f8;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')};
  text-align: center;
`;

const StartTitle = styled(BestTitle)``;

const StartDesc = styled(BestDesc)`
  margin-bottom: 300px;
`;

const StartButtonBox = styled.div`
  width: 62.5rem;
  height: 6.25rem;
  margin-bottom: 6.25rem;
  ${({ theme }) => theme.flexSet('row', 'space-around', 'center')};
`;

const TopicBox = styled.div`
  width: 450px;
  height: 550px;
  background: #ffffff;
  box-shadow: 0px 6px 10px 6px rgba(0, 0, 0, 0.1);
  ${({ theme }) => theme.flexSet('column', 'center', 'center')};
`;
const FreeBox = styled(TopicBox)``;

const StartTitles = styled.span`
  padding-top: 30px;
  padding-bottom: 12px;
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  letter-spacing: -0.04em;
`;

const Startimg = styled.img`
  width: 200px;
`;

const StartDescs = styled.span`
  padding-bottom: 50px;
  font-family: 'NotoLight';
  font-weight: 400;
  font-size: 14px;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: #a3a3a3;
`;

const StartButton = styled.button`
  width: 280px;
  height: 60px;
  font-family: 'NotoBold';
  font-size: 14px;
  font-weight: 600;
  line-height: 180%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #000000;

  color: #a3a3a3;
  &:hover {
    color: white;
  }
`;

const Arrow = styled.img`
  margin-left: 10px;
`;
