import React,{ useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { __selectIconImg } from '../../redux/modules/UserPage'

const IconImages = ({ robot, clickRobot, idx, num, setNum,iconNames }) => {
  const dispatch = useDispatch();

  const handleIconClick = (e) => {
    setNum(e.target.id)
    const info = {
      img: robot
    }
    dispatch(__selectIconImg(info))

  }
  return (
    <IconCard>
      <IconImage id={idx} src={Number(num)=== idx ? clickRobot: robot} onClick={handleIconClick}>
    </IconImage>
      <IconName style={Number(num)=== idx?{color:'black'} : {color:'#868686'}}>{iconNames}</IconName>
    </IconCard>
  )
}

const IconCard = styled.div`
  width: 125px;
  height: 150px;
  padding: 1rem;
`;
const IconImage = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 100px;
  background: #d9d9d9;
`;
const IconName = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export default IconImages