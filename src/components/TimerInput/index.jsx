import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";

const TimePicker = (props) => {
  const { setTime, initialTime } = props;
  let { leagueId, matchId } = useParams();
  // state to store time
  const darkMode = useSelector((state) => state.home.dark_mode);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );
  // state to check stopwatch running or not
  const [time, setTimer] = useState(initialTime);

  // useEffect(()=>{
  //   setTimer(Math.floor(match?.timer/100) * 6000 + Math.floor(match?.timer%100) * 100)
  // }, [match])
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {

      setTime(time);

  }, [time]);

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
    // setTime(time + 6000);
  };
  const decreaseMinute = () => {
    setTimer(time - 6000);
    // setTime(time - 6000);
  };

  const increaseSecond = () => {
    setTimer(time + 100);
    // setTime(time + 100);
  };
  const decreaseSecond = () => {
    setTimer(time - 100);
    // setTime(time - 100);
  };

  return (
    <div className="stopwatch-container w-[110px]">
      <div className="flex justify-center items-center">
        <div className="mt-1">
          <img
            onClick={isRunning ? () => {} : increaseMinute}
            src={darkMode ? triupIconDark : triupIconLight}
            alt=""
            className="w-4 h-4 cursor-pointer hover:bg-opacity-70"
          />
          <img
            onClick={isRunning ? () => {} : decreaseMinute}
            src={darkMode ? tridownIconDark : tridownIconLight}
            alt=""
            className="w-4 h-4 cursor-pointer hover:bg-opacity-70"
          />
        </div>
        <input
          type="text"
          className="w-9 font-semibold text-3xl text-black dark:text-white bg-transparent outline-none"
          value={minutes.toString().padStart(2, "0")}
          onChange={(e) => {
            setTimer(seconds * 100 + e.target.value * 6000);
            setTime(seconds * 100 + e.target.value * 6000);
          }}
        />
        <p className="font-semibold text-3xl text-black dark:text-white mr-2">
          :
        </p>
        <input
          type="text"
          className="w-9 font-semibold text-3xl text-black dark:text-white bg-transparent outline-none"
          value={seconds.toString().padStart(2, "0")}
          onChange={(e) => {
            setTimer(minutes * 6000 + e.target.value * 100);
            setTime(minutes * 6000 + e.target.value * 100);
          }}
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
            className="w-4 h-4 cursor-pointer hover:bg-opacity-70"
          />
          <img
            src={darkMode ? tridownIconDark : tridownIconLight}
            onClick={isRunning ? () => {} : decreaseSecond}
            alt=""
            className="w-4 h-4 cursor-pointer hover:bg-opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
