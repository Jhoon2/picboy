import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const CategoryModal = ({children, shown, close}) => {
  const [categoryContent, setCategoryContent] = useState('recent')

  return shown? (
    <Overlay onClick={()=>{close()}}>
      <OverlayPosition >
        <OverlayContainer>
          <ModalContainer onClick={e => {e.stopPropagation();}}>
            <ModalText id='recent' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent} >
              최신순
              </ModalText>
            <TextBr />
            <ModalText id='liked' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent}>
              좋아요순
            </ModalText>
            <TextBr />
            <ModalText id='comments' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent}>
              댓글많은순
            </ModalText>
            {/* {children} */}
          </ModalContainer>
        </OverlayContainer>
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
const OverlayContainer = styled.div`
  width: 200px;
  position: absolute;
`
const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top:790px;
  left: 450px;
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
  color: ${(props)=> (props.id === props.categoryContent) ? '#000000' : '#A3A3A3'} ;
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
export default CategoryModal

