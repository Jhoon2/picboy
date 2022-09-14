import React,{useState} from 'react'
import UseTimer from '../../elem/UseTimer';
// import { useMyContext } from '../../shared/ContextApi';

const TimerPage = ({ minutes, setMinutes, seconds, setSeconds }) => {
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(5);
  console.log('minutes는??',minutes)

  // const timerStart = UseTimer({ minutes, setMinutes, seconds, setSeconds })
  return (
    <>
      <div>
        { UseTimer({ minutes, setMinutes, seconds, setSeconds })}
      </div>
    </>
  )
}

export default TimerPage