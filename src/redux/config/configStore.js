import { configureStore } from '@reduxjs/toolkit';
import {
  CompleteNewSlice,
  CompleteLikeSlice,
  CompleteCommSlice,
} from '../modules/complete';

const store = configureStore({
  reducer: {
    completeNew: CompleteNewSlice.reducer,
    completeLike: CompleteLikeSlice.reducer,
    completeComm: CompleteCommSlice.reducer,
  },
});

export default store;
