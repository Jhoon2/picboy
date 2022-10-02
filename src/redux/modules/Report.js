import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookieToken, getRefreshToken } from '../../shared/Cookie';
import instance from '../../shared/apis';


export const __postReport = createAsyncThunk(
  'postReport',
  async (postId, thunkAPI) => {
    try {
      const data = await instance.post(`/post/report/${postId}`, ''
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__postReport.pending]: (state) => {
      state.isLoading = true;
    },
    [__postReport.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.reports = action.payload;
    },
    [__postReport.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
