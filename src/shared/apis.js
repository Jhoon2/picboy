import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken, getRefreshToken } from './Cookie'

const baseURL = process.env.REACT_APP_API_KEY;

const myToken = getCookieToken();

export const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER
});

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: myToken,
    'refresh-token': getRefreshToken()
  }
})

export default instance;

export const downlodadApi = 

//토큰 만료시 인터셉터
instance.interceptors.response.use( (response) => {
  return response;
},
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) return window.location.href = '/login';
    // 권한없음 === Access 토큰 만료됐을 경우
  }
);

export const anyApis = { 
  //좋아요기능
  liked: (data, info) => instance.post(`/post/like/${data}`, info),
  downloadApi: (postId, gifUrl) => api/`download?postId=${postId}&fileName=${gifUrl}`
}
