import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//   {
//     headers: {
//       Authorization: cookie,
//     },
//   }

export const __getProgressListAll = createAsyncThunk(
  'getProgressListAll',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`https://picboy.net/post/gif/images/0`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getProgressListTopic = createAsyncThunk(
  'progressListTopic',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `https://picboy.net/post/gif/images/1`
        //   {
        //     headers: {
        //       Authorization: cookie,
        //     },
        //   }
      );
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
      const data = await axios.get(
        `https://picboy.net/post/gif/images/2`
        //   {
        //     headers: {
        //       Authorization: cookie,
        //     },
        //   }
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      throw error;
    }
  }
);

export const progressListAllSlice = createSlice({
  name: 'progressListAll',
  initialState: {
    progressListAll: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getProgressListAll.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getProgressListAll.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.progressListAll = action.payload;
    },
    [__getProgressListAll.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const progressListTopicSlice = createSlice({
  name: 'progressListTopic',
  initialState: {
    progressListTopic: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getProgressListTopic.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getProgressListTopic.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.progressListTopic = action.payload;
    },
    [__getProgressListTopic.rejected]: (state, action) => {
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
