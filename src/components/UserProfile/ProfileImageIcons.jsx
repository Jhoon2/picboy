import React from 'react'
import { useRef } from 'react'
import { useMyContext } from '../../shared/ContextApi'
import styled from 'styled-components'
import icon from '../../images/icon.png'
import reactlogo from '../../images/logo512.png'
import user from '../../images/user.png'
import topbutton from '../../images/TopButton.png'
import line from '../../images/line.png'
import rectangle from '../../images/rectangle.png'

const ProfileImageIcons = ({ shown, close, setSelectIcon }) => {
  const myContext = useMyContext();
  const imgRef = useRef();

  const clickIcon = (e) => {
    e.stopPropagation()
    // console.log(e.target)
    // const reader = new FileReader();
    // const file = e.target.src;
    // reader.readAsDataURL(file);

    // console.log(file)
    // const aa = reader.readAsDataURL(file)
    // console.log(aa)
    // reader.onloadend = () => {
    //   const base64data = reader.result;
    //   // setImgUrl(base64data);
    //   // sendApi(base64data);
    //   myContext.setImgAddress(base64data)
    // }
    // reader.readAsDataURL(file);
    console.log(myContext.imgAddress)
    setSelectIcon(false)
    close();
    myContext.setIsOpenProfileImg(false)
  }
  const closeBox = () => {
    close();
    setSelectIcon(false)
  }
  return shown ? (
    <Overlay onClick={closeBox}>
    <OverlayPosition >
        <ModalContainer onClick={e => {e.stopPropagation();}}>
          <TitleIconModal>아이콘을 선택하세요.</TitleIconModal>
          <IconsContainer>
            <IconCard>
              <IconImage id='fisrt'  ref={imgRef} src={icon} onClick={clickIcon}></IconImage>
              <IconName>이름</IconName>
            </IconCard>
            <IconCard>
              <IconImage id='second' ref={imgRef} src={reactlogo} onClick={clickIcon}></IconImage>
              <IconName>이름</IconName>
            </IconCard>
            <IconCard>
              <IconImage id='third'ref={imgRef} src={user} onClick={clickIcon}></IconImage>
              <IconName>이름</IconName>
            </IconCard>
            <IconCard>
              <IconImage id='fourth' ref={imgRef} src={topbutton} onClick={clickIcon}></IconImage>
              <IconName>이름</IconName>
            </IconCard>
            <IconCard>
              <IconImage id='fifth' ref={imgRef} src={line} onClick={clickIcon}></IconImage>
              <IconName>이름</IconName>
            </IconCard>
            <IconCard>
              <IconImage id='sixth' ref={imgRef} src={rectangle} onClick={clickIcon}></IconImage>
              <IconName>이름</IconName>
            </IconCard>
          </IconsContainer>
        </ModalContainer>
    </OverlayPosition>
  </Overlay>
  ) : null
}

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
`

const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top:0px;
  left: 100px;
`
const ModalContainer = styled.div`
  width: 420px;
  height: 420px;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`
const TitleIconModal = styled.div`
  padding: 2rem;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`
const IconsContainer = styled.div`
  width: 380px;
  height: 300px;
  margin-left: 14px;
  display: flex;
  flex-wrap: wrap;
`

const IconCard = styled.div`
  width: 125px;
  height: 150px;
  padding: 1rem;
`

const IconImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background: #D9D9D9;
`

const IconName = styled.div`
  margin-top: 10px;
  text-align: center;
`

export default ProfileImageIcons