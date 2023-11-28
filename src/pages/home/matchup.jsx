import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import axios from "axios";
import apis from "../../utils/apis";
import Log from "../../components/Card/Log";
import Select from "../../components/Select";
import leftArrowIcon from "../../assets/img/dark_mode/left-arrow.svg";
import rightArrowIcon from "../../assets/img/dark_mode/right-arrow.svg";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";
import MatchupSettingModal from "../../components/Modal/MatchupSettingModal";
import SelectPlayerModal from "../../components/Modal/SelectPlayerModal";
import EditEventModal from "../../components/Modal/EditEventModal";
import SubstituteModal from "../../components/Modal/SubstituteModal";
import LineupsModal from "../../components/Modal/LineupsModal";
import PlayerStatsModal from "../../components/Modal/PlayerStatsModal";
import Timer from "../../components/Timer";
import playerStats from "../../assets/img/dark_mode/player-stats.svg";
import editLineup from "../../assets/img/dark_mode/edit-lineup.svg";
import plusIconDark from "../../assets/img/dark_mode/plus-icon-dark.svg";
import plusIconLight from "../../assets/img/dark_mode/plus-icon-light.svg";
import downloadIconDark from "../../assets/img/dark_mode/download-icon-dark.svg";
import downloadIconLight from "../../assets/img/dark_mode/download-icon-light.svg";
import settingIconDark from "../../assets/img/dark_mode/setting-icon-dark.svg";
import settingIconLight from "../../assets/img/dark_mode/setting-icon-light.svg";

