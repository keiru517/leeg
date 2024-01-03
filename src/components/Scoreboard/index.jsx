import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as actions from "../../actions";
import leftArrowIcon from "../../assets/img/dark_mode/left-arrow.svg";
import rightArrowIcon from "../../assets/img/dark_mode/right-arrow.svg";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";
import menuIconDark from "../../assets/img/dark_mode/menu-icon-dark.svg";
import menuIconLight from "../../assets/img/dark_mode/menu-icon-light.svg";

const Index = (props) => {
  let { leagueId, matchId } = useParams();
  let { setTime } = props;

  const dispatch = useDispatch();

  const match = useSelector((state) => state.matchup.match);

  useEffect(() => {
    actions.getMatch(dispatch, matchId);
    dispatch({ type: actions.SET_TIMER, payload: match.timer });
    dispatch({ type: actions.SET_CURRENT_PERIOD, payload: 1 });
  }, [matchId]);

  const darkMode = useSelector((state) => state.home.dark_mode);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const homeTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.homeTeamId
  );
  const awayTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.awayTeamId
  );

  const allLogs = useSelector((state) => state.home.logs)
    .filter((log) => log.leagueId == leagueId && log.matchId == matchId)
    .sort((a, b) => {
      const timeA = a.time;
      const timeB = b.time;

      // Convert time strings into numbers for comparison
      const [minutesA, secondsA] = timeA.split(":").map(Number);
      const [minutesB, secondsB] = timeB.split(":").map(Number);

      if (a.period !== b.period) {
        return a.period - b.period; // Sort in ascending order by period
      }

      // Compare minutes and seconds
      if (minutesA !== minutesB) {
        return minutesB - minutesA;
      } else {
        return secondsB - secondsA;
      }
    });

  let homeTeamPoints = match.homeTeamPoints;
  let awayTeamPoints = match.awayTeamPoints;
  let homeTeamFouls = 0;
  let awayTeamFouls = 0;
  let homeTeamTimeOuts = 0;
  let awayTeamTimeOuts = 0;

  allLogs.map((log, id) => {
    if (log.teamId == homeTeam?.id) {
      switch (log.event) {
        case "+3 Pointer":
          homeTeamPoints += 3;
          break;
        case "+2 Pointer":
          homeTeamPoints += 2;
          break;
        case "+1 Pointer":
          homeTeamPoints += 1;
          break;
        case "Foul":
          homeTeamFouls += 1;
          break;
        case "TimeOut":
          homeTeamTimeOuts += 1;
          break;
      }
    } else if (log.teamId == awayTeam?.id) {
      switch (log.event) {
        case "+3 Pointer":
          awayTeamPoints += 3;
          break;
        case "+2 Pointer":
          awayTeamPoints += 2;
          break;
        case "+1 Pointer":
          awayTeamPoints += 1;
          break;
        case "Foul":
          awayTeamFouls += 1;
          break;
        case "TimeOut":
          awayTeamTimeOuts += 1;
          break;
      }
    }
  });

  const matchupResult = [homeTeamPoints, awayTeamPoints];

  const [arrow, setArrow] = useState("home");

  const currentPeriod = useSelector((state) => state.matchup.currentPeriod);
  const handlePeriod = (period) => {
    dispatch({ type: actions.SET_CURRENT_PERIOD, payload: period });
    setIsRunning(false);
  };
  const [numberOfPeriods, setNumberOfPeriods] = useState([]);
  const [timeOfPeriod, setTimeOfPeriod] = useState([]);

  useEffect(() => {
    setNumberOfPeriods(
      Array.from({ length: match?.period }, (_, index) => index + 1)
    );
    setTimer(match?.timer);
  }, [match]);

  useEffect(() => {
    let tempTimeOfPeriod = [];

    numberOfPeriods.map(() => {
      tempTimeOfPeriod.push(match?.timer);
    });
    setTimeOfPeriod(tempTimeOfPeriod);
    // setCurrentPeriod(1);
  }, [numberOfPeriods.length, match?.timer]);

  // Timer
  const [timer, setTimer] = useState(0);
  // const timer = useSelector(state=>state.matchup.timer);
  useEffect(() => {
    setTimer(timeOfPeriod[currentPeriod - 1]);
  }, [currentPeriod]);

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
      // intervalId = setInterval(() => dispatch({type:actions.SET_TIMER, payload:timer-100}), 1000);
      let tempTimeOfPeriod = [...timeOfPeriod];
      tempTimeOfPeriod[currentPeriod - 1] = timer;
      setTimeOfPeriod(tempTimeOfPeriod);
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
    if (match?.isNew) {
      setIsRunning(!isRunning);
    } else {
      alert("The matchup is locked!");
    }
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
    <div className="flex flex-col lg:flex-row justify-between lg:bg-white lg:dark:bg-slate rounded-main p-default">
      <div className="order-2 lg:order-1 flex flex-col items-center bg-white dark:bg-slate lg:bg-transparent my-3 lg:my-0 rounded-lg p-default">
        <img
          src={homeTeam?.logo}
          alt=""
          className="w-28 h-28 rounded-full mx-auto border border-gray-500"
        />
        <p className="text-black dark:text-white font-semibold text-2xl mt-5 truncate w-52 text-center">
          {homeTeam?.name}
        </p>
        <p className="text-font-dark-gray font-semibold text-xl">Home</p>
        <div className="flex space-x-3 my-3">
          {league?.displayFouls && (
            <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
              <p className="text-black dark:text-white font-medium text-sm">
                Fouls: {homeTeamFouls}
              </p>
            </div>
          )}
          <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
            <p className="text-black dark:text-white font-medium text-sm">
              TimeOuts: {homeTeamTimeOuts}
            </p>
          </div>
          <div
            className={`lg:hidden flex items-center justify-center rounded-[10px] ${
              arrow === "home" ? "bg-success" : "bg-font-dark-gray"
            } w-16 h-10 cursor-pointer hover:bg-opacity-70`}
            onClick={() => setArrow("home")}
          >
            <img src={leftArrowIcon} alt="" className="w-[14px] h-10" />
          </div>
        </div>
        <div
          className={`hidden lg:flex items-center justify-center rounded-[10px] ${
            arrow === "home" ? "bg-success" : "bg-font-dark-gray"
          } w-16 h-10 cursor-pointer hover:bg-opacity-70`}
          onClick={() => setArrow("home")}
        >
          <img src={leftArrowIcon} alt="" className="w-[14px] h-[21px]" />
        </div>
      </div>

      <div className="flex flex-col order-1 lg:order-2 text-center lg:mt-5">
        <div className="order-2 lg:order-1 bg-white dark:bg-slate lg:bg-transparent rounded-lg p-2">
          <div className="text-black dark:text-white text-[56px] lg:my-2">
            {matchupResult[0]} - {matchupResult[1]}
          </div>
          <div className="text-black dark:text-white text-sm">
            {match?.date}, {match?.time}
          </div>
          <p className="text-font-dark-gray text-sm mt-1">{match?.location}</p>
        </div>

        <div className="flex flex-col order-1 lg:order-2 space-y-3 lg:space-y-9 mb-3">
          <img
            src={darkMode ? menuIconDark : menuIconLight}
            alt=""
            className="lg:hidden w-6 h-6 self-end hover:cursor-pointer"
          />
          <div className="flex space-x-3 justify-center">
            {numberOfPeriods?.map((period) => (
              <div
                className={`flex items-center justify-center rounded-[10px] ${
                  currentPeriod === period
                    ? "bg-success"
                    : "bg-font-dark-gray dark:bg-[#151515]"
                } w-16 h-10 cursor-pointer hover:opacity-75`}
                onClick={() => handlePeriod(period)}
              >
                <p className="text-white">P{period}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center space-x-2">
            <div className="stopwatch-container">
              <div className="flex flex-row lg:flex-col justify-center items-center">
                <div className="flex">
                  <div className="mt-4 lg:mt-6">
                    <img
                      onClick={isRunning ? () => {} : increaseMinute}
                      src={darkMode ? triupIconDark : triupIconLight}
                      alt=""
                      className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer hover:bg-opacity-70"
                    />
                    <img
                      onClick={isRunning ? () => {} : decreaseMinute}
                      src={darkMode ? tridownIconDark : tridownIconLight}
                      alt=""
                      className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer hover:bg-opacity-70"
                    />
                  </div>
                  <input
                    type="number"
                    className="w-[50px] lg:w-[70px] font-semibold text-[40px] lg:text-[56px] text-black dark:text-white bg-transparent outline-none"
                    value={minutes.toString().padStart(2, "0")}
                    onChange={(e) =>
                      setTimer(seconds * 100 + e.target.value * 6000)
                    }
                    disabled={isRunning}
                  />
                  <p className="font-semibold text-[40px] lg:text-[56px] text-black dark:text-white mr-2">
                    :
                  </p>
                  <input
                    type="number"
                    className="w-[50px] lg:w-[70px] font-semibold text-[40px] lg:text-[56px] text-black dark:text-white bg-transparent outline-none"
                    value={seconds.toString().padStart(2, "0")}
                    onChange={(e) =>
                      setTimer(minutes * 6000 + e.target.value * 100)
                    }
                    disabled={isRunning}
                  />
                  <div className="mt-4 lg:mt-6">
                    <img
                      src={darkMode ? triupIconDark : triupIconLight}
                      onClick={isRunning ? () => {} : increaseSecond}
                      alt=""
                      className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer hover:bg-opacity-70"
                    />
                    <img
                      src={darkMode ? tridownIconDark : tridownIconLight}
                      onClick={isRunning ? () => {} : decreaseSecond}
                      alt=""
                      className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer hover:bg-opacity-70"
                    />
                  </div>
                </div>

                <button
                  onClick={startAndStop}
                  className={`w-[100px] lg:w-[169px] h-[53px] rounded-default ${
                    isRunning ? "bg-red-500" : "bg-success"
                  }  text-white font-bold text-sm hover:bg-opacity-70 ml-3 lg:ml-0`}
                >
                  {isRunning ? "STOP " : "START "}
                  CLOCK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-3 flex flex-col items-center bg-white dark:bg-slate lg:bg-transparent rounded-lg p-default">
        <img
          src={awayTeam?.logo}
          alt=""
          className="w-28 h-28 rounded-full mx-auto border border-gray-500"
        />
        <p className="text-black dark:text-white font-semibold text-2xl mt-5 text-center truncate w-52">
          {awayTeam?.name}
        </p>
        <p className="text-font-dark-gray font-semibold text-xl">Away</p>
        <div className="flex space-x-3 my-3">
          {league?.displayFouls && (
            <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
              <p className="text-black dark:text-white font-medium text-sm">
                Fouls: {awayTeamFouls}
              </p>
            </div>
          )}
          <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
            <p className="text-black dark:text-white font-medium text-sm">
              TimeOuts: {awayTeamTimeOuts}
            </p>
          </div>
          <div
          className={`lg:hidden flex items-center justify-center rounded-[10px] ${
            arrow === "away" ? "bg-success" : "bg-font-dark-gray"
          } w-16 h-10 cursor-pointer hover:bg-opacity-70`}
          onClick={() => setArrow("away")}
        >
          <img src={rightArrowIcon} alt="" className="w-[14px] h-10" />
        </div>
        </div>
        <div
          className={`hidden lg:flex items-center justify-center rounded-[10px] ${
            arrow === "away" ? "bg-success" : "bg-font-dark-gray"
          } w-16 h-10 cursor-pointer hover:bg-opacity-70`}
          onClick={() => setArrow("away")}
        >
          <img src={rightArrowIcon} alt="" className="w-[14px] h-[21px]" />
        </div>
      </div>
    </div>
  );
};

export default Index;
