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
  // const KAKAO_CODE = location.search.split('=')[1]

  // console.log(KAKAO_CODE)

  useEffect(() => {
    const kakao = async () => {
      return await axios
        .get(`http://localhost:8080/user/kakao/callback?code=${code}`)
        .then((res) => {
          setAccessToken(res.headers.authorization);
          setRefreshToken(res.headers.authorization)
          navigate('/');
          window.location.reload();
        });
    }
        if (code) {
          kakao();
        }
    // fetch(`${REDIRECT_URI}/code=${KAKAO_CODE}`,
    //   {
    //   method: 'GET',
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setAccessToken(data.token)
    //     setRefreshToken(data.token)
    //     navigate('/')
    //   })
  },[code, navigate])
  return (
    <div>KakaoLogin</div>
  )
}

export default KakaoLogin