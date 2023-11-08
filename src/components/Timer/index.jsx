import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";

const Stopwatch = (props) => {
  const { setTime } = props;
  let { leagueId } = useParams();
  // state to store time
  const darkMode = useSelector((state) => state.home.dark_mode);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  // state to check stopwatch running or not
  const [time, setTimer] = useState(
    0
  );

  useEffect(()=>{
    setTimer(league?.minute * 6000 + league?.second * 100)
  }, [league])
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTimer(time - 100), 1000);
      setTime(
        minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0")
      );
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTimer(7200);
  };

  const increaseMinute = () => {
    setTimer(time + 6000);
  };
  const decreaseMinute = () => {
    setTimer(time - 6000);
  };

  const increaseSecond = () => {
    setTimer(time + 100);
  };
  const decreaseSecond = () => {
    setTimer(time - 100);
  };

  return (
    <div className="stopwatch-container">
      <div className="flex justify-center items-center">
        <div className="mt-1">
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
          type="text"
          className="w-16 font-semibold text-[56px] text-black dark:text-white bg-transparent"
          value={minutes.toString().padStart(2, "0")}
          onChange={(e) => setTimer(seconds * 100 + e.target.value * 6000)}
        />
        <p className="font-semibold text-[56px] text-black dark:text-white mr-2">
          :
        </p>
        <input
          type="text"
          className="w-16 font-semibold text-[56px] text-black dark:text-white bg-transparent"
          value={seconds.toString().padStart(2, "0")}
          onChange={(e) => setTimer(minutes * 6000 + e.target.value * 100)}
          // onChange={handleSecond}
        />
        {/* <p className="font-semibold text-[56px] text-black dark:text-white">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
        </p> */}
        <div className="mt-1">
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

export default Stopwatch;
