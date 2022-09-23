import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { __hidePost } from '../../redux/modules/UserPage'
import { useMyContext } from '../../shared/ContextApi'
import styled from 'styled-components'
import eyes from '../../images/mypage/eyes.png'
import grayEyes from '../../images/mypage/grayEyes.png'
import grayFlag from '../../images/mypage/grayFlag.png'
import grayLineEyes from '../../images/mypage/grayLineEyes.png'


const MySpecialButton = ({ shown, close, postId }) => {
  const [path, setPath] = useState(0)
  const dispatch = useDispatch();
  const myContext = useMyContext();

  const hide = (e) => {
    setPath(1)
    dispatch(__hidePost(postId))
  }
  const declaration = (e) => {
    setPath(2)
  }


  return shown ? (
    <FullOverLay onClick={()=>{close()}}>
      <Overlay >
        <OverlayPosition >
          <OverlayContainer>
            <ModalContainer onClick={e => { e.stopPropagation() }}>
              <ModalText id='hide' name='1' onClick={hide}
               style={path === 1? { color: '#000000', fontWeight:'700'} : {color:'#A3A3A3',fontWeight:'400'}}
              >
                <HideIconContainer>
                {myContext.tabNum === 3 ? 
                  <><IconImg src={grayEyes} /><div style={{ marginTop: '-5px' }}>보이기</div></> :
                  <><IconImg src={grayLineEyes} /><div style={{ marginTop: '-5px' }}>숨기기</div></>}
                  </HideIconContainer>
              </ModalText>
              <TextBr />
              <ModalText id='declaration' name='2' onClick={declaration}
                 style={path ===2 ? { color: '#000000', fontWeight:'700'} : {color:'#A3A3A3',fontWeight:'400'}}
              >
                <HideIconContainer>
                  <IconImg src={grayFlag} style={{marginTop: '0px'}} />
                  <div>신고</div>
                </HideIconContainer>
              </ModalText>
            </ModalContainer>
          </OverlayContainer>
        </OverlayPosition>
      </Overlay>
    </FullOverLay>
  ) : null
}
const FullOverLay = styled.div`
   position: absolute;
    width: 100vw;
    height: 100vh;
    bottom: 0;

`

const Overlay = styled.div`
  position: absolute;
  /* width: 100vw; */
  /* height: ; */
  top: 1270px;
  bottom: 0;
  left: 10px;
  z-index: 9999;
`
const OverlayContainer = styled.div`
  width: 200px;
  position: absolute;
`
const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top: -330px;
  left: 330px;
`
const ModalContainer = styled.div`
  width: 109px;
  height: 100px;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`
const ModalText = styled.div`
  width: 132px;
  height: 23px;
  margin-top: 5px;
  padding: 15px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: ${(props) => props.theme.Caption2};
  cursor: pointer;

  :first-child {
    margin-top: 15px;
  }

`
const TextBr = styled.div`
  width: 105px;
  margin-top: 5px;
  /* margin-left: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #A3A3A3;
`
const HideIconContainer = styled.div`
  display: flex;
`
const IconImg = styled.img`
  width: 18px;
  height: 16px;
  margin-top: -4px;
  margin-right: 10px;
  margin-left: -8px;
`

export default MySpecialButton