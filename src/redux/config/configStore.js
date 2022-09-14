import { configureStore } from '@reduxjs/toolkit';
import {
  getCompleteNewSlice,
  progressListTopicSlice,
  progressListFreeSlice,
} from '../modules/complete';

const store = configureStore({
  reducer: {
    completeNew: getCompleteNewSlice.reducer,
    progressListTopic: progressListTopicSlice.reducer,
    progressListFree: progressListFreeSlice.reducer,
  },
});

export default store;
