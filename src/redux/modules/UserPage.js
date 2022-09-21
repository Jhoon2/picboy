import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../../shared/Cookie'
import  instance  from "../../shared/apis";

const baseURL = process.env.REACT_APP_API_KEY;

const myToken = getCookieToken();
const refreshToken = getRefreshToken();

//로그온유저정보
export const __getLogonUser = createAsyncThunk(
  'logon/getLogonUser',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get('/main/user-info')
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
    }
  }
)

//페이지주인 정보 접근
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
    // console.log(payload)
    const tab = payload?.tab ?? 0;
    const category = payload?.category ?? 1;
    const username = payload?.username;
    const page = payload?.page ?? 0;
    // console.log('받은 정보들', tab,category,username,page)
    try {
      const data = await axios.get
      (`${baseURL}/mypage/post/${tab}/${category}?username=${username}&page=${page}&size=6`)
      // console.log('받은 데이터',data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __putEditNickname = createAsyncThunk(
  'editNickname /putEditNickname ',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put('/mypage/update-nickname', payload
      )
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __putEditProfileImg = createAsyncThunk(
  'editProfileImg /putEditProfileImg ',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(`/mypage/update-image`, payload,
      )
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)


//아이콘으로 사진 클릭시
export const __selectIconImg = createAsyncThunk(
  'IconImg/selectIconImg',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(
        'mypage/update-image', payload
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      console.log(error)
    }
  }
);


//로그온 유저 정보
export const logonUserSlice = createSlice({
  name: 'logonUser',
  initialState:{
      logonUser: [],
      isLoading: false,
      error: null,
  },
  reducers: {},
  extraReducers: {
      [__getLogonUser.pending]: (state) => {
          state.isLoading = true;
      },
    [__getLogonUser.fulfilled]: (state, action) => {
      state.isLoading = false;
          state.logonUser = action.payload;
      },
    // [__getLogonUser.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // }
  }
  })
  
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
      state.userPage.data.nickname = action.payload.nickname
    },
    [__putEditProfileImg.fulfilled]: (state, action) => {
      state.userPage.data.profilImg = action.payload.img
    },
    [__selectIconImg.fulfilled]: (state, action) => {
      state.userPage.data.profilImg = action.payload.img
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
        // console.log('액션페이로드',action.payload)
        if (action.payload.pageable.pageNumber === 0) {
          state.userData = action.payload
        } else {
          state.userData.content = [...state.userData.content].concat(action.payload.content)
        }
      },
      [__getUserData.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
    },

  }
})