import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import Fade from 'react-reveal/Fade';
import BestSlider from '../elem/BestSlider';
import icon from '../images/icon.png';

const MainDesc = ({ moveRef, move2Ref }) => {
    const TopicgRef = useRef();
    const FreeRef = useRef();

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
                        }}
                    >
                        TOPIC
                        <br />
                        <span>뉴비에게 추천!</span>
                    </TopicButton>
                </Fade>
                <Fade right>
                    <FreeButton
                        onClick={() => {
                            handleMove();
                        }}
                    >
                        FREE
                        <br />
                        <span>고인물에게 추천!</span>
                    </FreeButton>
                </Fade>
            </ButtonBox>
            <DescBox1 ref={TopicgRef}>
                <Descimg1 />
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
                        <Title2>멀티 플레이</Title2>
                        <Des2>
                            PC, 모바일을 통해 혼자 또는 다른 사용자들과
                            <br />
                            함께 만들수 있어요.
                        </Des2>
                    </Fade>
                </DescSecond>
                <Descimg2 />
            </DescBox2>
            <DescBox3>
                <Descimg3 />
                <DescThird>
                    <Fade right>
                        <Number3>#3</Number3>
                        <Title3>다른 유저와 공유 및 저장</Title3>
                        <Des3>
                            유저들과 같이 만드는 움짤을 공유, 소통하고 마음에 드는
                            <br />
                            움짤을 저장 해보세요.
                        </Des3>
                    </Fade>
                </DescThird>
            </DescBox3>
            <DescBox4 ref={FreeRef}>
                <Fade bottom>
                    <DescFourth>
                        <Number4>#1</Number4>
                        <Title4>
                            유저들과
                            <br />
                            텔레파시
                        </Title4>
                        <Des4>
                            제시어 없이 오직 유저들의 그림을 보고
                            <br />
                            의미를 찾고 예측할 수 없는 움짤을 만들어 보세요.
                        </Des4>
                    </DescFourth>
                    <Descimg4 />
                </Fade>
            </DescBox4>
            <HowContainer ref={moveRef}>
                <HowTitle>How To Use ?</HowTitle>
                <HowBox>
                    <Fade bottom>
                        <HowElem>
                            <HowImg />
                            <HowSub>Start</HowSub>
                            <HowDesc>Drawing 버튼 클릭</HowDesc>
                        </HowElem>

                        <HowElem2>
                            <HowImg />
                            <HowSub>Drawing</HowSub>
                            <HowDesc>
                                제시어(FREE일 경우 PASS)
                                <br />
                                프레임 선택 후 그리기
                            </HowDesc>
                        </HowElem2>

                        <HowElem>
                            <HowImg />
                            <HowSub>Progress</HowSub>
                            <HowDesc>진행중인 그림 감상</HowDesc>
                        </HowElem>

                        <HowElem>
                            <HowImg />
                            <HowSub>Complete</HowSub>
                            <HowDesc>프레임 수 채워지면 완성버튼 클릭</HowDesc>
                        </HowElem>
                    </Fade>
                </HowBox>
            </HowContainer>
            <BestContainer>
                <BestImg left={'580px'} bottom={'600px'} />
                {/* <BestImg left={'1300px'} top={'220px'} /> */}
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
                    <StartTitle>시작해볼까요?</StartTitle>
                    <StartButtonBox>
                        <StartTopic>
                            TOPIC
                            <br />
                            <span>뉴비에게 추천!</span>
                        </StartTopic>
                        <StartFree>
                            FREE
                            <br />
                            <span>고인물에게 추천!</span>
                        </StartFree>
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
  min-width: 1200px;
  padding-top: 150px;
  text-align: center;
  line-height: 150%;
  font-family: 'NotoBold';
  font-size: 80px;
  color: white;
  @media ${({ theme }) => theme.device.laptop} {
    padding-top: 100px;
  }
`;

const DescButton = styled.button`
  width: 400px;
  height: 100px;
  font-family: 'SilkLight';
  font-size: '30px';
  font-size: 30px;
  span {
    font-family: "'NotoLight";
    font-size: 15px;
  }
`;

const ButtonBox = styled.div`
  padding-top: 200px;
  ${({ theme }) => theme.flexSet('row', 'space-evenly', 'center')}
`;

const TopicButton = styled(DescButton)`
  background: #161616;
  border: 1px solid white;
  color: white;
  &:hover {
    background: white;
    color: black;
  }
`;

const FreeButton = styled(DescButton)`
  border: none;
  background: white;
  &:hover {
    background: black;
    color: white;
  }
