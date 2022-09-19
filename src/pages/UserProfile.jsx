import React, { useCallback } from 'react'
import { useState,useRef } from 'react'
import { useEffect } from 'react'
import { useMyContext } from '../shared/ContextApi'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import axios from "axios"
import { getCookieToken, getRefreshToken } from '../shared/Cookie'
import { __getUserData, __getUserPage } from '../redux/modules/UserPage'
import { __putEditNickname } from '../redux/modules/UserPage'

import UseGet from '../hooks/UseGetUser'
import styled from 'styled-components'
import GifCard from '../components/UserProfile/GifCard'
import ProfileImageModal from '../components/UserProfile/ProfileImageModal'
import CategoryOpen from '../components/UserProfile/CategoryOpen'
import basicImg from '../images/basicImg.jpg'


const myToken = getCookieToken();
const refreshToken = getRefreshToken();

const UserProfile = () => {
    const baseURL = process.env.REACT_APP_API_KEY;
    const myContext = useMyContext();
    const params = useParams();

    const dispatch = useDispatch();

    // console.log(UserPage)

    //로그인 정보
    const userinfo = UseGet();


    const [user, setUser] = useState(null)

    const [page, setPage] = useState(-1);
    const lastIntersectingData = useRef(null);

    const [imgFile, setImgFile] = useState(null)
    const [loadMyNickname, setLoadMyNickName] = useState('')
    const [editMyNickname, setEditMyNickName] = useState(false)
    const [editNickValue, setEditNickValue] = useState('')
    const [postCount, setPostCount] = useState(false)

   
    

    
    //observe 콜백 함수
  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //조건이 트루
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        setPage((page) => page + 1);
        // console.log('페이지나와라', page)
        // 현재 타겟을 observe한다.
        observer.observe(entry.target); // unobserve가 아님
      }
    });
  };
    // console.log('페이지나와라2',page)
    

    
    const {userPage} = useSelector((state) => state.userpage)
    const UserPage = userPage && userPage.data
    // console.log(UserPage && UserPage.username)
    

    const {userData}  = useSelector((state) => state.userdata)
    // console.log(userData&&userData)

    useEffect(() => {
        dispatch(__getUserPage({username:params.id}))
        dispatch(__getUserData({username:params.id}))
            
    }, [dispatch]);
    



        
  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer;
    if (lastIntersectingData) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersectingData.current);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingData]);


    const RightMouseClick = (e) => {
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
        if (editMyNickname === '') setEditMyNickName(false)
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
        button = <EditDone onClick={completeBtn}>완료</EditDone>
    } else {
        button = <EditButton onClick={editNickname}>수정</EditButton>
    }


    //닉네임 중복확인
    const [existedNick, setExistedNick] = useState(false);
    const [availableNick, setAvailableNick] = useState(false);

    const checkNickname = async () => {
        try {
        const response = await axios.get(
            `${baseURL}/user/nickname-double-check/${loadMyNickname}`
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
    
    return (
        <UserProfileContainer>
            <ContainerInner >

                {/* 프로필 */}
                <ProfileContainer>
                    <ProfileInner>
                        <ProfileImage src={myContext.imgAddress&&myContext.imgAddress ? myContext.imgAddress : basicImg} onContextMenu={RightMouseClick} />
                        <TextProfileContents>
                            <TextContentContainer>
                                <TextContent>아이디</TextContent>
                                
                                <Texts>{UserPage&&UserPage.username}</Texts>
                            </TextContentContainer>
                            <TextContentContainer>
                                <TextContent>닉네임</TextContent>
                                <Texts >{editMyNickname ? 
                                    <EditInput placeholder={UserPage&&UserPage.nickname} onChange={editNickChange} onFocus={NickinputVacant} />
                                    : UserPage&&UserPage.nickname}
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
                <CategoryOpen value={UserPage&&UserPage.username === userinfo.data.data.username} />
               


                {/* 카드 */}
                <>
                    <CardContainer>
                        {userData.content && userData.content.map((data, i) => {
                            return (
                                <GifCard key={i} data={data} myImg={UserPage&&UserPage.profileImg} myNickname={UserPage&&UserPage.nickname} />
                            )
                        })}
                    </CardContainer>
                    <div style={{ width: '100px', height: '20px', backgroundColor: 'gray' }} ref={page === 0 ? null : lastIntersectingData}>.</div>
                </>
            </ContainerInner>


            {/* 프로필이미지 모달창 */}
            {UserPage&&UserPage.username === userinfo.data.data.username ? <ProfileImageModal shown={myContext.isOpenProfileImg}
                close={() => { myContext.setIsOpenProfileImg(false) }} imgFile={imgFile} setImgFile={setImgFile}/> : null}  
        
        
        </UserProfileContainer>
    )
}

const UserProfileContainer = styled.div`
    display: flex;
    justify-content: center;
`
const ContainerInner = styled.div`
    width: 1200px;
    height: 100%;
`
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
    background-color: white;
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
    font-size: 16px;
`
const Texts = styled.div`
    margin-top: -12px;
    margin-left: 20px;
    font-size: 30px;
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
    background-color: black;
    color: white;
`

const EditButton = styled.button`
    width: 50px;
    height: 50px;
    margin-top: 100px;
    margin-right: 50px;
    border-radius: 50px;
    border: none;
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


export default UserProfile