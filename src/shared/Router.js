import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages import
import CompleteDetail from '../pages/CompleteDetail';
import PostFree from '../pages/PostFree';
import PostTopic from '../pages/PostTopic';
import List from '../pages/List';
import Login from '../pages/Login';
import Main from '../pages/Main';
import ProgressDetail from '../pages/ProgressDetail';
import ProgressPost from '../pages/ProgressPost';
import SignUp from '../pages/SignUp';
import UserProfile from '../pages/UserProfile';
import CompList from '../pages/CompList';
import { Context } from './ContextApi';
import Header from '../components/Header';
import PostTopicRelay from '../pages/PostTopicRelay';
// import { getCookieToken } from '../shared/Cookie'

const Router = () => {
  // const myToken = getCookieToken();

  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* 종훈님 */}
          <Route path="/" element={<Main />} />
          <Route path="/progressdetail/:id" element={<ProgressDetail />} />
          <Route path="progress-post" element={<ProgressPost />} />
          <Route path="list" element={<List />} />
          {/* 민희님 */}
          <Route path="login" element={<Login />} />
          <Route path="join" element={<SignUp />} />
          <Route path="user-profile/:id" element={<UserProfile />} />
          {/* 다솜님 */}
          <Route path="complist" element={<CompList />} />
          <Route path="post-free" element={<PostFree />} />
          <Route path="post-topic" element={<PostTopic />} />
          <Route path="post-relay/:id" element={<PostTopicRelay />} />
          <Route path="complete-detail/:id" element={<CompleteDetail />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
};

export default Router;
