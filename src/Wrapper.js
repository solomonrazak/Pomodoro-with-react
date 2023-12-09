import React, { useState, useEffect } from "react";

function Wrapper() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(1500);

  // function to handle play;
  let timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);
  // the arrow callback function that contains the if statement will be called or executed
  //  after ecery 1 second or 1000 millisecond.

  function handleBreakIncrease() {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  }

  function handleBreakDecrease() {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  }

  function handleSessionIncrease() {
    if (sessionLength < 60) setSessionLength(sessionLength + 1);
    setTimeLeft(timeLeft + 60)
  }

  function handleSessionDecrease() {
    if (sessionLength > 1) setSessionLength(sessionLength - 1);
    setTimeLeft(timeLeft - 60)
  }

  // Reset function to reset everything to default.
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  // reset and audio functions

  const resetTimer = () => {
    const audio = document.getElementById("beep"); // get id element
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout = setTimeout(() => {
        // Code to execute after the specified timeout
        resetTimer();
      }, 1000); // Adjust the timeout value as needed
    } else {
      clearTimeout(timeout);
    }
  };

  // control play and pause

  const handlePlay = () => {
    clearTimeout(timeout); // pause the timeout function
    setPlay(!play); // set play to false.
  };

  // useEffect
  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout,clock]);
  //   The callback function inside useEffect is clock().
  //   This function (clock) will be executed when the dependencies specified in
  //   the dependency array ([play, timeLeft, timeout]) change.

  const timeFormatter = () => {
    // this function calculates the time left in minutes and seconds
    const minutes = Math.floor(timeLeft / 60); // gets the minutes left
    const seconds = timeLeft - minutes * 60; // calcutes the seconds on the minute left
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds; // adds a zero the front if its less than 10
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // adds a 0 to the front of its less than 10
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";
  return (
    <div className="h-full w-full m-auto flex flex-col justify-center text-white">
      <div className="wrapper text-center flex flex-col space-y-9 font-mono">
        <h2 className="text-4xl font-bold">25 + 5 Clock</h2>
        <div className="break-session-length flex flex-col justify-center mx-auto space-x-9 md:flex md:flex-row">
          <div className="flex flex-col">
            <h3 id="break-label" className="text-2xl">
              Break Length
            </h3>
            <div className="flex space-x-3 justify-center">
              <button
                disabled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
                className="rounded-md bg-slate-500 p-2 mt-2"
              >
                Increase
              </button>
              <strong id="break-length" className="text-2xl mt-3">
                {breakLength}
              </strong>
              <button
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
                className="rounded-md bg-slate-500 p-2 mt-2"
              >
                Decrease
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 id="session-label" className="text-2xl">
              Session Length
            </h3>
            <div className="flex space-x-2 items-center ml-2 mr-10 md:mr-0 md:space-x-2 md:ml-0">
              <button
                disabled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
                className="rounded-md bg-slate-500 p-2 mt-2"
              >
                Increase
              </button>
              <strong id="session-length" className="text-2xl mt-3">
                {sessionLength}
              </strong>
              <button
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
                className="rounded-md bg-slate-500 p-2 mt-2 mr-2"
              >
                Decrease
              </button>
            </div>
          </div>
        </div>
        <div className="timer-wrapper">
          <div className="timer w-32 h-20 border-inherit border-2 border-solid rounded-md mx-auto flex flex-col justify-center space-y-1 p-2 mb-5">
            <h2 id="timer-label" className="text-2xl">
              {title}
            </h2>
            <h3 id="time-left" className="text-2xl">
              {timeFormatter()}
            </h3>
          </div>
          <div
            id="press-play"
            className="flex mx-auto justify-center space-x-3"
          >
            <button
              onClick={handlePlay}
              id="start_stop"
              className="bg-red-500 w-24 h-8 rounded-md"
            >
              Start/Stop
            </button>
            <button
              onClick={handleReset}
              id="reset"
              className="bg-blue-500 w-24 h-8 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default Wrapper;
