import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import ProfileImageIcons from './ProfileImageIcons'
import basicImg from '../../images/basicImg.jpg'
import { __putEditProfileImg } from '../../redux/modules/UserPage'
import { useDispatch } from 'react-redux'
import arrow from '../../images/keyboard-arrow-right-2.png'


const ProfileImageModal = ({ shown, close, }) => {
  const dispatch = useDispatch();

  const [selectIcon, setSelectIcon] = useState(false)
  const [imgUrl, setImgUrl] = useState(false)

  const [path, setPath] = useState(false)
  // 내 PC에서 가져오기
  const FromMyPc = (e) => {
    setSelectIcon(false)
  }
  const imgRef = useRef();

  const onChangeImage =  (e) => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
      dispatch(__putEditProfileImg({ img: base64data }))
    }
    reader.readAsDataURL(file);
    close();
  }
  
  useEffect(() => {
    
  }, [imgUrl, dispatch])
  
  // 아이콘 고르기
  const clickSelect = (e) => {
    setPath(!path)
    setSelectIcon(!selectIcon)
  }

  //기본 이미지로 설정
  const clickBasic = (e) => {
    setSelectIcon(false)
    dispatch(__putEditProfileImg({ img: basicImg }))
    close();
  }
  const closeOuter = () => {
    close();
    setSelectIcon(false)
    setPath(false)
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
            <ModalText name='myPc' onClick={FromMyPc}  >
              <ImgTextContainer >
                <div>내 PC에서 가져오기</div>
                <img src={arrow} />
              </ImgTextContainer>
            </ModalText>
        </label>
            <TextBr />
          <ModalText name='select' onClick={clickSelect}
            style={path? { color: '#000000', fontWeight:'700'} : {color:'#A3A3A3',fontWeight:'400'}}>
            <ImgTextContainer >
              <div >아이콘 고르기</div>
              <img src={arrow} />
            </ImgTextContainer>
          </ModalText>
            <TextBr />
          <ModalText name='noImg' onClick={clickBasic}  >
            <ImgTextContainer >
              <div>기본이미지로</div>
              <img src={arrow} />
            </ImgTextContainer>
          </ModalText>
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
  width: 216px;
  height: 154px;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`

const ModalText = styled.div`
  width: 200px;
  height: 23px;
  margin-top: 11px;
  padding: 15px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: ${(props) => props.theme.Caption2};
  color: ${(props) => props.theme.inactive};

  cursor: pointer;

  :first-child {
    margin-top: 15px;
  }

`
const ImgTextContainer = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-between;
`

const TextBr = styled.div`
  width: 210px;
  /* height: 1px; */
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #D9D9D9;
`
export default ProfileImageModal