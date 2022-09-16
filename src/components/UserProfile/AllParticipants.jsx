import React from 'react'
import styled from 'styled-components'
import basicImg from '../../images/basicImg.jpg'

const AllParticipants = ({ shown, close, data}) => {
  return shown ? (
    <FullOverLay onClick={()=>{close()}}>
      <Overlay >
        <OverlayPosition >
          <OverlayContainer>
            <ModalContainer onClick={e => { e.stopPropagation() }}>
              {console.log(data)}
              {data && data.map((person, idx) => {
                console.log(person)
                return (
                <DataPersonContainer key={idx}>
                  <PersonImg src={!person.img?basicImg : person.img} ></PersonImg>
                  <PersonText>{person.nickname}</PersonText>
                </DataPersonContainer>
                )
              })}
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
  top: 1450px;
  bottom: 0;
  left: -450px;
  z-index: 9999;
`
const OverlayContainer = styled.div`
  /* width: 200px; */
  position: absolute;
`
const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top: -400px;
  left: 250px;
`
const ModalContainer = styled.div`
  width: 202px;
  height: 230px;
  overflow: auto;
  position: absolute;
  z-index: 2;
  border: 2px solid #000000;
  background-color: white;
`
const DataPersonContainer = styled.div`
  margin-top: 6px;
  padding: 0.6rem;
  display: flex;
`

const PersonImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`
const PersonText = styled.div`
  margin-top: 9px;
  margin-left: 10px;
`
export default AllParticipants