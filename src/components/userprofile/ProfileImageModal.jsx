import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import ProfileImageIcons from './ProfileImageIcons'
import basicImg from '../../images/basicImg.jpg'

const ProfileImageModal = ({ shown, close, setImageUrl,setImgFile }) => {
  const [profileChange, setProfileChange] = useState(false)
  const [selectIcon, setSelectIcon] = useState(false)

  // 내 PC에서 가져오기
  const FromMyPc = (e) => {
    setSelectIcon(false)
    setProfileChange(e.target.id)
  }
  const imgRef = useRef();

  const onChangeImage = (e) => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);    
      setImgFile(file)
    }
    // const formData = new FormData();
    // formData.append('file',imgRef.current.files[0] )
    // const response = await apiClient.post('주소', formData);
    // console.log(e.target.files[0])
    // setImageUrl(e.target.files[0])
    // console.log(formData)
  }
  
  // 아이콘 고르기
  const clickSelect = (e) => {
    setProfileChange(e.target.id)
    setSelectIcon(!selectIcon)
  }

  //기본 이미지로 설정
  const clickBasic = (e) => {
    setSelectIcon(false)
    setProfileChange(e.target.id)
    setImageUrl(basicImg)
  }
  return shown ? (
    <Overlay onClick={() => { close() }}>
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
        <ProfileImageIcons shown={selectIcon} close={() => { setSelectIcon(false) }} />
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
  top:380px;
  left: -570px;
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