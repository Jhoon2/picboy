import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_KEY;

export const __getCompleteNew = createAsyncThunk(
  'completeNew',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/post/gif/images/0`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getCompleteLike = createAsyncThunk(
  'completeLike',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/post/gif/images/1`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      throw error;
    }
  }
);

export const __getProgressListFree = createAsyncThunk(
  'progressListFree',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${baseURL}/post/gif/images/2`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      throw error;
    }
  }
);

export const getCompleteNewSlice = createSlice({
  name: 'completeNew',
  initialState: {
    progressListAll: [],
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
      state.progressListAll = action.payload;
    },
    [__getCompleteNew.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const progressListTopicSlice = createSlice({
  name: 'completeLike',
  initialState: {
    progressListTopic: [],
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

export const progressListFreeSlice = createSlice({
  name: 'progressListFree',
  initialState: {
    progressListFree: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getProgressListFree.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getProgressListFree.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isFinish = true;
      state.progressListFree = action.payload;
    },
    [__getProgressListFree.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
