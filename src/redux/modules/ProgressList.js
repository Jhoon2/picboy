import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/apis';

export const __getProgressList = createAsyncThunk(
  'getProgressList',
  async (payload, thunkAPI) => {
    const tab = payload?.tab ?? 0;
    const page = payload?.page ?? 0;

    try {
      const data = await api.get(`/post/gif/images/${tab}?size=6&page=${page}`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    progress: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getProgressList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getProgressList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.progress = action.payload;
    },
    [__getProgressList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
