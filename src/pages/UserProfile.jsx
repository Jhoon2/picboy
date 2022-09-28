import React from 'react'
import { useState,useRef } from 'react'
import { useEffect } from 'react'
import { useMyContext } from '../shared/ContextApi'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { __getUserData, __getUserPage } from '../redux/modules/UserPage'
import { __putEditNickname } from '../redux/modules/UserPage'

import styled from 'styled-components'
import api from '../shared/apis'

import UseGetUser from '../hooks/UseGetUser'
import GifCard from '../components/UserProfile/GifCard'
import ProfileImageModal from '../components/UserProfile/ProfileImageModal'
import CategoryOpen from '../components/UserProfile/CategoryOpen'
import TopScroll from '../global/TopScroll'

//이미지
import basicImg from '../images/mypage/basicImg.png'
import smallpencil from '../images/smallpencil.png'
import camera from '../images/Camera.png'
import editPencil from '../images/mypage/mode-edit-sharp.png'
import Listbanner from '../images/Com/Listbanner.svg';
import Listfooter from '../images/mypage/myPageFooter.svg'



const UserProfile = () => {
    const myContext = useMyContext();
    const params = useParams();
    const dispatch = useDispatch();


    //로그인 정보
    const userinfo = UseGetUser();
    const logonUserStatus = userinfo?.data?.data?.status
   //수정
    const [loadMyNickname, setLoadMyNickName] = useState('')
    const [editMyNickname, setEditMyNickName] = useState(false)
    const [editNickValue, setEditNickValue] = useState('')
    
    ////store 데이터 호출
    //마이페이지 유저
    const { userPage } = useSelector((state) => state.userpage)
    const UserPage = userPage && userPage.data
    
    
    //마이페이지 데이터
    const { userData } = useSelector((state) => state.userdata)
    // const { isLoading } = useSelector((state) => state.userdata)
    const [loading, setLoading] = useState(false)

     //무한스크롤관련
     const lastIntersectingData = useRef(null);
     const [ref, setRef] = useState(null);
     
    //페이지세팅
    let page = 0;
    //observe 콜백 함수
  const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        
        if (entry.isIntersecting) {

            page++
            dispatch(__getUserData({
                tab: myContext.tabNum,
                category: myContext.categoryNum,
                username:params.id,
                'page': page
            }))

            //조건이 트루
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)

        // 현재 타겟을 observe한다.
            observer.observe(entry.target)
        // unobserve가 아님
        } else {
            // console.log('여기서 취소?')
      }
    });
  };
    


    useEffect(() => {

        dispatch(__getUserPage({username:params.id}))
        dispatch(__getUserData({
            // tab: 0,
            category:1,
            username: params.id,
            page:0
        }))
        setLoading(true)

    }, [dispatch]);
    



        
  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer;
    if (lastIntersectingData) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      setTimeout(() => {
          observer.observe(lastIntersectingData.current);
          // observer.observe(ref);
            }, 500);
    }
      return () => observer && observer.disconnect();
      

  }, [lastIntersectingData,ref,myContext.tabNum,myContext.categoryNum]);


    
    const MouseClick = (e) => {
        e.preventDefault();
        myContext.setIsOpenProfileImg(!myContext.isOpenProfileImg)
    }

    const editNickname = () => {
        setEditMyNickName(true)
    }

    const editNickChange = (e) => {
        if ((e.target.value).length >= 2 && (e.target.value).length <= 8)
        {
            setLoadMyNickName(e.target.value)
            setEditNickValue('')
        }
        else { setEditNickValue('2글자 이상 8글자 이하로 입력해주세요') }
    }

    //닉네임 수정 완료
    const completeBtn = async () => {
        if (loadMyNickname === '') return setEditMyNickName(false)
        //서버에 전송
        const info = {
            nickname:loadMyNickname
        }
        dispatch(__putEditNickname(info))
        setEditMyNickName(false)
    }

    // 닉네임 수정버튼
    let button;
    if (editMyNickname) {
        button = <EditDone onClick={completeBtn}>
             <div style={{width:'100px',height:'100px',marginLeft:'-10px'}}>
                 <PenContainer style={{backgroundColor: 'black'}}>
                    <PenImg style={{backgroundColor: 'black'}} src={editPencil} />
                </PenContainer>
             </div>
        </EditDone>
    } else {
        button = <EditButton onClick={editNickname}>
            <PenContainer style={{marginLeft:'-10px',backgroundColor: 'white'}}>
                <PenImg src={smallpencil} />
            </PenContainer>
        </EditButton>
    }


    //닉네임 중복확인
    const [existedNick, setExistedNick] = useState(false);
    const [availableNick, setAvailableNick] = useState(false);

    const checkNickname = async () => {
        try {
        const response = await api.get(
            `/user/nickname-double-check/${loadMyNickname}`
            );
        if (!response.data.success) {
            setExistedNick(true);
        } else {
            setAvailableNick(true);
        }
        } catch (error) {
        console.log(error);
        }
        };
        const NickinputVacant = () => {
            setExistedNick(false);
            setAvailableNick(false);
        };
    
    if (!userinfo?.data?.data?.username) return
    
    //로그인유저 마이페이지 유저 같을 떄
    const samePerson = UserPage && UserPage?.username === userinfo?.data?.data?.username;

    return (
        <>
        <UserProfileContainer >
                <ImgBox />
                <ContainerInner >
                <TopScroll />
                {/* 프로필 */}
                <ProfileContainer>
                        <ProfileInner>
                        <ProfileImage src={UserPage && UserPage.profilImg ? UserPage.profilImg : basicImg} onClick={MouseClick} />
                        {UserPage&&UserPage?.username === userinfo?.data?.data?.username ?<CameraBox>
                            <CameraContainer>
                                <CameraImg src={camera} />
                            </CameraContainer>
                        </CameraBox>: null}
                        <TextProfileContents>
                            <TextContentContainer>
                                <TextContent>아이디</TextContent>
                                
                                <Texts>{logonUserStatus === 1 ? UserPage&&UserPage.username.slice(0,10) : 'Kakao user'}</Texts>
                            </TextContentContainer>
                            <TextContentContainer>
                                <TextContent>닉네임</TextContent>
                                <Texts >{editMyNickname ? 
                                    <EditInput placeholder={UserPage&&UserPage.nickname} onChange={editNickChange} onFocus={NickinputVacant} />
                                    : UserPage&&UserPage.nickname.slice(0,8)}
                                </Texts>
                                {editMyNickname ? 
                                <ValidationNickname>
                                        <div style={{ color: 'red', marginLeft: '20px'}}>{editNickValue} </div>
                                        {editNickValue ? null : <CheckButton onClick={checkNickname}>중복확인</CheckButton>}
                                        <div style={{width:'300px'}}>
                                            <Errorsmessage>
                                                {existedNick && '중복 아이디입니다'}
                                            </Errorsmessage>
                                            <NoErrorsmessage>
                                                {availableNick && '사용 가능한 아이디입니다'}
                                            </NoErrorsmessage>
                                        </div>
                                </ValidationNickname> : null}
                            </TextContentContainer>

                            <TextContentContainer>
                                <TextContent>게시물</TextContent>
                                <Texts>{UserPage&&UserPage.postCount}개</Texts>
                            </TextContentContainer>
                        </TextProfileContents>
                    </ProfileInner>
                        {UserPage&&UserPage.username === userinfo.data.data.username ? button : null}
                </ProfileContainer>
                <ProfileBorder />
                {/* 카테고리별 */}
                <CategoryOpen value={UserPage && UserPage.username === userinfo.data.data.username} username={UserPage && UserPage.username} />
               

                {/* 카드 */}
                <>
                    <CardContainer>
                        {userData.content && userData.content.map((data, i) => {
                            return (
                                <GifCard key={i} data={data} myImg={UserPage && UserPage.profilImg} myNickname={UserPage && UserPage.nickname}
                                    samePerson={samePerson} />
                            )
                        })}
                    </CardContainer>
                    <div style={{ width: '100px', height: '20px' }} ref={page? null : lastIntersectingData}></div>
                        </>
                        
            </ContainerInner>
            </UserProfileContainer>

            <Footerimg />
                
            {/* 프로필이미지 모달창 */}
            {UserPage&&UserPage.username === userinfo.data.data.username ? <ProfileImageModal shown={myContext.isOpenProfileImg}
            close={() => myContext.setIsOpenProfileImg(false)} /> : null}  
            
        </>
    )
}
const LoadingContainer = styled.div`
    margin-top: 80px;
`
const UserProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 190px;
`
const ContainerInner = styled.div`
    max-width: 1200px;
