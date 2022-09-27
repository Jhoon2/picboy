import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../shared/apis'

const baseURL = process.env.REACT_APP_API_KEY;

export const __getBest = createAsyncThunk(
  'getBest',
  async (payload, thunkAPI) => {
    try {
      const data = await api.get(`/main/best-top10`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const bestSlice = createSlice({
  name: 'bests',
  initialState: {
    bests: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getBest.pending]: (state) => {
      state.isLoading = true;
    },
    [__getBest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bests = action.payload;
    },
    [__getBest.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
