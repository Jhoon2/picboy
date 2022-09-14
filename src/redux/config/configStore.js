import { configureStore } from '@reduxjs/toolkit';
import {
  getCompleteNewSlice,
  progressListTopicSlice,
  progressListFreeSlice,
} from '../modules/complete';
import { commentSlice } from '../modules/comments';

const store = configureStore({
  reducer: {
    completeNew: getCompleteNewSlice.reducer,
    progressListTopic: progressListTopicSlice.reducer,
    progressListFree: progressListFreeSlice.reducer,
    comments: commentSlice.reducer,
  },
});

export default store;
