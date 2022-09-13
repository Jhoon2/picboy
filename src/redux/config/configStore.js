import { configureStore } from '@reduxjs/toolkit';
import {
  progressListAllSlice,
  progressListTopicSlice,
  progressListFreeSlice,
} from '../modules/progressList';

const store = configureStore({
  reducer: {
    progressListAll: progressListAllSlice.reducer,
    progressListTopic: progressListTopicSlice.reducer,
    progressListFree: progressListFreeSlice.reducer,
  },
});

export default store;
