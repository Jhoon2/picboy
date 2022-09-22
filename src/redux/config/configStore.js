import { configureStore } from '@reduxjs/toolkit';
import { commentSlice } from '../modules/comments';
import { bestSlice } from '../modules/Best';
import { userPageSlice } from '../modules/UserPage';
import { userdataSlice } from '../modules/UserPage';
import { logonUserSlice } from '../modules/UserPage';
import { reportSlice } from '../modules/Report';

const store = configureStore({
  reducer: {
    logonUser: logonUserSlice.reducer,
    comments: commentSlice.reducer,
    bests: bestSlice.reducer,
    reports: reportSlice.reducer,
    userpage: userPageSlice.reducer,
    userdata: userdataSlice.reducer,
  },
});

export default store;
