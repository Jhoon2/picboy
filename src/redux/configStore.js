import { configureStore } from '@reduxjs/toolkit';
import { commentSlice } from './modules/comments';
import { bestSlice } from './modules/Best';
import { userPageSlice } from './modules/UserPage';
import { userdataSlice } from './modules/UserPage';
import { logonUserSlice } from './modules/UserPage';
import { reportSlice } from './modules/Report';
import { getNotiSlice } from './modules/Noti';
import { notiSlice } from './modules/Noti';
import canvas from './modules/CanvasSlice';

const store = configureStore({
  reducer: {
    logonUser: logonUserSlice.reducer,
    comments: commentSlice.reducer,
    bests: bestSlice.reducer,
    reports: reportSlice.reducer,
    userpage: userPageSlice.reducer,
    userdata: userdataSlice.reducer,

    getNotis: getNotiSlice.reducer,
    notis: notiSlice.reducer,
    canvas,
  },
});

export default store;