`
//배너
const ImgBox = styled.div`
  width: 100%;
  height: 620px;
  margin-top: 70px;
  position: absolute;
  z-index: -100;
  border: none;
  background: url(${Listbanner});
 ${({ theme }) => theme.backgroundSet('cover')}
`;

const ProfileContainer = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 230px;
    display: flex;
    justify-content: space-between;
    
    `
const ProfileInner = styled.div`
    padding-top: 38px;
    display: flex;
`

const ProfileImage = styled.img`
    width: 218px;
    height: 218px;
    border-radius: 150px;
    border: ${(props) => props.theme.inactive} 2px solid;
    background-color: white;
    background-size: contain;
`
const CameraBox = styled.div`
    width: 100px;
    height: 100px;
    margin-top: 100px;
    margin-left: -50px;
    /* background-color: gray; */
    position: relative;
`

const CameraContainer = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    position: absolute;
    top: 80px;
    left: 0px;
    background-color:${(props) => props.theme.ShadeRegular} ;
    z-index: 3;
`

const CameraImg = styled.img`
    width: 16px;
    margin-top: 10px;
    margin-left: 9px;
`


const ProfileBorder = styled.div`
    margin-top: 116px;
    border: 1px solid #000000;
`
const TextProfileContents = styled.div`
    width: 800px;
    height: 200px;
    margin-top: 40px;
    margin-left: 50px;
