import React, {useEffect,useState} from "react";
import axios from 'axios';

import { getCookieToken, getRefreshToken } from "../shared/Cookie";

const myToken = getCookieToken();


const UseGetUser = () => {
  const baseURL = process.env.REACT_APP_API_KEY;
  const [user, setUser] = useState(null)

  const readUser = async () => {
    const response = await axios.get(`${baseURL}/main/user-info`, 
      { headers: {
        Authorization: myToken,
        'refresh-token': getRefreshToken()
        }})
    setUser(response)
  }
  
  useEffect(() => {
    readUser()
  }, [])

  return user
}

export default UseGetUser