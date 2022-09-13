import React, { useState } from 'react'
import UseTimer from '../../hooks/UseTimer';
// import { useMyContext } from '../../shared/ContextApi';

const TimerPage = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const timerStart = UseTimer({ minutes, setMinutes, seconds, setSeconds })

  return (
    <>
      <div>
        {timerStart}
      </div>
    </>
  )
}

export default TimerPage