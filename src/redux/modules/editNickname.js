import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookieToken, getRefreshToken } from '../../shared/Cookie';
const baseURL = process.env.REACT_APP_API_KEY;


const myToken = getCookieToken();
const refreshToken = getRefreshToken();

export const __editNickname = createAsyncThunk(
  'nickname/editNickname',
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const response = await axios.put(
        `${baseURL}//mypage/update-nickname?nickname=${payload.nickname}`,
        { content: payload.content },
        {
          headers: {
            Authorization: myToken,
            'refresh-token': refreshToken,
          },
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState: {
    nickname: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [__editNickname.fulfilled]: (state, { payload }) =>
    {
      console.log(payload)
      // state.nickname = state.nickname.map((comment) =>
      //   comment.commentId === payload.commentId
      //     ? { ...comment, comment: payload.content }
      //     : comment
      // );
    },
  },
});
