import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookieToken, getRefreshToken } from '../../shared/Cookie'
import { useMyContext } from '../../shared/ContextApi'
import instance from '../../shared/apis'
import axios from 'axios'
import styled from 'styled-components'
import download from '../../images/download-btn.png'
import heart from '../../images/like-before.png'
import AllParticipants from './AllParticipants'
import MySpecialButton from './MySpecialButton'
import basicImg from '../../images/basicImg.jpg'
import favorite from '../../images/favorite@2x.png'
import moreHoriz from '../../images/More horiz@2x.png'
import textbox from '../../images/Textsms.png'

const GifCard = ({ data, myImg, myNickname }) => {
  const myContext = useMyContext();
  const navigate = useNavigate();
  // 참여자들 보여주기
  const [peopleData, setPeopleData] = useState()
  const showAllParticipants = async(e) => {
    e.stopPropagation();
    const peopleData = await instance.get(`/post/join-list/${data.postId}`,
       )
    const datas = peopleData && peopleData.data.data
    if (datas.length <= 1) {
      myContext.setAllParticipants(false)
    } else {
      setPeopleData(datas)
      myContext.setAllParticipants(!myContext.allParticipants)
    }
  }

  //완료 페이지, 진행중 페이지 이동
  const movePage = () => {
    if (data.status === 1) {
      navigate(`/progressdetail/${data.postId}`)
    } else {
      navigate(`/complete-detail/${data.postId}`)
    }
  }

  //... 버튼
  const [openSpecialModal, setOpenSpecialModal] =useState(false)
  const buttonCollection = (e) => {
    e.stopPropagation();
    // console.log('눌러라')
    setOpenSpecialModal(!openSpecialModal)
  }
  
  return (
    <CardContainer>
      <div >
        <GifImg src={data.imgUrl} />
        {/* {console.log(data.imgUrl)} */}
        <OverlayImg onClick={movePage} openSpecialModal={openSpecialModal}>
          <HoverSideButton onClick={buttonCollection}><HorizBtn src={moreHoriz} /></HoverSideButton>
          <HoverContent>
          <div style={{color:'white'
          }}>{data.topic ? data.topic : null}</div>
            <div style={{display :'flex'}}>
              <a href='#' download='' onClick={(e)=>e.stopPropagation()}>
                <ClickCircle src={download}/>
              </a>
              <ClickCircle src={heart} onClick={(e)=>e.stopPropagation()}/>
            </div>
          </HoverContent>
        </OverlayImg>
        <GifContents>
          <UserProfileContent onClick={showAllParticipants} >
            <ProfileImage src={!data.profileImg ? basicImg : data.profileImg}/>
            <Participants><div style={{ marginTop: '5px', marginLeft: '5px', fontSize: '10px' }}>+{data.memberCount}</div></Participants>
            <Texts >{data.nickname} 외 {data.memberCount}명</Texts>
          </UserProfileContent>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '15px', fontSize: '30px' }}>
              <img style={{ width: '16px' }} src={textbox} />
            </div>
              <LikeCount >{data.reportCount}</LikeCount>
            <div style={{ marginLeft: '15px', fontSize: '30px' }}>
              <img style={{width:'16px'}} src={favorite} />
            </div>
            <LikeCount >{data.likeCount}</LikeCount>
          </div>
        </GifContents>
      </div>

      {/* ...버튼 */}
      <MySpecialButton shown={openSpecialModal} close={() => { setOpenSpecialModal(false) }} setOpenSpecialModal={setOpenSpecialModal} /> 
      {/* 참여자들 */}
      {myContext.allParticipants ?
        <AllParticipants shown={myContext.allParticipants} close={() => { myContext.setAllParticipants(false) }} data={peopleData}  myNickname={myNickname} />
        : null}
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
const Overlay = styled.div`
   /* position: absolute;
    width: 100vw;
    height: 100vh;
    bottom: 0; */
  /* display: flex;
  justify-content: center;
  align-items: center; */ 

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
  opacity: ${(props) => props.openSpecialModal ? 1 : 0};
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
const HorizBtn = styled.img`
  width: 30px;
  height: 30px;
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

const ClickCircle = styled.img`
  width: 46px;
  height: 46px;
  margin-top: -18px;
  border-radius: 46px;
  cursor: pointer;
  /* background-color: gray; */

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
  cursor: pointer;
`

const ProfileImage = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 50px;
  border: 2px lightgray solid;
  /* background-color: gray; */
  cursor: pointer;
`
const Texts = styled.div`
  margin-top: 17px;
  margin-left: 15px;
  font-size : ${(props) => props.theme.Caption2};
`
const LikeCount = styled.div`
  margin-top: 13px;
  margin-left: 3px;
  font-weight : ${(props) => props.theme.HeadlineRG};
  font-size : ${(props) => props.theme.Caption2};
  color : ${(props) => props.theme.inactive};

`

const Participants = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 60px;
  border-radius: 24px;
  font-size: 9px;
  color: white;
  background-color: black;
`

export default GifCard