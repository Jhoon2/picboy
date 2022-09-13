import React, { useState, useEffect } from 'react'

const UseTimer = ({ seconds, setSeconds, minutes, setMinutes }) => {
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                    
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown)
    }, [minutes, seconds]);

    
    return (
        <>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</>
        )

}

export default UseTimer