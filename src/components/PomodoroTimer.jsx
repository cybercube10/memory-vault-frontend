import React, { useState, useEffect } from 'react';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col  justify-center items-center w-full h-full bg-[#BA0021]  p-4">
      <div className="text-4xl font-light  text-gray-800 mb-6">
        {formatTime(timeLeft)}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleStartPause}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-600"
        >
          {isRunning ? <h4>Pause</h4> : <h4>Start</h4> }
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-600"
        >
          <GrPowerReset size={25} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
