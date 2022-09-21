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