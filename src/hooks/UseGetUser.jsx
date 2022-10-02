import React, { useEffect, useState } from "react";

import { getCookieToken, getRefreshToken } from "../shared/Cookie";
import instance from "../shared/apis";

const myToken = getCookieToken();


const UseGetUser = () => {
  const [user, setUser] = useState('')
  
  const readUser = async () => {
    const response = await instance.get(`/main/user-info`,
    )
    setUser(response)
  }

  useEffect(() => {
    if (myToken) { readUser() }

  }, [myToken])

  return user
}

export default UseGetUser