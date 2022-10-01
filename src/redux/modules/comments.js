import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/apis'
import instance from '../../shared/apis';

import { getCookieToken, getRefreshToken } from '../../shared/Cookie';
const baseURL = process.env.REACT_APP_API_KEY;

const myToken = getCookieToken();
const refreshToken = getRefreshToken();

export const __getComment = createAsyncThunk(
  'comment/getComment',
  async (payload, thunkAPI) => {
    try {
      const data = await api.get(`/comment/${payload}`);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __postComment = createAsyncThunk(
  'comment/postComment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(
        `/comment/${payload.id}`,
        { content: payload.content }
      );
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/comment/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __editComment = createAsyncThunk(
  'comment/editComment',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(
        `/comment/${payload.commentId}`,
        { content: payload.content }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
    },
    [__deleteComment.fulfilled]: (state, { payload }) => {
      state.comments = state.comments.filter(
        (comment) => comment.commentId !== payload
      );
    },
    [__editComment.fulfilled]: (state, { payload }) => {
      state.comments = state.comments.map((comment) =>
        comment.commentId === payload.commentId
          ? { ...comment, comment: payload.content }
          : comment
      );
    },
  },
});
