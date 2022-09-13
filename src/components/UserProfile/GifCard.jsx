import React from 'react'
import styled from 'styled-components'

const GifCard = ({ data }) => {
  return (
    <CardContainer>
      <GifImg src={data.imgUrl}/>
        <OverlayImg>
          <HoverSideButton>···</HoverSideButton>
          <HoverContent>
          <div style={{color:'white'
          }}>{data.topic ? data.topic : null}</div>
            <div style={{display :'flex'}}>
              <ClickCircle><div style={{ marginTop:'15px',marginLeft:'12px', fontSize:'10px'}}>다운</div></ClickCircle>
              <ClickCircle><div style={{ marginTop:'5px',marginLeft:'9px', fontSize:'30px'}}>♥</div>
              </ClickCircle>
            </div>
          </HoverContent>
        </OverlayImg>
     
      <GifContents>
        <UserProfileContent>
          <ProfileImage  />
          <Participants><div style={{ marginTop:'5px', marginLeft:'5px', fontSize:'10px'}}>+3</div></Participants>
          <div style={{marginTop:'15px', marginLeft:'15px'}}>{data.nickname} 외 3명</div>
        </UserProfileContent>
        <div style={{display:'flex'}}>
          <div style={{ marginLeft: '15px', fontSize: '30px' }}>♥</div>
          <div style={{ marginTop:'7px',marginLeft: '10px',fontSize: '20px' }}>30</div>
        </div>
      </GifContents>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 388px;
  height: 400px;
  margin-top: 50px;
  margin-right: 10px;
  position: relative;
`
const GifImg = styled.img`
  width: 100%;
  height: 316px;
  background-color: #E6E6E6;
`
const OverlayImg = styled.div`
  width: 388px;
  height: 316px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
const HoverSideButton = styled.button`
  padding: 1rem;
  font-size: 30px;
  border: none;
  float: right;
  cursor: pointer;
  background-color: transparent;
`

const HoverContent = styled.div`
  margin-top: 260px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
`
const ClickCircle = styled.div`
  width: 50px;
  height: 50px;
  margin-top: -18px;
  border-radius: 50px;
  cursor: pointer;
  background-color: gray;

  :first-child {
    margin-right: 10px;
  }
`

const GifContents = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
`
const UserProfileContent = styled.div`
  display: flex;
`

const ProfileImage = styled.div`
  width: 57px;
  height: 57px;
  border-radius: 50px;
  background-color: gray;
`

const Participants = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 60px;
  border-radius: 24px;
  background-color: #D9D9D9;
`

export default GifCard