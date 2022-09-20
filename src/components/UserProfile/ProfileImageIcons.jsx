import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useMyContext } from '../../shared/ContextApi'
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
import { useDispatch } from 'react-redux'


const ProfileImageIcons = ({ shown, close, setSelectIcon }) => {
  const myContext = useMyContext();
  const imgRef = useRef();
  const dispatch = useDispatch();
  const [path, setPath] = useState(0)

  const clickIcon1 = () => {
    setPath(1)
    dispatch(__selectIconImg({ img: robot1 }))
  }
  const clickIcon2 = () => {
    setPath(2)
    dispatch(__selectIconImg({ img: robot2 }))
  }
  const clickIcon3 = () => {
    setPath(3)
    dispatch(__selectIconImg({ img: robot3 }))
  }
  const clickIcon4 = () => {
    setPath(4)
    dispatch(__selectIconImg({ img: robot4 }))
  }
  const clickIcon5 = () => {
    setPath(5)
    dispatch(__selectIconImg({ img: robot5 }))
  }
  const clickIcon6 = () => {
    setPath(6)
    dispatch(__selectIconImg({ img: robot6 }))
  }

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
            <IconCard>
              <IconImage id='fisrt'  ref={imgRef} src={path ===1 ? robotClick1: robot1} onClick={clickIcon1}></IconImage>
              {/* <IconName>이름</IconName> */}
            </IconCard>
            <IconCard>
              <IconImage id='second' ref={imgRef} src={path ===2 ? robotClick2: robot2} onClick={clickIcon2}></IconImage>
              {/* <IconName>이름</IconName> */}
            </IconCard>
            <IconCard>
              <IconImage id='third'ref={imgRef} src={path ===3 ? robotClick3: robot3} onClick={clickIcon3}></IconImage>
              {/* <IconName>이름</IconName> */}
            </IconCard>
            <IconCard>
              <IconImage id='fourth' ref={imgRef} src={path ===4 ? robotClick4: robot4} onClick={clickIcon4}></IconImage>
              {/* <IconName>이름</IconName> */}
            </IconCard>
            <IconCard>
              <IconImage id='fifth' ref={imgRef} src={path ===5 ? robotClick5: robot5} onClick={clickIcon5}></IconImage>
              {/* <IconName>이름</IconName> */}
            </IconCard>
            <IconCard>
              <IconImage id='sixth' ref={imgRef} src={path ===6 ? robotClick6: robot6} onClick={clickIcon6}></IconImage>
              {/* <IconName>이름</IconName> */}
            </IconCard>
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

const IconCard = styled.div`
  width: 125px;
  height: 150px;
  padding: 1rem;
`;

const IconImage = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 100px;
  background: #d9d9d9;
`;

const IconName = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export default ProfileImageIcons;
