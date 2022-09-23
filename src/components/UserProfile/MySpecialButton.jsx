import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMyContext } from '../../shared/ContextApi'
import styled from 'styled-components'

//불러오기
import { __postReport } from '../../redux/modules/Report'
import { __hidePost } from '../../redux/modules/UserPage'
import AnyModal from '../../elem/AnyModal'

//이미지
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
    // setTimeout(() => {
    //   setPath(0)
    // },100)
  }

  //신고
  const [toggleDeclar, setToggleDecla] = useState(false)

  const declaration = (e) => {
    myContext.setDecalrBtn(true)
    setToggleDecla(!toggleDeclar)
    setPath(2)
    dispatch(__postReport(postId))
  }


  return shown ? (
    <FullOverLay onClick={() => { close() }}>
      {myContext.declarBtn ? (
        <ErrorBox onClick={() => myContext.setDecalrBtn(false)}>
          <AnyModal title="안내" content="신고 되었습니다" />
          </ErrorBox>
      ) : null}
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

const ErrorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const FullOverLay = styled.div`

    position: relative;
    width: 100vw;
    height: 100vh;
    top: -1000px;
    bottom: 0;
    left: -100%;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    /* background-color:gray ; */

`

const Overlay = styled.div`
`
const OverlayContainer = styled.div`
`
const OverlayPosition = styled.div`
  height: 30px;
  position:absolute;
  top: 660px;
  left: 590px;
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