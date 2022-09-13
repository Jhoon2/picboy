import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages import
import CompleteDetail from '../pages/CompleteDetail';
import FirstPost from '../pages/FirstPost';
import List from '../pages/List';
import Login from '../pages/Login';
import Main from '../pages/Main';
import ProgressDetail from '../pages/ProgressDetail';
import ProgressPost from '../pages/ProgressPost';
import SignUp from '../pages/SignUp';
import UserProfile from '../pages/UserProfile';
import CompList from '../pages/CompList';
import { Context } from "./ContextApi";

const Router = () => {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          {/* 종훈님 */}
          <Route path="/" element={<Main />} />
          <Route path="progress-detail:id" element={<ProgressDetail />} />
          <Route path="progress-post" element={<ProgressPost />} />
          {/* 민희님 */}
          <Route path="login" element={<Login />} />
          <Route path="join" element={<SignUp />} />
          <Route path="user-profile" element={<UserProfile />} />
          {/* 다솜님 */}
          <Route path="list" element={<List />} />
          <Route path="complist" element={<CompList />} />
          <Route path="first-post" element={<FirstPost />} />
          <Route path="complete-detail" element={<CompleteDetail />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
};

export default Router;
