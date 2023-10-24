import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import SubstituteModal from "../../components/Modal/SubstituteModal";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg";
import axios from "axios";
import apis from "../../utils/apis";
import MatchupTitle from "../../components/MatchupTitle";
import Log from "../../components/Card/Log";
import leftArrowIcon from "../../assets/img/dark_mode/left-arrow.svg";
import rightArrowIcon from "../../assets/img/dark_mode/right-arrow.svg";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";
import playerStats from '../../assets/img/dark_mode/player-stats.svg';
import editLineup from '../../assets/img/dark_mode/edit-lineup.svg';
import plusIconDark from "../../assets/img/dark_mode/plus-icon-dark.svg";
import plusIconLight from "../../assets/img/dark_mode/plus-icon-light.svg";
import downloadIconDark from "../../assets/img/dark_mode/download-icon-dark.svg";
import downloadIconLight from "../../assets/img/dark_mode/download-icon-light.svg";

const Matchup1 = () => {
  let { leagueId, matchId } = useParams();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.home.dark_mode);

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getPlayers(dispatch);
  }, []);

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const displayPosition = league?.displayPosition;
  const displayAttempts3 = league?.displayAttempts3;
  const displayAttempts2 = league?.displayAttempts2;
  const displayAttempts1 = league?.displayAttempts1;
  const displayBlocks = league?.displayBlocks;
  const displayRebounds = league?.displayRebounds;
  const displayAssists = league?.displayAssists;
  const displayFouls = league?.displayFouls;
  const displaySteals = league?.displaySteals;
  const displayTurnovers = league?.displayTurnovers;

  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.matchId == matchId
  );

  const homeTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.homeTeamId
  );
  // const homeTeamPlayers = useSelector((state) => state.home.players).filter(
  //   (player) => player.teamId == match?.homeTeamId
  // );
  // const homePlayers = useSelector((state) => state.home.players)
  //   .filter((player) => player.teamId == match?.homeTeamId)
  //   .map((player) => {
  //     return { ...player, points: 0, points3: 0, points2: 0, points1: 0 };
  //   });

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
  // const homeTeamPlayers = match?.isNew ? homePlayers : homeTeamMatchups;

  const awayTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.awayTeamId
  );
  // const awayTeamPlayers = useSelector((state) => state.home.players).filter(
  //   (player) => player.teamId == match?.awayTeamId
  // );
  // const awayPlayers = useSelector((state) => state.home.players)
  //   .filter((player) => player.teamId == match?.awayTeamId)
  //   .map((player) => {
  //     return { ...player, points: 0, points3: 0, points2: 0, points1: 0 };
  //   });

  const awayTeamMatchups = useSelector((state) => state.home.matchups)
    .filter(
      (matchup) => matchup.matchId == matchId && matchup.teamId == awayTeam.id
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

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const handleAddSubstitute = (id) => {
    dispatch({ type: actions.OPEN_ADD_SUBSTITUTE_DIALOG, payload: id });
  };

  // const handleHomeInputChange = (index, playerId, matchId, teamId, points) => {
  //   console.log("Home", index, playerId, matchId, teamId, points);
  //   let temp = { ...homeInputValues };
  //   temp[index] = { playerId, matchId, teamId, points };
  //   setHomeInputValues(temp);
  // };

  const [homeInput, setHomeInput] = useState([]);
  const [awayInput, setAwayInput] = useState([]);

  useEffect(() => {
    // setHomeInput(homeTeamMatchups);
    // setAwayInput(awayTeamMatchups);
    setHomeInput(homeTeamPlayers);
    setAwayInput(awayTeamPlayers);
  }, [
    homeTeamMatchups.length,
    awayTeamMatchups.length,
    homeTeamPlayers.length,
    awayTeamPlayers.length,
  ]);

  // Handel Home team inputs
  const handleHomePoints3Change = (index, points3) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      points3: Number(points3),
      points: temp[index].points + 3 * (Number(points3) - temp[index].points3),
      // points: match?.isNew? temp[index].points || 0 + 3 * Number(points3):temp[index].points || 0 + 3 * (Number(points3) - temp[index].points3),
    };
    setHomeInput(temp);
  };

  const handleHomePoints2Change = (index, points2) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      points2: Number(points2),
      points: temp[index].points + 2 * (Number(points2) - temp[index].points2),
    };
    setHomeInput(temp);
  };

  const handleHomePoints1Change = (index, points1) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      points1: Number(points1),
      points: temp[index].points + 1 * (Number(points1) - temp[index].points1),
    };
    setHomeInput(temp);
  };

  const handleHomeAttempts3Change = (index, attempts3) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      attempts3: Number(attempts3),
      // points: temp[index].points + 3 * (Number(points3) - temp[index].points3),
      // points: match?.isNew? temp[index].points || 0 + 3 * Number(points3):temp[index].points || 0 + 3 * (Number(points3) - temp[index].points3),
    };
    setHomeInput(temp);
  };
  const handleHomeAttempts2Change = (index, attempts2) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      attempts2: Number(attempts2),
    };
    setHomeInput(temp);
  };
  const handleHomeAttempts1Change = (index, attempts1) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      attempts1: Number(attempts1),
    };
    setHomeInput(temp);
  };
  const handleHomeBlocksChange = (index, blocks) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      blocks: Number(blocks),
    };
    setHomeInput(temp);
  };
  const handleHomeReboundsChange = (index, rebounds) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      rebounds: Number(rebounds),
    };
    setHomeInput(temp);
  };
  const handleHomeAssistsChange = (index, assists) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      assists: Number(assists),
    };
    setHomeInput(temp);
  };
  const handleHomeFoulsChange = (index, fouls) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      fouls: Number(fouls),
    };
    setHomeInput(temp);
  };
  const handleHomeStealsChange = (index, steals) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      steals: Number(steals),
    };
    setHomeInput(temp);
  };
  const handleHomeTurnoversChange = (index, turnovers) => {
    let temp = { ...homeInput };
    temp[index] = {
      ...temp[index],
      turnovers: Number(turnovers),
    };
    setHomeInput(temp);
  };

  // Handle Away Team inputs
  const handleAwayPoints3Change = (index, points3) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      points3: Number(points3),
      points: temp[index].points + 3 * (Number(points3) - temp[index].points3),
    };
    setAwayInput(temp);
  };

  const handleAwayPoints2Change = (index, points2) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      points2: Number(points2),
      points: temp[index].points + 2 * (Number(points2) - temp[index].points2),
    };
    setAwayInput(temp);
  };

  const handleAwayPoints1Change = (index, points1) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      points1: Number(points1),
      points: temp[index].points + 1 * (Number(points1) - temp[index].points1),
    };
    setAwayInput(temp);
  };
  const handleAwayAttempts3Change = (index, attempts3) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      attempts3: Number(attempts3),
      // points: temp[index].points + 3 * (Number(points3) - temp[index].points3),
      // points: match?.isNew? temp[index].points || 0 + 3 * Number(points3):temp[index].points || 0 + 3 * (Number(points3) - temp[index].points3),
    };
    setAwayInput(temp);
  };
  const handleAwayAttempts2Change = (index, attempts2) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      attempts2: Number(attempts2),
    };
    setAwayInput(temp);
  };
  const handleAwayAttempts1Change = (index, attempts1) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      attempts1: Number(attempts1),
    };
    setAwayInput(temp);
  };
  const handleAwayBlocksChange = (index, blocks) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      blocks: Number(blocks),
    };
    setAwayInput(temp);
  };
  const handleAwayReboundsChange = (index, rebounds) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      rebounds: Number(rebounds),
    };
    setAwayInput(temp);
  };
  const handleAwayAssistsChange = (index, assists) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      assists: Number(assists),
    };
    setAwayInput(temp);
  };
  const handleAwayFoulsChange = (index, fouls) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      fouls: Number(fouls),
    };
    setAwayInput(temp);
  };
  const handleAwayStealsChange = (index, steals) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      steals: Number(steals),
    };
    setAwayInput(temp);
  };
  const handleAwayTurnoversChange = (index, turnovers) => {
    let temp = { ...awayInput };
    temp[index] = {
      ...temp[index],
      turnovers: Number(turnovers),
    };
    setAwayInput(temp);
  };

  const [awayInputValues, setAwayInputValues] = useState(awayTeamMatchups);

  // const handleAwayInputChange = (index, playerId, matchId, teamId, points) => {
  //   let temp = { ...awayInputValues };
  //   temp[index] = { playerId, matchId, teamId, points };
  //   setAwayInputValues(temp);
  // };

  const [matchupResult, setMatchupResult] = useState([]);
  // const [mergedObject, setMergedObject] = useState({});

  useEffect(() => {
    console.log("asdf", homeInput);
    console.log("asdf", awayInput);

    let homeTeamPoints = 0;
    Object.keys(homeInput).map((id) => {
      homeTeamPoints += Number(homeInput[id].points);
    });
    let awayTeamPoints = 0;
    Object.keys(awayInput).map((id) => {
      awayTeamPoints += Number(awayInput[id].points);
    });
    setMatchupResult([homeTeamPoints, awayTeamPoints]);
  }, [homeInput, awayInput]);

  // useEffect(() => {
  //   console.log(homeInputValues);
  //   console.log(awayInputValues);

  //   let homeTeamPoints = 0;
  //   Object.keys(homeInputValues).map((id) => {
  //     homeTeamPoints += Number(homeInputValues[id].points);
  //   });
  //   let awayTeamPoints = 0;
  //   Object.keys(awayInputValues).map((id) => {
  //     awayTeamPoints += Number(awayInputValues[id].points);
  //   });
  //   setMatchupResult([homeTeamPoints, awayTeamPoints]);
  // }, [homeInputValues, awayInputValues]);
  // }, [matchups]);

  useEffect(() => {
    actions.getMatchups(dispatch);
  }, []);

  const handleSubmit = () => {
    axios
      .post(apis.updateMatchResult, {
        matchId: matchId,
        result: matchupResult,
      })
      .then((res) => {
        actions.getTeams(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        actions.getPlayers(dispatch);
      })
      .catch((error) => console.log(error.response.data.message));

    axios
      .post(apis.updateMatchup, {
        matchId: matchId,
        // data: mergedObject,
        homeInputValues: homeInput,
        awayInputValues: awayInput,
      })
      .then((res) => {
        actions.getTeams(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        actions.getPlayers(dispatch);
        alert(res.data.message);
      })
      .catch((error) => console.log(error.response.data.message));

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

  const period = 1;

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
              <div className="flex justify-between mt-10 mx-12 mb-0">
                <div className="flex flex-col items-center">
                  <img
                    src={homeTeam?.logo}
                    alt=""
                    className="w-28 h-28 rounded-full mx-auto"
                  />
                  <p className="text-black dark:text-white font-semibold text-2xl mt-5">
                    {homeTeam?.name}
                  </p>
                  <p className="text-font-dark-gray font-semibold text-xl">
                    Home
                  </p>
                  <div className="flex space-x-3 my-3">
                    <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
                      <p className="text-black dark:text-white font-medium text-sm">
                        Fouls: 1
                      </p>
                    </div>
                    <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
                      <p className="text-black dark:text-white font-medium text-sm">
                        T/O: 2
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-[10px] bg-success w-16 h-10 cursor-pointer hover:bg-opacity-70">
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
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    {match?.date}, {match?.time}
                  </p>
                  <p className="text-font-dark-gray text-sm mt-1">
                    {match?.location}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={awayTeam?.logo}
                    alt=""
                    className="w-28 h-28 rounded-full mx-auto"
                  />
                  <p className="text-black dark:text-white font-semibold text-2xl mt-5">
                    {awayTeam?.name}
                  </p>
                  <p className="text-font-dark-gray font-semibold text-xl">
                    Away
                  </p>
                  <div className="flex space-x-3 my-3">
                    <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
                      <p className="text-black dark:text-white font-medium text-sm">
                        Fouls: 1
                      </p>
                    </div>
                    <div className="flex rounded-lg bg-light-charcoal dark:bg-[#151515] w-[97px] h-10 justify-center items-center">
                      <p className="text-black dark:text-white font-medium text-sm">
                        T/O: 2
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-[10px] bg-font-dark-gray w-16 h-10 cursor-pointer hover:bg-opacity-70">
                    <img
                      src={rightArrowIcon}
                      alt=""
                      className="w-[14px] h-[21px]"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-9 mb-10">
                <div className="flex space-x-3 justify-center">
                  <div
                    className={`flex items-center justify-center rounded-[10px] ${
                      period === 1 ? "bg-success" : "bg-[#151515]"
                    } w-16 h-10 cursor-pointer hover:opacity-75`}
                  >
                    <p className="text-white">P1</p>
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-[10px] ${
                      period === 2 ? "bg-success" : "bg-[#151515]"
                    } w-16 h-10 cursor-pointer hover:opacity-75`}
                  >
                    <p className="text-white">P2</p>
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-[10px] ${
                      period === 3 ? "bg-success" : "bg-[#151515]"
                    } w-16 h-10 cursor-pointer hover:opacity-75`}
                  >
                    <p className="text-white">P3</p>
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-[10px] ${
                      period === 4 ? "bg-success" : "bg-[#151515]"
                    } w-16 h-10 cursor-pointer hover:opacity-75`}
                  >
                    <p className="text-white">P4</p>
                  </div>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <div className="mt-1">
                    <img
                      src={darkMode ? triupIconDark : triupIconLight}
                      alt=""
                      className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                    />
                    <img
                      src={darkMode ? tridownIconDark : tridownIconLight}
                      alt=""
                      className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                    />
                  </div>
                  <p className="font-semibold text-[56px] text-black dark:text-white">
                    35:12
                  </p>
                  <div className="mt-1">
                    <img
                      src={darkMode ? triupIconDark : triupIconLight}
                      alt=""
                      className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                    />
                    <img
                      src={darkMode ? tridownIconDark : tridownIconLight}
                      alt=""
                      className="w-6 h-6 cursor-pointer hover:bg-opacity-70"
                    />
                  </div>
                  <button className="w-[169px] h-[53px] rounded-[10px] bg-success text-white font-bold text-sm mt-1 hover:bg-opacity-70">
                    {" "}
                    START CLOCK
                  </button>
                </div>
              </div>
            </div>

            <div className="row-span-3 bg-white dark:bg-slate rounded-main p-[26px]">
              <hr className="border border-charcoal mb-[26px]" />
              <div className="flex space-x-3">
                <div className="flex flex-col w-1/2 space-y-[10px]">
                  <div className="flex dark:bg-charcoal w-full h-14 rounded-t-lg p-4 items-center justify-between">
                      <Link to={`/league/${leagueId}/team/${homeTeam?.id}`} className="flex space-x-2 items-center">
                        <img src={homeTeam?.logo} alt="" className="w-8 h-8 rounded-full"/>
                        <p className="text-black dark:text-white underline">{homeTeam?.name}</p>
                      </Link>
                    <div className="flex space-x-5 ">
                      <img src={playerStats} alt="" className="cursor-pointer hover:opacity-75"/>
                      <img src={editLineup} alt="" className="cursor-pointer hover:opacity-75"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">+3</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">+2</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">+1</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">MISSED 3</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">MISSED 2</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">MISSED 1</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">REBOUND</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">TURNOVER</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">FOUL</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">TIMEOUT</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">BLOCK</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">ASSIST</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/2 space-y-[10px]">
                  <div className="flex dark:bg-charcoal w-full h-14 rounded-t-lg p-4 items-center justify-between">
                      <Link to={`/league/${leagueId}/team/${awayTeam?.id}`} className="flex space-x-2 items-center">
                        <img src={awayTeam?.logo} alt="" className="w-8 h-8 rounded-full"/>
                        <p className="text-black dark:text-white underline">{awayTeam?.name}</p>
                      </Link>
                    <div className="flex space-x-5 ">
                      <img src={playerStats} alt="" className="cursor-pointer hover:opacity-75"/>
                      <img src={editLineup} alt="" className="cursor-pointer hover:opacity-75"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">+3</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">+2</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">+1</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">MISSED 3</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">MISSED 2</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">MISSED 1</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">REBOUND</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">TURNOVER</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">FOUL</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">TIMEOUT</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">BLOCK</p>
                    </div>
                    <div className="flex dark:bg-[#303335] w-full items-center justify-center h-14 rounded-xl cursor-pointer hover:opacity-75">
                      <p className="text-black dark:text-white">ASSIST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex col-span-2 flex-col flex-grow rounded-main bg-white dark:bg-slate overflow-auto p-default">
            <div className="flex justify-between mb-5">
              <p className="text-black dark:text-white">Action Log</p>
              <div className="flex items-center space-x-5">
                <img src={darkMode?plusIconDark:plusIconLight} alt="" className="w-3 h-3 cursor-pointer"/>
                <img src={darkMode?downloadIconDark:downloadIconLight} alt="" className="w-5 h-5 cursor-pointer"/>
              </div>
            </div>
            <Log id="1" period={period} time="09:42" result="5-0"></Log>
        </div>
      </div>
      {/* <SubstituteModal /> */}
      <SubstituteModal
        homeTeamPlayers={homeTeamPlayers}
        awayTeamPlayers={awayTeamPlayers}
      ></SubstituteModal>
    </div>
    // </div>
  );
};

export default Matchup1;
