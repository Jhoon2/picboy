import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../../shared/Cookie'

const baseURL = process.env.REACT_APP_API_KEY;

const myToken = getCookieToken();
const refreshToken = getRefreshToken();

export const __getUserPage = createAsyncThunk(
  'userPage/getUserPage',
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const data = await axios.get(`${baseURL}/mypage/user-info?username=${payload.username}`
      )
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
export const __getUserData = createAsyncThunk(
  'userData/getUserData',
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const data = await axios.get
      (`${baseURL}/mypage/post/0/1?username=${payload.username}&page=0&size=6`,
  {
      headers: {
          Authorization: myToken,
          'refresh-token': refreshToken
      }

    })
      // console.log(data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __putEditNickname = createAsyncThunk(
  'editNickname /putEditNickname ',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(`${baseURL}/mypage/update-nickname`, payload,
      {
          headers: {
            Authorization: myToken,
            'refresh-token': refreshToken,
          },
        }
      )
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
export const userPageSlice = createSlice({
  name: 'userPage',
  initialState:{
      userPage: [],
      isLoading: false,
      error: null,
  },
  reducers: {},
  extraReducers: {
      [__getUserPage.pending]: (state) => {
          state.isLoading = true;
      },
    [__getUserPage.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.userPage = action.payload;
      },
      [__getUserPage.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
    },
    [__putEditNickname.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.userPage.data.nickname = action.payload.nickname
    }
  }
})

export const userdataSlice = createSlice({
  name: 'userData',
  initialState:{
      userData: [],
      isLoading: false,
      error: null,
  },
  reducers: {},
  extraReducers: {
      [__getUserData.pending]: (state) => {
          state.isLoading = true;
      },
      [__getUserData.fulfilled]: (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
          state.userData = action.payload;
      },
      [__getUserData.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
    },
    [__putEditNickname.fulfilled]: (state, action) => {
      // state.userPage = action.payload.nickname
    }
  }
})