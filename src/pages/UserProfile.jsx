import React, { useCallback } from 'react'
import { useState,useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"

import styled from 'styled-components'
import GifCard from '../components/UserProfile/GifCard'
import ProfileImageModal from '../components/UserProfile/ProfileImageModal'
import { getCookieToken, getRefreshToken } from '../shared/Cookie'
import UseGet from '../hooks/UseGetUser'
import { useMyContext } from '../shared/ContextApi'
import basicImg from '../images/basicImg.jpg'
import CategoryOpen from '../components/UserProfile/CategoryOpen'
import { useParams } from 'react-router-dom'


const myToken = getCookieToken();
const refreshToken = getRefreshToken();

const UserProfile = () => {
    const baseURL = process.env.REACT_APP_API_KEY;
    const myContext = useMyContext();
    const params = useParams();
    // console.log(params)
    //로그인 정보
    const userinfo = UseGet();


    const [user, setUser] = useState(null)

    const [randomData, setRandomData] = useState([]);
    const [page, setPage] = useState(-1);
    const lastIntersectingData = useRef(null);

    // const [isOpenCategory, setIsOpenCategory] = useState(false)
    // const [imageUrl, setImageUrl] = useState(); 
    const [imgFile, setImgFile] = useState(null)
    const [loadMyNickname, setLoadMyNickName] = useState('')
    const [editMyNickname, setEditMyNickName] = useState(false)
    const [editNickValue, setEditNickValue] = useState('')
    const [postCount, setPostCount] = useState(false)

   
    //로그인한 유저 정보로 
    const readUser = useCallback(
        async () => {
            // console.log('위에꺼')
            const response = await axios.get(`${baseURL}/mypage/user-info?nickname=${ userinfo?.data?.data.nickname}`)
            setUser(response)
            const nickname = response.data.data.nickname
            setLoadMyNickName(nickname)
            setPostCount(response.data.data.postCount)
            myContext.setImgAddress(response.data.data.profilImg)
            readMypage(nickname)
            //컴포넌트 다시
           
    }, [userinfo,page,myContext.tabNum,myContext.categoryNum])
    
    ////////////
    ///////////// 작업중
    // console.log(params.id)
    //다른 사람 정보 부르기
    const readOther = useCallback(
        async () => {
        // console.log('나오나', params.id)
            //////////////////////////////////////////////////////////
            //다른 사람들 페이지로 갈 수 있을 때 userinfo?.data?.data.nickname 대신 사람들의 닉네임을 받기
            const response = await axios.get(`${baseURL}/mypage/user-info?nickname=${params.id}`)
            // console.log(response&&response)

            setUser(response)
            const nickname = response.data.data.nickname
            setLoadMyNickName(nickname)
            setPostCount(response.data.data.postCount)
            myContext.setImgAddress(response.data.data.profilImg)
            readMypage(nickname)
            //컴포넌트 다시
           
    }, [page,myContext.tabNum,myContext.categoryNum])
    const readMypage = async (nickname) => {
        // console.log(myContext.tabNum)
        // console.log(myContext.categoryNum,'카테고리넘버')
        const response = await axios.get
            (`${baseURL}/mypage/post/${myContext.tabNum}/${myContext.categoryNum}?nickname=${nickname}&page=${page}&size=6`,
        {
            headers: {
                Authorization: myToken,
                'refresh-token': refreshToken
            }

            })
            // console.log(response&&response.data)
        setRandomData(randomData.concat(response&&response.data.data));
    }
    
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
    
//   console.log('유저정보', userinfo)
    //유저 정보 있을시
    useEffect(() => {
        if (userinfo && userinfo.data.data.nickname === params.id) {
            readUser()
        } else {
            readOther()
        }
      }, [page,userinfo,readUser,readOther,imgFile]);

    
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
    const completeBtn = async () => {
        if (editMyNickname === '') setEditMyNickName(false)
        //서버에 전송
        const info = {
            nickname: loadMyNickname
        }
        const response = await axios.put(`${baseURL}/mypage/update-nickname`,info,
        {
            headers: {
              Authorization: myToken,
              'refresh-token': refreshToken,
            },
          })
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
            // console.log(loadMyNickname)
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
                        <ProfileImage src={myContext.imgAddress ? myContext.imgAddress : basicImg} onContextMenu={RightMouseClick} />
                        <TextProfileContents>
                            <TextContentContainer>
                                <TextContent>아이디</TextContent>
                                
                                <Texts>{user && user.data.data.username}</Texts>
                            </TextContentContainer>
                            <TextContentContainer>
                                <TextContent>닉네임</TextContent>
                                <Texts >{editMyNickname ? 
                                    <EditInput placeholder={loadMyNickname} onChange={editNickChange} onFocus={NickinputVacant} />
                                    : loadMyNickname}
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
                                <Texts>{postCount}개</Texts>
                            </TextContentContainer>
                        </TextProfileContents>
                    </ProfileInner>

                        {user && user.data.data.username === userinfo.data.data.username ? button : null}

                </ProfileContainer>
                <ProfileBorder />
                {/* 카테고리별 */}
                <CategoryOpen value={user && user.data.data.username === userinfo.data.data.username} />
               


                {/* 카드 */}
                <>
                    <CardContainer>
                        {randomData && randomData.map((data, i) => {
                            return (
                                <GifCard key={i} data={data} myImg={myContext.imgAddress} myNickname={userinfo.data.data.nickname} />
                            )
                        })}
                    </CardContainer>
                    <div style={{ width: '100px', height: '20px', backgroundColor: 'gray' }} ref={page === 0 ? null : lastIntersectingData}>.</div>
                </>
            </ContainerInner>


        {/* 프로필이미지 모달창 */}
            {user && user.data.data.username === userinfo.data.data.username ? <ProfileImageModal shown={myContext.isOpenProfileImg}
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