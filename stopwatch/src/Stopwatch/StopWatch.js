import React, { useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';

const StopwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #8e2de2, #4a00e0);
  color: #fff;
`;

const StopwatchContent = styled.div`
  text-align: center;
`;

const StopwatchButton = styled(Button)`
  margin-top: 16px;
  background-color: #3f51b5;
  color: #fff;
  &:hover {
    background-color: #303f9f;
  }
  &:disabled {
    background-color: #9e9e9e;
    color: #fff;
  }
  
`;

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);
  
    const handleStart = () => {
      if (!isRunning) {
        startTimeRef.current = performance.now() - time;
        intervalRef.current = setInterval(() => {
          setTime(performance.now() - startTimeRef.current);
        }, 10);
        setIsRunning(true);
      }
    };
  
    const handleStop = () => {
      if (isRunning) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    };
  
    const handleReset = () => {
      setTime(0);
      clearInterval(intervalRef.current);
      setIsRunning(false);
    };
  
    const formatTime = (time) => {
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const seconds = Math.floor((time / 1000) % 60);
      const milliseconds = Math.floor((time % 1000) / 10);
  
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

  return (
    <StopwatchContainer>
      <StopwatchContent>
        <Typography variant="h4" component="div" gutterBottom>
          Stopwatch
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {formatTime(time)}
        </Typography>
        <StopwatchButton variant="contained" onClick={handleStart} disabled={isRunning}>
          Start
        </StopwatchButton>
        <StopwatchButton variant="contained" onClick={handleStop} disabled={!isRunning}>
          Stop
        </StopwatchButton>
        <StopwatchButton variant="contained" onClick={handleReset} disabled={time === 0}>
          Reset
        </StopwatchButton>
      </StopwatchContent>
    </StopwatchContainer>
  );
};

export default Stopwatch;
