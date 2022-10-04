import React,{ useState } from 'react'
import {__selectIconImg} from '../../redux/modules/UserPage'
import styled from 'styled-components'
import robot1 from '../../images/mypage/robot1.png'
import robot2 from '../../images/mypage/robot2.png'
import robot3 from '../../images/mypage/robot3.png'
import robot4 from '../../images/mypage/robot4.png'
import robot5 from '../../images/mypage/robot5.png'
import robot6 from '../../images/mypage/robot6.png'
import robotClick1 from '../../images/mypage/robotClick1.png'
import robotClick2 from '../../images/mypage/robotClick2.png'
import robotClick3 from '../../images/mypage/robotClick3.png'
import robotClick4 from '../../images/mypage/robotClick4.png'
import robotClick5 from '../../images/mypage/robotClick5.png'
import robotClick6 from '../../images/mypage/robotClick6.png'
import IconImages from './IconImages'

const robotImages = [robot1, robot2, robot3, robot4, robot5, robot6];
const clickedRobots = [robotClick1,robotClick2,robotClick3,robotClick4,robotClick5,robotClick6]
const iconNames = ['소미', '미니', '후니', '호야', '우기', '거니']

const ProfileImageIcons = ({ shown, close, setSelectIcon }) => {

  const [num, setNum] = useState()


  const closeBox = () => {
    close();
    setSelectIcon(false);
  };
  return shown ? (
    <Overlay onClick={closeBox}>
      <OverlayPosition>
        <ModalContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TitleIconModal>아이콘을 선택하세요.</TitleIconModal>
          <IconsContainer>
            {robotImages.map((img, i) => {
              return(
                <IconImages key={i} robot={img}
                  clickRobot={clickedRobots[i]} idx={i} num={num} setNum={setNum} iconNames={iconNames[i]} />
              )
            })}
         
          </IconsContainer>
        </ModalContainer>
      </OverlayPosition>
    </Overlay>
  ) : null;
};

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
`;

const OverlayPosition = styled.div`
  height: 30px;
  position: relative;
  top: 0px;
  left: 100px;
`;
const ModalContainer = styled.div`
  width: 420px;
  height: 420px;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`;
const TitleIconModal = styled.div`
  padding: 2rem;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`;
const IconsContainer = styled.div`
  width: 380px;
  height: 300px;
  margin-left: 14px;
  display: flex;
  flex-wrap: wrap;
`;



export default ProfileImageIcons;
