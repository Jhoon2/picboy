import React, { useEffect } from "react";

import axios from "axios";


// export const REDIRECT_URI='https://picboy.co.kr/user/kakao'
//////////////////////////
//배포할때 배포주소로 localhost 바꾸기
export const REDIRECT_URI='http://localhost:3000/user/kakao'


export const KAKAO_AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
