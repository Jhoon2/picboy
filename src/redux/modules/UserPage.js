import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../../shared/Cookie'
import  instance  from "../../shared/apis";
import api from '../../shared/apis'

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
    // console.log(payload)
    try {
      const data = await api.get(`/mypage/user-info?username=${payload.username}`
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
    const tab = payload?.tab ?? 0;
    const category = payload?.category ?? 1;
    const username = payload?.username;
    const page = payload?.page ?? 0;
    
    try {
      const data = await api.get
      (`/mypage/post/${tab}/${category}?username=${username}&page=${page}&size=6`)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
)
//숨기기 
export const __hidePost = createAsyncThunk(
  'userHidePost/hidePost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(
        `mypage/post-hidden/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      console.log(error)
    }
  }
);
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
    [__selectIconImg.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.logonUser.profileImg = action.payload.img
    }, 
    [__putEditProfileImg.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.logonUser.profileImg = action.payload.img
    }
  }
  })
  
export const userPageSlice = createSlice({
  name: 'userPage',
  initialState:{
      userPage: [],
    isLoading: false,
      isSuccess: false,
      error: null,
  },
  reducers: {},
  extraReducers: {
      [__getUserPage.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess= false;
      },
    [__getUserPage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess= true;
          state.userPage = action.payload;
      },
      [__getUserPage.rejected]: (state, action) => {
        state.isLoading = false;
        state.isSuccess= false;
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
  initialState: {
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
    
    [__hidePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData.content = state.userData.content.filter(
        (data) => data.postId !== action.payload
      )
    },
  }
})