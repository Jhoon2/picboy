import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const userToken = ('access-token')

// const refreshToken = ('refresh-token')

const baseURL = process.env.REACT_APP_API_KEY;

export const __getCompleteNew = createAsyncThunk(
  'completeNew',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/post/gif/1?size=6&page={}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getCompleteLike = createAsyncThunk(
  'completeLike',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/post/gif/2`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      throw error;
    }
  }
);

export const __getCompleteComm = createAsyncThunk(
  'completeComm',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/post/gif/3`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      throw error;
    }
  }
);

export const CompleteNewSlice = createSlice({
  name: 'completeNew',
  initialState: {
    completeNew: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getCompleteNew.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getCompleteNew.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.completeNew = action.payload;
    },
    [__getCompleteNew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const CompleteLikeSlice = createSlice({
  name: 'completeLike',
  initialState: {
    completeLike: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getCompleteLike.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getCompleteLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.progressListTopic = action.payload;
    },
    [__getCompleteLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const CompleteCommSlice = createSlice({
  name: 'completeComm',
  initialState: {
    completeComm: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getCompleteComm.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getCompleteComm.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isFinish = true;
      state.progressListFree = action.payload;
    },
    [__getCompleteComm.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
