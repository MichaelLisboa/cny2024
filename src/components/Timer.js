// ../Timer.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Countdown = styled.h2`
  text-align: center;
  margin: 0 auto 12px auto;
  color: rgba(156, 19, 19, 1);
`;

const Timer = ({ timeLimit = 30, puzzleActive = true, onCompletionStatusChange, successMessage, failMessage }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        let timerInterval = null;

        if (puzzleActive) {
            timerInterval = setInterval(() => {
                setElapsedTime((prevTime) => {
                    if (prevTime < timeLimit) {
                        return prevTime + 1;
                    } else {
                        clearInterval(timerInterval); // Stop the interval if time limit is reached
                        setIsTimeUp(true); // Set isTimeUp to true when time is up
                        onCompletionStatusChange(false);
                        return prevTime;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [timeLimit, puzzleActive, onCompletionStatusChange]);

    return (
        <Countdown>
            {isTimeUp ? failMessage : elapsedTime < timeLimit ? formatTime(timeLimit - elapsedTime) : successMessage}
        </Countdown>
    );
};

function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

export default Timer;