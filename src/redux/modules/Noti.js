import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookieToken, getRefreshToken } from '../../shared/Cookie';
import axios from 'axios';

const myToken = getCookieToken();
const refreshToken = getRefreshToken();
const baseURL = process.env.REACT_APP_API_KEY;

export const __getNoti = createAsyncThunk(
  'getNoti',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/user/alert-get`, {
        headers: {
          Authorization: myToken,
          'refresh-token': refreshToken,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __readNoti = createAsyncThunk(
  'readNoti',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/user/alert`, {
        headers: {
          Authorization: myToken,
          'refresh-token': refreshToken,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __readAllnoti = createAsyncThunk(
  'readAllNoti',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(`${baseURL}/user/alert-update`, '', {
        headers: {
          Authorization: myToken,
          'refresh-token': refreshToken,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNotiSlice = createSlice({
  name: 'getNotis',
  initialState: {
    getNotis: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getNoti.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNoti.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.getNotis = action.payload;
    },
    [__getNoti.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const notiSlice = createSlice({
  name: 'notis',
  initialState: {
    notis: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__readNoti.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notis = action.payload;
    },
    [__readAllnoti.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notisAll = action.payload;
    },
    [__readNoti.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notis = action.payload;
    },
  },
});
