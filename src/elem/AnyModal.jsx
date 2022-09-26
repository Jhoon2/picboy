import React from 'react'
import styled from 'styled-components'
import { useMyContext } from '../shared/ContextApi'

const AnyModal = ({title, content, anyData}) => {
  const myContext = useMyContext();

  const closeButton = () => {
    myContext.btnClickOff()
    myContext.setDecalrBtn(false)
    myContext.setCommetDeleteBtn(false)
    myContext.setCommetApplyBtn(false)
    myContext.setSettingFrameBtn(false)
    myContext.setDrawingDoneBtn(false)
    myContext.setTopicBtn(false)
    myContext.setPostTopicBtn(false)
    myContext.setDecalrBtn(false)
    myContext.setDeclarCancel(false)
    myContext.setVacantCanvas(false)
  }
  return (
    <ErrorContainer onClick={(e) => { e.stopPropagation(); }}>
      <div style={{textAlign:'center'}}>
        <ErrorTitle margintop = {title ? '40px' : '70px'}>{title}</ErrorTitle>
    <ErrorContent>{content}</ErrorContent> 
        {anyData ? <ErrorButton onClick={() => window.location.href = '/'}><div style={{ marginTop: '13px' }}>확인</div></ErrorButton>:
          <ErrorButton onClick={closeButton}><div style={{ marginTop: '13px' }}>확인</div></ErrorButton>}
      </div>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.div`
  min-width: 400px;
  min-height: 240px;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  border: 2px solid black;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
  background-color: white;
`

const ErrorTitle = styled.div`
  margin-top: ${(props) => props.margintop};
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
`

const ErrorContent = styled.div`
  margin-top: 22px;
  font-size: 16px;
  font-weight: 400;
`


const ErrorButton = styled.div`
  width: 175px;
  height: 49px;
  margin-top: 43px;
  margin-left: 112px;
  font-size: 16px;
  color: #FFFFFF;
  border: 1px solid #000000;
  background: #000000;
  cursor: pointer;
`


export default AnyModal