`
const TextContentContainer = styled.div`
    width: 1000px;
    display: flex;
    
`

const TextContent = styled.div`
    width: 80px;
    height: 50px;
    display: flex;
    font-size:  ${(props) => props.theme.Caption3};
`
const Texts = styled.div`
    margin-top: -5px;
    margin-left: -10px;
    font-size:  18px;
    font-weight: 400;
`
const EditInput = styled.input`
    width: 230px;
    height: 30px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    font-size: 28px;
`


const EditDone = styled.button`
    width: 50px;
    height: 50px;
    margin-top: 100px;
    margin-right: 50px;
    border-radius: 50px;
    border: none;
`


const EditButton = styled.button`
    width: 40px;
    height: 40px;
    margin-top: 100px;
    margin-right: 50px;
    border-radius: 50px;
    border: none;
    background-color: transparent;
`
const PenContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: ${(props) => props.theme.inactive} 2px solid;

`

const PenImg = styled.img`
    width: 30px;
    height: 30px;
    margin-top: 8px;
    border-radius: 30px;
    background-color: white;
    background-size: cover;
    /* border: ${(props) => props.theme.inactive} 2px solid; */
`
const ValidationNickname = styled.div`
    width: 50%;
    display: flex;
`


const CardContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;

` 
const CheckButton = styled.button`
  width: 100px;
  height: 40px;
  margin-top: -10px;
  margin-left: 10px;
  font-size: 14px;
  font-family: 'NotoLight';
  border: 1px solid grey;
  cursor: pointer;
  background-color: white;

  :hover {
    color: white;
    background-color: black;
  }
`;

const Errorsmessage = styled.div`
  width: 300px;
  margin-left: 10px;
  font-size: 13px;
  font-family: 'NotoLight';
  color: red;
`;

const NoErrorsmessage = styled.div`
  width: 300px;
  margin-left: 10px;
  font-size: 13px;
  font-family: 'NotoLight';
  color: green;
`;

const Footerimg = styled.div`
  width: 100%;
  height: 320px;
  border: none;
  margin-top: 380px;
  background: url(${Listfooter});
 ${({ theme }) => theme.backgroundSet('cover')}
`;

export default UserProfile