`;

const DescBox = styled.div`
  max-width: 1200px;
  height: 1000px;
  margin: auto;
  margin-top: 100px;
  ${({ theme }) => theme.flexSet('row', 'space-evenly', 'center')}
  @media ${({ theme }) => theme.device.laptop} {
    height: 800px;
  }
`;

const Descimg = styled.div`
  width: 200px;
  height: 200px;
  background: url(${icon});
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
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const DescTextBox = css`
  width: 500px;
  height: 700px;
  ${({ theme }) => theme.flexSet('column', 'space-evenly', 'flex-start')}
`;

const Number = styled.span`
  font-family: 'SilkLight';
  font-size: 30px;
  color: white;
  border: 1px solid white;
`;

const Title = css`
  font-family: 'NotoBold';
  font-size: 50px;
  line-height: 72px;
  color: white;
`;
const Desc = css`
  font-family: 'NotoLight';
  font-size: 20px;
  line-height: 200%;
  color: white;
`;

const DescBox1 = styled(DescBox)``;

const Descimg1 = styled(Descimg)``;

const DescFirst = styled.div`
  ${DescTextBox}
`;

const Number1 = styled(Number)``;

const Title1 = styled.span`
  ${Title}
`;
const Des1 = styled.span`
  ${Desc}
`;

const DescBox2 = styled(DescBox)``;

const Descimg2 = styled(Descimg)``;

const DescSecond = styled.div`
  ${DescTextBox}
`;

const Number2 = styled(Number)``;

const Title2 = styled.span`
  ${Title}
`;
const Des2 = styled.span`
  ${Desc}
`;

const DescBox3 = styled(DescBox)``;

const Descimg3 = styled(Descimg)``;

const DescThird = styled.div`
  ${DescTextBox}
`;

const Number3 = styled(Number)``;

const Title3 = styled.span`
  ${Title}
`;
const Des3 = styled.span`
  ${Desc}
`;

const DescBox4 = styled(DescBox)`
  height: 1040px;
  @media ${({ theme }) => theme.device.laptop} {
    height: 800px;
  }
`;

const Descimg4 = styled(Descimg)``;

const DescFourth = styled.div`
  ${DescTextBox}
`;

const Number4 = styled(Number)`
  border: none;
  background: white;
  color: black;
`;

const Title4 = styled.div`
  ${Title}
`;
const Des4 = styled.div`
  ${Desc}
`;

const HowContainer = styled.div`
  height: 920px;
  background: white;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')}
  text-align: center;
`;

const HowTitle = styled.span`
  width: 300px;
  height: 40px;
  background: black;
  border-radius: 10px;
  font-family: 'SilkLight';
  font-size: 30px;
  color: white;
`;

const HowBox = styled.div`
  width: 1300px;
  margin-top: 200px;
  ${({ theme }) => theme.flexSet('row', 'space-evenly', 'center')}
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 1200px;
  }
`;

const HowElem = styled.div`
  ${({ theme }) => theme.flexSet('column', 'space-evenly', 'center')}
`;

const HowElem2 = styled(HowElem)`
  margin-top: 24px;
`;

const HowImg = styled.div`
  width: 100px;
  height: 100px;
  background: black;
`;

const HowSub = styled.span`
  padding-top: 10px;
  font-family: 'NotoBold';
  font-size: 20px;
`;

const HowDesc = styled.span`
  padding-top: 10px;
  font-family: 'NotoLight';
  font-size: 20px;
`;

const BestContainer = styled.div`
  height: 600px;
  position: relative;
  ${({ theme }) => theme.flexSet('column', 'center', 'center')};
  text-align: center;
  background: white;
`;

const BestTitle = styled.span`
  font-family: 'NotoBold';
  font-size: 80px;
`;

const BestDesc = styled.span`
  margin-top: 20px;
  font-family: 'NotoLight';
  font-size: 30px;
  line-height: 150%;
`;

const BestImg = styled(Descimg)`
  width: 100px;
  height: 100px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 100px;
`;

const StartBox = styled.div`
  height: 600px;
  background: white;
  ${({ theme }) => theme.flexSet('column', 'space-around', 'center')};
`;

const StartTitle = styled(BestTitle)``;

const StartButtonBox = styled.div`
  width: 1000px;
  height: 100px;
  margin-bottom: 100px;
  ${({ theme }) => theme.flexSet('row', 'space-around', 'center')};
`;

const StartTopic = styled(TopicButton)``;
const StartFree = styled(FreeButton)`
  background: #f7f7f7;
`;