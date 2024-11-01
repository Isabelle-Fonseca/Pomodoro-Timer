import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TomatoLeavesPNG from './assets/leaves.png';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const totalTime = 25 * 60; 
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            alert('Tempo esgotado!');
            return;
          }
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive((prev) => !prev);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setElapsedTime(0);
  };

  const percentage = Math.round((elapsedTime / totalTime) * 100);
  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-base">
      <h1 className="text-4xl text-purple font-bold mb-20">Pomodoro Timer</h1>
      <div className="relative w-64 h-64">
        <CircularProgressbar
          value={percentage}
          text={`${displayMinutes}:${displaySeconds}`}
          styles={buildStyles({
            textColor: '#544b8f',
            pathColor: '#f54e4e',
            tailColor:'rgba(255,255,255,.2)',
          })}
        />
        <img
          src={TomatoLeavesPNG}
          alt="Folhas de Tomate"
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-14 h-auto"
        />
      </div>
      <div className="mt-10">
        <button 
          onClick={toggleTimer} 
          className="px-4 py-2 bg-purple-light text-purple font-medium rounded-md hover:bg-purple hover:text-purple-light border-1 border-purple transition">
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button 
          onClick={resetTimer} 
          className="ml-6 px-4 py-2 bg-purple-light text-purple font-medium rounded-md hover:bg-purple hover:text-red-400 border-1 border-purple transition">
          Resetar
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
