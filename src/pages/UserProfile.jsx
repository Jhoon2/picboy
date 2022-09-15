import React from 'react'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useMyContext } from '../shared/ContextApi'
import axios from "axios"

import styled from 'styled-components'
import GifCard from '../components/userprofile/GifCard'
import CategoryModal from '../components/userprofile/CategoryModal'
import ProfileImageModal from '../components/userprofile/ProfileImageModal'
import { getCookieToken, getRefreshToken } from '../shared/Cookie'
import basicImg from '../images/basicImg.jpg'

const myToken = getCookieToken();
const refreshToken = getRefreshToken();

const UserProfile = () => {
    const baseURL = process.env.REACT_APP_API_KEY;
    const myContext = useMyContext();
    const [user, setUser] = useState(null)

    const [randomData, setRandomData] = useState([]);
    const [page, setPage] = useState(0);
    const lastIntersectingData = useRef(null);

    const [isOpenCategory, setIsOpenCategory] = useState(false)
    const [isOpenProfileImg, setIsOpenProfileImg] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [imgFile, setImgFile] = useState("")
    const [editMyNickname, setEditMyNickName] = useState(false)
    const [editNickValue, setEditNickValue] = useState('')
    const [categoryContent, setCategoryContent] = useState('all')
    const [filter, setFilter] = useState(false);

    let nickname;
    const readUser = async () => {
        const response = await axios.get(`${baseURL}/main/user-info`,
            {
                headers: {
                    Authorization: myToken,
                    'refresh-token': refreshToken
                }
            })
        console.log(response)
        setUser(response)
        nickname = response.data.data.nickname
        setImageUrl(response.data.data.profileImg)
        myContext.setNickname(nickname)

        const readMypage = async () => {
            const response = await axios.get(`${baseURL}/mypage/post/${0}/${1}?nickname=${nickname}&page=${page}&size=6`,
                {
                    headers: {
                        Authorization: myToken,
                        'refresh-token': refreshToken
                    }
                })

            setRandomData(randomData.concat(response.data.data));
        }
        readMypage()
    }

    //observe 콜백 함수
    const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                //조건이 트루
                //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
                setPage((page) => page + 1);
                // 현재 타겟을 observe한다.
                observer.observe(entry.target); // unobserve가 아님
            }
        });
    };
    console.log(page)

    useEffect(() => {
        readUser();
    }, [page]);

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
        setIsOpenProfileImg(!isOpenProfileImg)
    }

    const editNickname = () => {
        setEditMyNickName(true)
    }

    const editNickChange = (e) => {
        if ((e.target.value).length >= 2 && (e.target.value).length <= 8) {
            myContext.setNickname(e.target.value)
            setEditNickValue('')
        }
        else { setEditNickValue('2글자 이상 8글자 이하로 입력해주세요') }
    }
    const completeBtn = async () => {
        if (editMyNickname === '') setEditMyNickName(false)
        //서버에 전송
        // const info = {
        //     nickname: editMyNickname
        // }
        // const response = await axios.put(`${baseURL}/mypage/update-info`, info)
        // console.log(response)
        setEditMyNickName(false)
    }

    // 닉네임 수정버튼
    let button;
    if (editMyNickname) {
        button = <EditDone onClick={completeBtn}>완료</EditDone>
    } else {
        button = <EditButton onClick={editNickname}>수정</EditButton>
    }


    return (
        <UserProfileContainer>
            <ContainerInner >
                {/* 프로필 */}
                <ProfileContainer>
                    <ProfileInner>
                        <ProfileImage src={imageUrl ? imageUrl : basicImg} onContextMenu={RightMouseClick} />
                        <TextProfileContents>
                            <TextContentContainer>
                                <TextContent>아이디</TextContent>
                                <Texts>{user && user.data.data.username}</Texts>
                            </TextContentContainer>
                            <TextContentContainer>
                                <TextContent>닉네임</TextContent>
                                <Texts >{editMyNickname ?
                                    <EditInput placeholder={myContext.nickname} onChange={editNickChange} />
                                    : myContext.nickname}
                                </Texts>
                                {editMyNickname ?
                                    <ValidationNickname>
                                        <div style={{ color: 'red', marginLeft: '20px' }}>{editNickValue}</div>
                                    </ValidationNickname> : null}
                            </TextContentContainer>

                            <TextContentContainer>
                                <TextContent>게시물</TextContent>
                                <Texts>개</Texts>
                            </TextContentContainer>
                        </TextProfileContents>
                    </ProfileInner>
                    {button}
                </ProfileContainer>
                <ProfileBorder />
                {/* 카테고리별 */}

                <CategoryContainer>
                    <CategoryDisplay>
                        <CategoryContent id='all' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent}>전체</CategoryContent>
                        <CategoryContent id='start' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent}>작성한 글</CategoryContent>
                        <CategoryContent id='participate' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent}>참여한 글</CategoryContent>
                        <CategoryContent id='behind' onClick={(e) => setCategoryContent(e.target.id)} categoryContent={categoryContent}>숨긴 글</CategoryContent>
                    </CategoryDisplay>
                    <CategoryButton id='categoryBtn' onClick={() => { setIsOpenCategory(!isOpenCategory) }} >카테고리 ▼</CategoryButton>
                </CategoryContainer>


                {/* 카드 */}
                <>
                    <CardContainer>
                        {randomData && randomData.map((data, i) => {
                            return (
                                <GifCard key={i} data={data} />
                            )
                        })}
                    </CardContainer>
                    <div style={{ width: '100px', height: '20px', backgroundColor: 'gray' }} ref={lastIntersectingData}>.</div>
                </>
            </ContainerInner>

            {/* 프로필이미지 모달창 */}
            <ProfileImageModal shown={isOpenProfileImg} close={() => { setIsOpenProfileImg(false) }} setImageUrl={setImageUrl} setImgFile={setImgFile} />
            {/* 카테고리모달창 */}
            <CategoryModal shown={isOpenCategory} close={() => { setIsOpenCategory(false) }} />
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
    background-color: pink;
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
`

const CategoryContainer = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
`
const CategoryDisplay = styled.div`
    display: flex;
`

const CategoryContent = styled.div`
    margin-right: 20px;
    font-size: 20px;
    font-weight: 400;
    color:${(props) => (props.id === props.categoryContent) ? '#000000' : '#A3A3A3'};
    border-bottom: 1px solid ${(props) => (props.id === props.categoryContent) ? '#000000' : '#fff'};
    cursor: pointer;
`

const CategoryButton = styled.button`
    margin-right: 15px;
    font-size: 20px;
    font-weight: 400;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

const CardContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
`

export default UserProfile