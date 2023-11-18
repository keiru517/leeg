import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";

const Timer = (props) => {
  const { setTime } = props;
  let { leagueId, matchId } = useParams();
  // state to store time
  const darkMode = useSelector((state) => state.home.dark_mode);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const match = useSelector(state=>state.home.matches).find(match=>match.id == matchId);
  // state to check stopwatch running or not
  const [timer, setTimer] = useState(
    0
  );

  useEffect(()=>{
    setTimer(match?.timer)
    // setTimer(Math.floor(match?.timer/100) * 6000 + Math.floor(match?.timer%100) * 100)
  }, [match])
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting timer from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTimer(timer - 100), 1000);
      setTime(
        minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0")
      );
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  // Hours calculation
  const hours = Math.floor(timer / 360000);

  // Minutes calculation
  const minutes = Math.floor((timer % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((timer % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = timer % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTimer(match?.timer);
  };

  const increaseMinute = () => {
    setTimer(timer + 6000);
  };
  const decreaseMinute = () => {
    setTimer(timer - 6000);
  };

  const increaseSecond = () => {
    setTimer(timer + 100);
  };
  const decreaseSecond = () => {
    setTimer(timer - 100);
  };

  return (
    <div className="stopwatch-container">
      <div className="justify-center items-center">
        <div className="flex">
          <div className="mt-5">
            <img
              onClick={isRunning ? () => {} : increaseMinute}
              src={darkMode ? triupIconDark : triupIconLight}
              alt=""
              className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
            />
            <img
              onClick={isRunning ? () => {} : decreaseMinute}
              src={darkMode ? tridownIconDark : tridownIconLight}
              alt=""
              className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
            />
          </div>
          <input
            type="number"
            className="w-16 font-semibold text-[56px] text-black dark:text-white bg-transparent outline-none"
            value={minutes.toString().padStart(2, "0")}
            onChange={(e) => setTimer(seconds * 100 + e.target.value * 6000)}
            disabled={isRunning}
          />
          <p className="font-semibold text-[56px] text-black dark:text-white mr-2">
            :
          </p>
          <input
            type="number"
            className="w-16 font-semibold text-[56px] text-black dark:text-white bg-transparent outline-none"
            value={seconds.toString().padStart(2, "0")}
            onChange={(e) => setTimer(minutes * 6000 + e.target.value * 100)}
            disabled={isRunning}
            // onChange={handleSecond}
          />
          {/* <p className="font-semibold text-[56px] text-black dark:text-white">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
          </p> */}
          <div className="mt-5">
            <img
              src={darkMode ? triupIconDark : triupIconLight}
              onClick={isRunning ? () => {} : increaseSecond}
              alt=""
              className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
            />
            <img
              src={darkMode ? tridownIconDark : tridownIconLight}
              onClick={isRunning ? () => {} : decreaseSecond}
              alt=""
              className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
            />
          </div>
        </div>
        <button
          onClick={startAndStop}
          className={`w-[169px] h-[53px] rounded-[10px] ${
            isRunning ? "bg-red-500" : "bg-success"
          }  text-white font-bold text-sm mt-1 hover:bg-opacity-70`}
        >
          {isRunning ? "STOP " : "START "}
          CLOCK
        </button>
      </div>
      {/* <div className="flex">
        <button className="bg-green-500" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="bg-red-500" onClick={reset}>
          Reset
        </button>
      </div> */}
    </div>
  );
};

export default Timer;
