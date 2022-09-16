import { configureStore } from '@reduxjs/toolkit';
import { commentSlice } from '../modules/comments';
import { bestSlice } from '../modules/Best';
import { nicknameSlice } from '../modules/editNickname'

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
    bests: bestSlice.reducer,
    nickname : nicknameSlice.reducer
  },
});

export default store;
