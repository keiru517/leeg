import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import axios from "axios";
import apis from "../../utils/apis";
import Log from "../../components/Card/Log";
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

const Matchup1 = () => {
  let { leagueId, matchId } = useParams();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.home.dark_mode);
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.matchId == matchId
  );

  const allLogs = useSelector((state) => state.home.logs).filter(
    (log) => log.leagueId == leagueId && log.matchId == matchId
  );

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

  const [homeTeamFouls, setHomeTeamFouls] = useState(0);
  const [awayTeamFouls, setAwayTeamFouls] = useState(0);
  const [homeTeamTimeOuts, setHomeTeamTimeOuts] = useState(0);
  const [awayTeamTimeOuts, setAwayTeamTimeOuts] = useState(0);
  const [arrow, setArrow] = useState("home");

  const [homeInput, setHomeInput] = useState({});
  const [awayInput, setAwayInput] = useState({});
  const [logs, setLogs] = useState(allLogs);

  useEffect(() => {
    setHomeInput(homeTeamPlayers);
    setAwayInput(awayTeamPlayers);
    setLogs(allLogs);
    if (allLogs.length > 0) {
      setId(allLogs[allLogs.length - 1].id + 1);
    } else {
      setId(0); // Set id to 0 if allLogs is empty
    }
  }, [
    homeTeamMatchups.length,
    awayTeamMatchups.length,
    homeTeamPlayers.length,
    awayTeamPlayers.length,
    allLogs.length,
  ]);

  const removeLogById = (idToRemove) => {
    setLogs((prevLogs) => {
      const logArray = Object.values(prevLogs);
      const updatedLogs = logArray.filter((log) => log.id !== idToRemove);
      return Object.assign({}, updatedLogs);
    });
  };
  // Handel Home team inputs
  const handleAction = (teamId, playerId, event) => {
    console.log("here", playerId, event);
    if (teamId == homeTeam?.id) {
      handleHomePointsChange(playerId, event);
    } else {
      handleAwayPointsChange(playerId, event);
    }
  };

  const [id, setId] = useState(0);

  const handleHomePointsChange = (playerId, event) => {
    let temp = { ...homeInput };
    let logTemp = { ...logs };

    switch (event) {
      case "+3 Pointer": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              points3: temp[index].points3 + 1,
              points: temp[index].points + 3,
              attempts3: temp[index].attempts3 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "+2 Pointer": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              points2: temp[index].points2 + 1,
              points: temp[index].points + 2,
              attempts2: temp[index].attempts2 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "+1 Pointer": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              points2: temp[index].points1 + 1,
              points: temp[index].points + 1,
              attempts1: temp[index].attempts1 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
              // homeTeamPoints: matchupResult[0] + 1,
              // awayTeamPoints: matchupResult[1],
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "+3 Attempt": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              attempts3: temp[index].attempts3 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "+2 Attempt": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              attempts2: temp[index].attempts2 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "+1 Attempt": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              attempts1: temp[index].attempts1 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "Rebound": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              rebounds: temp[index].rebounds + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "Turnover": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              turnovers: temp[index].turnovers + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "Foul": {
        console.log("Foul clicked!");
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              fouls: temp[index].fouls + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "TimeOut": {
        Object.values(temp).map((player, index) => {
          logTemp[id] = {
            ...logTemp[id],
            id: id,
            period: currentPeriod,
            time,
            playerId: player.id,
            teamId: homeTeam.id,
            event,
          };
          setLogs(logTemp);
        });
        break;
      }
      case "Block": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              blocks: temp[index].blocks + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
      case "Assist": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              assists: temp[index].assists + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: homeTeam.id,
              event,
            };
            setLogs(logTemp);
            setHomeInput(temp);
          }
        });
        break;
      }
    }

    setId(id + 1);
    setHomeInput(temp);
    console.log("home", id);
  };

  const handleAwayPointsChange = (playerId, event) => {
    let temp = { ...awayInput };
    let logTemp = { ...logs };

    switch (event) {
      case "+3 Pointer": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              points3: temp[index].points3 + 1,
              points: temp[index].points + 3,
              attempts3: temp[index].attempts3 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "+2 Pointer": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              points2: temp[index].points2 + 1,
              points: temp[index].points + 2,
              attempts2: temp[index].attempts2 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "+1 Pointer": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              points2: temp[index].points1 + 1,
              points: temp[index].points + 1,
              attempts1: temp[index].attempts1 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "+3 Attempt": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              attempts3: temp[index].attempts3 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "+2 Attempt": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              attempts2: temp[index].attempts2 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "+1 Attempt": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              attempts1: temp[index].attempts1 + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "Rebound": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              rebounds: temp[index].rebounds + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "Turnover": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              turnovers: temp[index].turnovers + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "Foul": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              fouls: temp[index].fouls + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "TimeOut": {
        Object.values(temp).map((player, index) => {
          logTemp[id] = {
            ...logTemp[id],
            id: id,
            period: currentPeriod,
            time,
            playerId: player.id,
            teamId: awayTeam.id,
            event,
          };
          setLogs(logTemp);
        });
        break;
      }
      case "Block": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              blocks: temp[index].blocks + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
      case "Assist": {
        Object.values(temp).map((player, index) => {
          if (player.id == playerId) {
            temp[index] = {
              ...temp[index],
              assists: temp[index].assists + 1,
            };
            logTemp[id] = {
              ...logTemp[id],
              id: id,
              period: currentPeriod,
              time,
              playerId,
              teamId: awayTeam.id,
              event,
            };
            setLogs(logTemp);
            setAwayInput(temp);
          }
        });
        break;
      }
    }
    setId(id + 1);
    setAwayInput(temp);
    console.log("awayId", id);
  };

  const [matchupResult, setMatchupResult] = useState([]);

  // useEffect(() => {
  //   let homeTeamPoints = 0;
  //   Object.keys(homeInput).map((id) => {
  //     homeTeamPoints += Number(homeInput[id].points);
  //   });
  //   let awayTeamPoints = 0;
  //   Object.keys(awayInput).map((id) => {
  //     awayTeamPoints += Number(awayInput[id].points);
  //   });
  //   setMatchupResult([homeTeamPoints, awayTeamPoints]);
  // }, [homeInput, awayInput]);

  useEffect(() => {
    const sortedLogs = Object.values(logs).sort((a, b) => {
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

    setLogs(sortedLogs);
    let homeTeamPoints = 0;
    let awayTeamPoints = 0;
    let tempHomeTeamFouls = 0;
    let tempAwayTeamFouls = 0;
    let tempHomeTeamTimeOuts = 0;
    let tempAwayTeamTimeOuts = 0;
    Object.keys(logs).map((id) => {
      if (logs[id].teamId == homeTeam?.id) {
        switch (logs[id].event) {
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
            tempHomeTeamFouls += 1;
            break;
          case "TimeOut":
            tempHomeTeamTimeOuts += 1;
            break;
        }
      } else if (logs[id].teamId == awayTeam?.id) {
        switch (logs[id].event) {
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
            tempAwayTeamFouls += 1;
            break;
          case "TimeOut":
            tempAwayTeamTimeOuts += 1;
            break;
        }
      }
    });
    setMatchupResult([homeTeamPoints, awayTeamPoints]);
    setHomeTeamFouls(tempHomeTeamFouls);
    setAwayTeamFouls(tempAwayTeamFouls);
    setHomeTeamTimeOuts(tempHomeTeamTimeOuts);
    setAwayTeamTimeOuts(tempAwayTeamTimeOuts);
    console.log(logs);
  }, [logs.length]);

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

    // axios
    //   .post(apis.updateMatchup, {
    //     matchId: matchId,
    //     // data: mergedObject,
    //     homeInputValues: homeInput,
    //     awayInputValues: awayInput,
    //   })
    //   .then((res) => {
    //     actions.getTeams(dispatch);
    //     actions.getMatches(dispatch);
    //     actions.getMatchups(dispatch);
    //     actions.getPlayers(dispatch);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.message)
    //   });

    axios
      .post(apis.createLogs, {
        leagueId: leagueId,
        matchId: matchId,
        logs: logs,
        homeTeamId: homeTeam?.id,
        awayTeamId: awayTeam?.id,
      })
      .then((res) => {
        // actions.getLogs(dispatch);
        // actions.getMatches(dispatch);
        // actions.getMatchups(dispatch);
        // actions.getPlayers(dispatch);
        // actions.getTeams(dispatch);
        // setMatchupResult([match?.homeTeamPoints, match?.awayTeamPoints]);
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
    // axios
    //   .post(apis.createMatchup, {
    //     matchId: matchId,
    //     homeInputValues: homeInput,
    //     awayInputValues: awayInput,
    //   })
    //   .then((res) => {
    //     actions.getMatches(dispatch);
    //     actions.getMatchups(dispatch);
    //     alert(res.data.message);
    //   })
    //   .catch((error) => console.log(error.response.data.message));
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
  // const periods = Array.from({ length:  4}, (_, index) => index + 1);
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [teamId, setTeamId] = useState("");
  const handleClickButtons = (event, id) => {
    setEvent(event);
    setTeamId(id);
    dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: true });
    // dispatch to show the modal
  };
  const handleClickTimeout = (id) => {
    setEvent("TimeOut");
    handleAction(id, "", "TimeOut");
  };

  const handleSetting = () => {
    dispatch({ type: actions.OPEN_MATCHUP_SETTING_DIALOG, payload: true });
  };

  const handleAddEvent = () => {
    dispatch({ type: actions.OPEN_ADD_EVENT_DIALOG });
  };

  // Timer
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log("period");
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
    <div className="flex flex-col flex-grow">
      {/* <MatchupTitle handleClick={handleSubmit} result={match?.result}>
        Matchup1 Page
      </MatchupTitle> */}
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
          <span className="text-sky-500">
            {/* <Link to={`/league/${leagueId}/team/${team.id}`}> */}
            {homeTeam?.name}{" "}
          </span>
          <span> Vs</span>
          <span className="text-sky-500">
            {" "}
            {awayTeam?.name}
            {/* </Link> */}
          </span>
        </div>
        <button
          onClick={handleSubmit}
          className="w-32 h-button bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 disabled:opacity-10 font-bold justify-end"
          // disabled={result!=="-:-"}
        >
          Save
        </button>
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
                    {/* {match?.homeTeamPoints}:{match?.awayTeamPoints} */}
                    {matchupResult[0]} - {matchupResult[1]}
                    {/* {match?.homeTeamPoints} - {match?.awayTeamPoints} */}
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
                              : "bg-[#151515]"
                          } w-16 h-10 cursor-pointer hover:opacity-75`}
                          onClick={() => handlePeriod(period)}
                          // onClick={() => setCurrentPeriod(period)}
                        >
                          <p className="text-white">P{period}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      {/* <Timer setTime={setTime}></Timer> */}
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
                                src={
                                  darkMode ? tridownIconDark : tridownIconLight
                                }
                                alt=""
                                className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                              />
                            </div>
                            <input
                              type="number"
                              className="w-16 font-semibold text-[56px] text-black dark:text-white bg-transparent outline-none"
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
                              className="w-16 font-semibold text-[56px] text-black dark:text-white bg-transparent outline-none"
                              value={seconds.toString().padStart(2, "0")}
                              onChange={(e) =>
                                setTimer(minutes * 6000 + e.target.value * 100)
                              }
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
                        {/* <div className="flex">
        <button className="bg-green-500" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="bg-red-500" onClick={reset}>
          Reset
        </button>
      </div> */}
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
              {/* <hr className="border border-charcoal mb-[26px]" /> */}
              <div className="flex space-x-3">
                <div className="flex flex-col w-1/2 space-y-[10px]">
                  <div className="flex dark:bg-charcoal w-full h-12 rounded-t-lg p-4 items-center justify-between">
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
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points3", homeTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+3</p>
                    </div>
                    <div
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points2", homeTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+2</p>
                    </div>
                    <div
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts3", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 3</p>
                        </div>
                      )}
                      {league?.displayAttempts2 && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts2", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 2</p>
                        </div>
                      )}
                      {league?.displayAttempts1 && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("rebounds", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">REBOUND</p>
                        </div>
                      )}
                      {league?.displayTurnovers && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("turnovers", homeTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">TURNOVER</p>
                        </div>
                      )}

                      {league?.displayFouls && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      // onClick={() =>
                      //   handleClickButtons("timeout", homeTeam?.id)
                      // }
                      onClick={() => handleClickTimeout(homeTeam?.id)}
                    >
                      <p className="text-black dark:text-white">TIMEOUT</p>
                    </div>
                    {league?.displayBlocks && (
                      <div
                        className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                        onClick={() =>
                          handleClickButtons("blocks", homeTeam?.id)
                        }
                      >
                        <p className="text-black dark:text-white">BLOCK</p>
                      </div>
                    )}
                    {league?.displayAssists && (
                      <div
                        className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                  <div className="flex dark:bg-charcoal w-full h-12 rounded-t-lg p-4 items-center justify-between">
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
                        // onClick={()=>handleAddSubstitute(awayTeam?.id)}
                        onClick={() => handleLineups(awayTeam?.id)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points3", awayTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+3</p>
                    </div>
                    <div
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() =>
                        handleClickButtons("points2", awayTeam?.id)
                      }
                    >
                      <p className="text-black dark:text-white">+2</p>
                    </div>
                    <div
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts3", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 3</p>
                        </div>
                      )}
                      {league?.displayAttempts2 && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("attempts2", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">MISSED 2</p>
                        </div>
                      )}
                      {league?.displayAttempts1 && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("rebounds", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">REBOUND</p>
                        </div>
                      )}
                      {league?.displayTurnovers && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                          onClick={() =>
                            handleClickButtons("turnovers", awayTeam?.id)
                          }
                        >
                          <p className="text-black dark:text-white">TURNOVER</p>
                        </div>
                      )}
                      {league?.displayFouls && (
                        <div
                          className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
                      className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                      onClick={() => handleClickTimeout(awayTeam?.id)}
                    >
                      <p className="text-black dark:text-white">TIMEOUT</p>
                    </div>
                    {league?.displayBlocks && (
                      <div
                        className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                        onClick={() =>
                          handleClickButtons("blocks", awayTeam?.id)
                        }
                      >
                        <p className="text-black dark:text-white">BLOCK</p>
                      </div>
                    )}
                    {league?.displayAssists && (
                      <div
                        className="flex dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
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
            {Object.values(logs).map((log, idx) => (
              <Log
                key={idx}
                log={log}
                id={log.id}
                removeLogById={removeLogById}
              ></Log>
            ))}
          </div>
        </div>
      </div>
      <MatchupSettingModal></MatchupSettingModal>
      <SelectPlayerModal
        event={event}
        teamId={teamId}
        matchId={matchId}
        handleAction={handleAction}
      />
      <EditEventModal
        logs={logs}
        setLogs={setLogs}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <SubstituteModal
        homeTeamPlayers={homeTeamPlayers}
        awayTeamPlayers={awayTeamPlayers}
      ></SubstituteModal>
      <LineupsModal></LineupsModal>
      <PlayerStatsModal></PlayerStatsModal>
    </div>
  );
};

export default Matchup1;
