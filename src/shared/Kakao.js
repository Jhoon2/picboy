import React from 'react'
import { useDispatch } from "react-redux";

const Kakao = () => {
  const dispatch = useDispatch();

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  // React.useEffect(async () => {
      // await dispatch(userActions.kakaoLogin(code));
  // }, []);

  return (
  
    <div>
      로그인중
     </div>
  )
}

export default Kakao