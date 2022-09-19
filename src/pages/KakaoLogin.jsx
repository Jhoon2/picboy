import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {REDIRECT_URI} from '../shared/Kakao_oauth';
import { setAccessToken,setRefreshToken } from '../shared/Cookie';
import axios from 'axios';

axios.defaults.withCredentials = true;


const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');
  const KAKAO_CODE = location.search.split('=')[1]

  console.log(KAKAO_CODE)
  // useEffect(() => {
  
  //   axios
  //       .get(`http://localhost:3000/user/kakao/callback?code=${code}`)
  //       .then((res) => {
  //         console.log(res,'나와라 axios정보')
  //         setAccessToken(res.headers.authorization);
  //         // navigate('/');
  //         window.location.reload();
  //       });
   
  // }, [code]);
  useEffect(() => {
    // console.log(`${REDIRECT_URI}/redirect?code=${KAKAO_CODE}`)
    //아래는 백엔드 주소임
    fetch(`${REDIRECT_URI}/redirect?code=${KAKAO_CODE}`, 
      {
      method: 'GET',
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAccessToken(data.token)
        setRefreshToken(data.token)
        navigate('/')
      })
  },[])
  return (
    <div>KakaoLogin</div>
  )
}

export default KakaoLogin