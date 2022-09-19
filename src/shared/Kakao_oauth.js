import React, { useEffect } from "react";

import axios from "axios";


export const REDIRECT_URI='http://localhost:8080/user/kakao'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
