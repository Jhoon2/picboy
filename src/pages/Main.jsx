// 종훈님
// 메인페이지
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate();
    console.log('메인 두번..?')
    return (
        <div>
            <button type='button' onClick={() => {
                navigate('user-profile') 
            }}>마이페이지로 가기</button>
            
        </div>
    )
}

export default Main