const Matchup = () => {
  let { leagueId, matchId } = useParams();
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.home.dark_mode);
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
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

  const options = [
    { id: 0, name: "Incomplete" },
    { id: 1, name: "Completed" },
  ];

  // const state = allLogs.length > 0? "Incomplete" : "In progress";
  const [status, setStatus] = useState(match?.isNew ? "Incomplete" : "Completed");

  const handleStatus = (e) => {
    setStatus(e.name);
    if (e.id === 1) {
      actions.completeMatchup(dispatch, { matchId });
      actions.getTeams(dispatch);
      // Action to complete
    } else {
      actions.incompleteMatchup(dispatch, {matchId});
      actions.getTeams(dispatch);
    }
  };
  const homeTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.homeTeamId
  );

  const homeTeamMatchups = useSelector((state) => state.home.matchups)
    .filter(
      (matchup) => matchup.matchId == matchId && matchup.teamId == homeTeam?.id
    )
    .map(
      ({
        player,
        points,
        points3,
        points2,
        points1,
        attempts3,
        attempts2,
        attempts1,
        blocks,
        rebounds,
        assists,
        fouls,
        steals,
        turnovers,
      }) => {
        return {
          ...player,
          points,
          points3,
          points2,
          points1,
          attempts3,
          attempts2,
          attempts1,
          blocks,
          rebounds,
          assists,
          fouls,
          steals,
          turnovers,
        };
      }
    );

  const homeTeamPlayers = homeTeamMatchups;

  const awayTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.awayTeamId
  );

  const awayTeamMatchups = useSelector((state) => state.home.matchups)
    .filter(
      (matchup) => matchup.matchId == matchId && matchup.teamId == awayTeam?.id
    )
    .map(
      ({
        player,
        points,
        points3,
        points2,
        points1,
        attempts3,
        attempts2,
        attempts1,
        blocks,
        rebounds,
        assists,
        fouls,
        steals,
        turnovers,
      }) => {
        return {
          ...player,
          points,
          points3,
          points2,
          points1,
          attempts3,
          attempts2,
          attempts1,
          blocks,
          rebounds,
          assists,
          fouls,
          steals,
          turnovers,
        };
      }
    );
  const awayTeamPlayers = awayTeamMatchups;

  const handleAddSubstitute = (id) => {
    dispatch({ type: actions.OPEN_ADD_SUBSTITUTE_DIALOG, payload: id });
  };

  const handlePlayerStats = (teamId) => {
    dispatch({ type: actions.OPEN_PLAYER_STATS_DIALOG, payload: teamId });
  };
  const handleLineups = (teamId) => {
    dispatch({ type: actions.OPEN_LINEUP_DIALOG, payload: teamId });
  };

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getLogs(dispatch);
    actions.getPlayers(dispatch);
  }, []);

  let homeTeamPoints = 0;
  let awayTeamPoints = 0;
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
  const handleAction = (teamId, playerId, event, isDirect) => {
    console.log("handleAction", teamId, playerId, event, isDirect, time);
    actions.createOneLog(dispatch, {
      leagueId,
      matchId,
      period: currentPeriod,
      teamId,
      playerId,
      event,
      isDirect,
      time,
    });
  };

  // useEffect(() => {
  //   actions.updateMatchResult(dispatch,{matchId:matchId, result:matchupResult})
  // }, [homeTeamPoints, awayTeamPoints]);

  const handleSubmit = () => {
    axios
      .post(apis.updateMatchResult, {
        matchId: matchId,
        result: matchupResult,
      })
      .then((res) => {
        actions.getMatches(dispatch);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    axios
      .post(apis.createLogs, {
        leagueId: leagueId,
        matchId: matchId,
        // logs: logs,
        homeTeamId: homeTeam?.id,
        awayTeamId: awayTeam?.id,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  const removeSubstitute = (userId) => {
    axios
      .post(apis.removeSubstitute, {
        userId,
        leagueId,
        matchId,
      })
      .then((res) => {
        actions.getMatchups(dispatch);
        actions.getPlayers(dispatch);
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    // if the admin remove a substitutue, then the matchup result will be saved automatically
    handleSubmit();
  };

  const [currentPeriod, setCurrentPeriod] = useState(1);
  const handlePeriod = (period) => {
    setCurrentPeriod(period);
    setIsRunning(false);
  };
  const [numberOfPeriods, setNumberOfPeriods] = useState([]);
  const [timeOfPeriod, setTimeOfPeriod] = useState([]);
  useEffect(() => {
    setNumberOfPeriods(
      Array.from({ length: match?.period }, (_, index) => index + 1)
    );
  }, [match]);

  useEffect(() => {
    let tempTimeOfPeriod = [];
    numberOfPeriods.map(() => {
      tempTimeOfPeriod.push(match?.timer);
    });
    setTimeOfPeriod(tempTimeOfPeriod);
    setCurrentPeriod(1);
  }, [numberOfPeriods.length]);
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [teamId, setTeamId] = useState("");
  const handleClickButtons = (event, id) => {
    console.log("isNew?", match?.isNew)
    if (match?.isNew) {
      setEvent(event);
      setTeamId(id);
      dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: true });
      // dispatch to show the modal
    } else {
      alert("The matchup is locked!");
    }
  };
  const handleClickTimeout = (teamId) => {
    if (match?.isNew) {
      setEvent("TimeOut");
      handleAction(teamId, "", "TimeOut");
    } else {
      alert("The matchup is locked!");
    }
  };

  const handleSetting = () => {
    if (match?.isNew === 0) {
      dispatch({ type: actions.OPEN_MATCHUP_SETTING_DIALOG, payload: true });
    } else {
      alert("The matchup is locked!");
    }
  };

  const handleAddEvent = () => {
    if (match?.isNew === 0) {
      dispatch({ type: actions.OPEN_ADD_EVENT_DIALOG });
    } else {
      alert("The matchup is locked!");
    }
  };

  // Timer
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(timeOfPeriod[currentPeriod - 1]);
  }, [currentPeriod]);

  useEffect(() => {
    setTimer(match?.timer);
    // setTimer(Math.floor(match?.timer/100) * 6000 + Math.floor(match?.timer%100) * 100)
  }, [match]);
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
    <div className="flex flex-col flex-grow">
      <p className="flex font-dark-gray my-[20px] justify-between">
        <div className="">
          <Link to="/">
            <span className="underline">My Leagues</span>
          </Link>
          <span className=""> &gt; </span>
          <Link to={`/league/${leagueId}`}>
            <span className="underline">{league?.name}</span>
          </Link>

          <span className=""> &gt; </span>
          <Link to={`/league/${leagueId}?tab=3`}>
            <span className="underline">Matches</span>
          </Link>
          <span className=""> &gt; </span>
          <span className="text-sky-500">{homeTeam?.name} </span>
          <span> Vs</span>
          <span className="text-sky-500"> {awayTeam?.name}</span>
        </div>
        <div className="flex space-x-3">
          <Select
            className="w-[140px] rounded-lg text-xs h-button"
            options={options}
            handleClick={handleStatus}
            value={status}
          >
            {status}
          </Select>
          {/* <button
            onClick={handleSubmit}
            className="w-32 h-button bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 disabled:opacity-10 font-bold justify-end"
          >
            Save
          </button> */}
        </div>
      </p>

      <div className="grid grid-cols-7 gap-3">
        <div className="col-span-5 rounded-main justify-center">
          <div className="grid grid-rows-8 gap-3">
            <div className="flex flex-col row-span-5 bg-white dark:bg-slate rounded-main">
              <div className="flex justify-between mt-5 mx-10 mb-0">
                <div className="flex flex-col items-center">
                  <img
                    src={homeTeam?.logo}
                    alt=""
                    className="w-28 h-28 rounded-full mx-auto border border-gray-500"
                  />
                  <p className="text-black dark:text-white font-semibold text-2xl mt-5">
                    {homeTeam?.name}
                  </p>
                  <p className="text-font-dark-gray font-semibold text-xl">
                    Home
                  </p>
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
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-[10px] ${
                      arrow === "home" ? "bg-success" : "bg-font-dark-gray"
                    } w-16 h-10 cursor-pointer hover:bg-opacity-70`}
                    onClick={() => setArrow("home")}
                  >
                    <img
                      src={leftArrowIcon}
                      alt=""
                      className="w-[14px] h-[21px]"
                    />
                  </div>
                </div>
                <div className="text-center mt-5">
                  <p className="text-black dark:text-white text-sm mt-3">
                    {match?.status}
                  </p>
                  <p className="text-black dark:text-white text-[56px] my-2">
                    {matchupResult[0]} - {matchupResult[1]}
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {match?.date}, {match?.time}
                  </p>
                  <p className="text-font-dark-gray text-sm mt-1">
                    {match?.location}
                  </p>
                  <div className="space-y-9 my-3">
                    <div className="flex space-x-3 justify-center">
                      {numberOfPeriods.map((period) => (
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
                        <div className="justify-center items-center">
                          <div className="flex">
                            <div className="mt-6">
                              <img
                                onClick={isRunning ? () => {} : increaseMinute}
                                src={darkMode ? triupIconDark : triupIconLight}
                                alt=""
                                className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                              />
                              <img
                                onClick={isRunning ? () => {} : decreaseMinute}
                                src={
                                  darkMode ? tridownIconDark : tridownIconLight
                                }
                                alt=""
                                className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                              />
                            </div>
                            <input
                              type="number"
                              className="w-[70px] font-semibold text-[56px] text-black dark:text-white bg-transparent outline-none"
                              value={minutes.toString().padStart(2, "0")}
                              onChange={(e) =>
                                setTimer(seconds * 100 + e.target.value * 6000)
                              }
                              disabled={isRunning}
                            />
                            <p className="font-semibold text-[56px] text-black dark:text-white mr-2">
                              :
                            </p>
                            <input
                              type="number"
                              className="w-[70px] font-semibold text-[56px] text-black dark:text-white bg-transparent outline-none"
                              value={seconds.toString().padStart(2, "0")}
                              onChange={(e) =>
                                setTimer(minutes * 6000 + e.target.value * 100)
                              }
                              disabled={isRunning}
                            />
                            <div className="mt-6">
                              <img
                                src={darkMode ? triupIconDark : triupIconLight}
                                onClick={isRunning ? () => {} : increaseSecond}
                                alt=""
                                className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                              />
                              <img
                                src={
                                  darkMode ? tridownIconDark : tridownIconLight
                                }
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={awayTeam?.logo}
                    alt=""
                    className="w-28 h-28 rounded-full mx-auto border border-gray-500"
                  />
                  <p className="text-black dark:text-white font-semibold text-2xl mt-5">
                    {awayTeam?.name}
                  </p>
                  <p className="text-font-dark-gray font-semibold text-xl">
                    Away
                  </p>
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
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-[10px] ${
                      arrow === "away" ? "bg-success" : "bg-font-dark-gray"
                    } w-16 h-10 cursor-pointer hover:bg-opacity-70`}
                    onClick={() => setArrow("away")}
                  >
                    <img
                      src={rightArrowIcon}
                      alt=""
                      className="w-[14px] h-[21px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row-span-3 bg-white dark:bg-slate rounded-main p-[26px]">
              <div className="flex space-x-3">
                <div className="flex flex-col w-1/2 space-y-[10px]">
                  <div className="flex bg-light-charcoal dark:bg-charcoal w-full h-12 rounded-t-lg p-4 items-center justify-between">
                    <Link
                      to={`/league/${leagueId}/team/${homeTeam?.id}`}
                      className="flex space-x-2 items-center"
                    >
                      <img
                        src={homeTeam?.logo}
                        alt=""
                        className="w-8 h-8 rounded-full border border-gray-500"
                      />
                      <p className="text-black dark:text-white underline">
                        {homeTeam?.name}
                      </p>
                    </Link>
                    <div className="flex space-x-5 ">
                      <img
                        src={playerStats}
                        alt=""
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => handlePlayerStats(homeTeam?.id)}
                      />
                      <img
                        src={editLineup}
                        alt=""
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => handleLineups(homeTeam?.id)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points3", homeTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+3</p>
                    </div>
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points2", homeTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+2</p>
                    </div>
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points1", homeTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+1</p>
                    </div>
                  </div>
                  {(league?.displayAttempts3 ||
                    league?.displayAttempts2 ||
                    league?.displayAttempts1) && (
                    <div className="grid grid-cols-3 gap-[10px]">
                      {league?.displayAttempts3 && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts3", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 3</p>
                        </div>
                      )}
                      {league?.displayAttempts2 && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts2", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 2</p>
                        </div>
                      )}
                      {league?.displayAttempts1 && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts1", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 1</p>
                        </div>
                      )}
                    </div>
                  )}
                  {(league?.displayRebounds ||
                    league?.displayTurnovers ||
                    league?.displayFouls) && (
                    <div className="grid grid-cols-3 gap-[10px]">
                      {league?.displayRebounds && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("rebounds", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">REBOUND</p>
                        </div>
                      )}
                      {league?.displayTurnovers && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("turnovers", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">TURNOVER</p>
                        </div>
                      )}

                      {league?.displayFouls && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("fouls", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">FOUL</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() => handleClickTimeout(homeTeam?.id)}
                    >
                      <p className="text-black dark:text-white">TIMEOUT</p>
                    </div>
                    {league?.displayBlocks && (
                      <div
                        className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                        onClick={() =>
                          handleClickButtons("blocks", homeTeam?.id)
                        }
                      >
                        <p className="text-black dark:text-white">BLOCK</p>
                      </div>
                    )}
                    {league?.displayAssists && (
                      <div
                        className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                        onClick={() =>
                          handleClickButtons("assists", homeTeam?.id)
                        }
                      >
                        <p className="text-black dark:text-white">ASSIST</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-1/2 space-y-[10px]">
                  <div className="flex bg-light-charcoal dark:bg-charcoal w-full h-12 rounded-t-lg p-4 items-center justify-between">
                    <Link
                      to={`/league/${leagueId}/team/${awayTeam?.id}`}
                      className="flex space-x-2 items-center"
                    >
                      <img
                        src={awayTeam?.logo}
                        alt=""
                        className="w-8 h-8 rounded-full border border-gray-500"
                      />
                      <p className="text-black dark:text-white underline">
                        {awayTeam?.name}
                      </p>
                    </Link>
                    <div className="flex space-x-5 ">
                      <img
                        src={playerStats}
                        alt=""
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => handlePlayerStats(awayTeam?.id)}
                      />
                      <img
                        src={editLineup}
                        alt=""
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => handleLineups(awayTeam?.id)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points3", awayTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+3</p>
                    </div>
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points2", awayTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+2</p>
                    </div>
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points1", awayTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+1</p>
                    </div>
                  </div>
                  {(league?.displayAttempts3 ||
                    league?.displayAttempts2 ||
                    league?.displayAttempts1) && (
                    <div className="grid grid-cols-3 gap-[10px]">
                      {league?.displayAttempts3 && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts3", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 3</p>
                        </div>
                      )}
                      {league?.displayAttempts2 && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts2", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 2</p>
                        </div>
                      )}
                      {league?.displayAttempts1 && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts1", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 1</p>
                        </div>
                      )}
                    </div>
                  )}
                  {(league?.displayRebounds ||
                    league?.displayTurnovers ||
                    league?.displayFouls) && (
                    <div className="grid grid-cols-3 gap-[10px]">
                      {league?.displayRebounds && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("rebounds", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">REBOUND</p>
                        </div>
                      )}
                      {league?.displayTurnovers && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("turnovers", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">TURNOVER</p>
                        </div>
                      )}
                      {league?.displayFouls && (
                        <div
                          className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("fouls", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">FOUL</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div
                      className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() => handleClickTimeout(awayTeam?.id)}
                    >
                      <p className="text-black dark:text-white">TIMEOUT</p>
                    </div>
                    {league?.displayBlocks && (
                      <div
                        className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                        onClick={() =>
                          handleClickButtons("blocks", awayTeam?.id)
                        }
                      >
                        <p className="text-black dark:text-white">BLOCK</p>
                      </div>
                    )}
                    {league?.displayAssists && (
                      <div
                        className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                        onClick={() =>
                          handleClickButtons("assists", awayTeam?.id)
                        }
                      >
                        <p className="text-black dark:text-white">ASSIST</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex col-span-2 flex-col flex-grow rounded-main bg-white dark:bg-slate p-default overflow-y-auto">
          <div className="flex justify-between mb-5">
            <p className="text-black dark:text-white">Action Log</p>
            <div className="flex items-center space-x-5">
              <img
                onClick={handleSetting}
                src={darkMode ? settingIconDark : settingIconLight}
                alt=""
                className="w-4 h-4 cursor-pointer"
              />
              <img
                onClick={handleAddEvent}
                src={darkMode ? plusIconDark : plusIconLight}
                alt=""
                className="w-3 h-3 cursor-pointer"
              />
              <img
                src={darkMode ? downloadIconDark : downloadIconLight}
                alt=""
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="space-y-3">
            {Object.values(allLogs).map((log, idx) => (
              <Log key={idx} log={log} id={log.id}></Log>
            ))}
          </div>
        </div>
      </div>
      <MatchupSettingModal></MatchupSettingModal>
      <SelectPlayerModal
        event={event}
        teamId={teamId}
        handleAction={handleAction}
        period={currentPeriod}
      />
      <EditEventModal homeTeam={homeTeam} awayTeam={awayTeam} />
      <SubstituteModal
        homeTeamPlayers={homeTeamPlayers}
        awayTeamPlayers={awayTeamPlayers}
      ></SubstituteModal>
      <LineupsModal></LineupsModal>
      <PlayerStatsModal></PlayerStatsModal>
    </div>
  );
};

export default Matchup;
