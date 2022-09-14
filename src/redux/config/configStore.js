import { configureStore } from '@reduxjs/toolkit';
import { commentSlice } from '../modules/comments';
import { bestSlice } from '../modules/Best';

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
    bests: bestSlice.reducer,
  },
});

export default store;
