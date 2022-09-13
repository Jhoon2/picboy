import React from "react";
import { Cookies } from "react-cookie"

const cookies = new Cookies();

export const setAccessToken = (accessToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);
  return cookies.set('user_token', accessToken, {
    samSite: 'strict',
    path: '/',
    expires: new Date(expireDate)
  })
}

export const setRefreshToken = (refreshtoken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);
  // console.log(refreshtoken)

  return cookies.set("fresh_token", refreshtoken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  })
}