import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//불러오기
import {REDIRECT_URI} from '../shared/Kakao_oauth';
import { setAccessToken,setRefreshToken } from '../shared/Cookie';
import axios from 'axios';
import Loading from '../global/Loading';

axios.defaults.withCredentials = true;


const KakaoLogin = () => {
  const location = useLocation();
  const baseURL = process.env.REACT_APP_API_KEY;

  const KAKAO_CODE = location.search.split('=')[1]


  useEffect(() => {
    const sendAxios = async () => {
      const response = await axios.get(`${baseURL}/user/kakao?code=${KAKAO_CODE}`)
      // 헤더로 받는 것으로 수정됨
      setAccessToken(response.headers.authorization);
      setRefreshToken(response.headers['refresh-token'])
      window.location.href='/'
    }
    sendAxios()
  },[])


  return (
    <>
    <Loading />
    </>
  )
}

export default KakaoLogin