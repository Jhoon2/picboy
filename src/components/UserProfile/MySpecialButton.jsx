import React from 'react'
import styled from 'styled-components'

const MySpecialButton = ({ shown, close, setOpenSpecialModal }) => {
  const hide = (e) => {
    console.log(e.target.id)
    // setCategoryContent(e.target.id)
    // myContext.setCategoryNum(1)
  }
  const declaration = (e) => {
    console.log(e.target.id)

    // setCategoryContent(e.target.id)
    // myContext.setCategoryNum(2)
  }
  const deletePost = (e) => {
    console.log(e.target.id)

    // setCategoryContent(e.target.id)
    // myContext.setCategoryNum(3)
  }
  return shown ? (
    <Overlay onClick={() => { close() }}>
      <OverlayPosition >
        <OverlayContainer>
          <ModalContainer onClick={e => { e.stopPropagation() }}>
            <ModalText id='hide' name='1' onClick={hide}
              // categoryContent={myContext.categoryNum}
            >
              숨기기
            </ModalText>
            <TextBr />
            <ModalText id='declaration' name='2' onClick={declaration}
              // categoryContent={myContext.categoryNum}
            >
              신고
            </ModalText>
            <TextBr />
            <ModalText id='delete' name='3' onClick={deletePost}
              // categoryContent={myContext.categoryNum}
            >
              삭제
            </ModalText>
          </ModalContainer>
        </OverlayContainer>
      </OverlayPosition>
    </Overlay>
  ) : null
}

const Overlay = styled.div`
  /* position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center; */
`
const OverlayContainer = styled.div`
  /* width: 200px;
  position: absolute; */
`
const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top: -330px;
  left: 330px;
`
const ModalContainer = styled.div`
  width: 132px;
  height: 149px;
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
  font-weight: 700;
  font-size: 16px;
  color: ${(props)=> (props.name === String(props.categoryContent)) ? '#000000' : '#A3A3A3'} ;
  cursor: pointer;

  :first-child {
    margin-top: 15px;
  }
`
const TextBr = styled.div`
  width: 84px;
  height: 0px;
  margin-top: 5px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 0.5px solid #A3A3A3;
`
export default MySpecialButton