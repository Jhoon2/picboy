import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ProfileImageIcons from './ProfileImageIcons'
import basicImg from '../../images/basicImg.jpg'
import { getCookieToken, getRefreshToken } from '../../shared/Cookie';
import { useMyContext } from '../../shared/ContextApi'

const myToken = getCookieToken();
const refreshToken = getRefreshToken();

const ProfileImageModal = ({ shown, close, imgFile, setImgFile }) => {
  const baseURL = process.env.REACT_APP_API_KEY;
  const myContext = useMyContext();
  const [profileChange, setProfileChange] = useState(false)
  const [selectIcon, setSelectIcon] = useState(false)
  const [imgUrl, setImgUrl] = useState(false)
  // const [changeImg, setChangeImg] = useState(imgFile)
  // 내 PC에서 가져오기
  const FromMyPc = (e) => {
    setSelectIcon(false)
    setProfileChange(e.target.id)
  }
  const imgRef = useRef();

  const onChangeImage =  (e) => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    // console.log(imgRef.current.files)
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
      sendApi(base64data);
      myContext.setImgAddress(base64data)
    }
    reader.readAsDataURL(file);
    close();
  }
  
  const sendApi = async (data) => {
    try {
      const response = await axios.put(`${baseURL}/mypage/update-image`, { img: data },
        {
          headers: {
            Authorization: myToken,
            'refresh-token': refreshToken
          }
        }
      )


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    
  },[imgUrl])
  // 아이콘 고르기
  const clickSelect = (e) => {
    
    setProfileChange(e.target.id)
    setSelectIcon(!selectIcon)
  }

  //기본 이미지로 설정
  const clickBasic = (e) => {
    setSelectIcon(false)
    setProfileChange(e.target.id)
    myContext.setImgAddress(basicImg)
    close();
  }

  const closeOuter = () => {
    close();
    setSelectIcon(false)
  }

  return shown ? (
    <Overlay onClick={closeOuter}>
      <OverlayPosition >
        <ModalContainer onClick={(e) => { e.stopPropagation(); }}>
        <label htmlFor="upload-photo">
          <input
                style={{ position: 'absolute', display:'none' }}
                accept="image/*"
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={onChangeImage}
                ref={imgRef}
              />
              <ModalText id='myPc' onClick={FromMyPc} profileChange={profileChange} >
                내 PC에서 가져오기</ModalText>
        </label>
            <TextBr />
          <ModalText id='select' onClick={clickSelect} profileChange={profileChange}>
            아이콘 고르기</ModalText>
            <TextBr />
          <ModalText id='noImg' onClick={clickBasic} profileChange={profileChange}>
            기본이미지로</ModalText>
        </ModalContainer>
        
        {/* 아이콘 고르기 모달창 */}
        <ProfileImageIcons shown={selectIcon} close={() => { setSelectIcon(false) }}  setSelectIcon={setSelectIcon}  />
      </OverlayPosition>
    </Overlay>
  ):null
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
  width: 300px;
  height: 30px;
  position:relative;
  top:470px;
  left: -520px;
`
const ModalContainer = styled.div`
  width: 200px;
  height: 149px;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`

const ModalText = styled.div`
  width: 200px;
  height: 23px;
  margin-top: 10px;
  padding: 15px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${(props)=> (props.id === props.profileChange) ? '#000000' : '#A3A3A3'} ;
  cursor: pointer;

  :first-child {
    margin-top: 15px;
  }
`
const TextBr = styled.div`
  width: 150px;
  height: 0px;
  margin-top: 5px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 0.5px solid #A3A3A3;
`
export default ProfileImageModal