import React, { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();
  // const [timeStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.open();
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    // setTimerStarted(true);
    console.log(timeRemaining)
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        onReset = {handleReset}
        remainingTime = {timeRemaining}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running.." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
