import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import SubstituteModal from "../../components/Modal/SubstituteModal";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.png";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.png";
import axios from "axios";
import apis from "../../utils/apis";
import MatchupTitle from "../../components/MatchupTitle";

const Matchup = () => {
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

  return (
    <div className="flex flex-col flex-grow">
      {/* <MatchupTitle handleClick={handleSubmit} result={match?.result}>
        Matchup Page
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

      <div className="flex rounded-main bg-white dark:bg-slate p-12 h-[284px] items-center justify-center">
        <div className="flex space-x-10">
          <div className="text-center w-[330px]">
            <img
              src={homeTeam?.logo}
              alt=""
              className="w-28 h-28 rounded-full mx-auto"
            />
            <p className="text-black dark:text-white font-semibold text-2xl mt-5">
              {homeTeam?.name}
            </p>
            <p className="text-font-dark-gray font-semibold text-xl">Home</p>
          </div>
          <div className="text-center mt-3">
            <p className="text-black dark:text-white text-sm mt-3">
              {match?.status}
            </p>
            <p className="text-black dark:text-white text-[56px] my-2">
              {/* {match?.homeTeamPoints}:{match?.awayTeamPoints} */}
              {matchupResult[0]}:{matchupResult[1]}
            </p>
            <p className="text-black dark:text-white text-sm">{match?.date}</p>
            <p className="text-font-dark-gray text-sm mt-1">
              {match?.location}
            </p>
          </div>
          <div className="text-center w-[330px]">
            <img
              src={awayTeam?.logo}
              alt=""
              className="w-28 h-28 rounded-full mx-auto"
            />
            <p className="text-black dark:text-white font-semibold text-2xl mt-5">
              {awayTeam?.name}
            </p>
            <p className="text-font-dark-gray font-semibold text-xl">Away</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow rounded-main bg-white dark:bg-slate overflow-auto mt-[20px] p-default">
        {/* <div className="search flex justify-between space-x-3">
          <Input
            icon={search}
            className="flex-grow rounded-lg text-xs"
            placeholder="Search Leagues"
          />
          <Select
            className="w-[144px] rounded-lg text-xs"
            options={options}
            handleClick={(e) => setValue(e)}
            value={value}
          >
            {value}
          </Select>
        </div> */}
        <br></br>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-light-charcoal dark:bg-dark-gray transition ease-in-out delay-150 duration-200 w-full">
            <div className="flex justify-between h-button bg-light-dark-gray dark:bg-charcoal rounded-t-default p-4">
              <div className="flex items-center">
                <img
                  src={homeTeam?.logo}
                  className="w-8 h-8 rounded-default"
                ></img>
                <Link to={`/league/${leagueId}/team/${match?.homeTeamId}`}>
                  <p className="text-black dark:text-white text-sm mx-2 underline">
                    {homeTeam?.name}
                  </p>
                </Link>
                <p className="text-black dark:text-white text-[10px]">
                  {homeTeam?.waitlist}/{homeTeam?.max}
                </p>
              </div>
              <div
                onClick={() => handleAddSubstitute(match?.homeTeamId)}
                className="flex items-center space-x-2 text-sky-500 text-sm cursor-pointer hover:opacity-70"
              >
                + Substitute
              </div>
            </div>

            <div className="flex flex-grow items-center overflow-x-auto">
              {/* {homeTeamMatchups.length > 0 ? ( */}
              {homeTeamPlayers.length > 0 ? (
                <div className="text-black dark:text-white h-full w-full">
                  <table className="w-full text-left">
                    <thead className="sticky">
                      <tr>
                        <th
                          key="1"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Player
                        </th>
                        <th
                          key="2"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Jersey Number
                        </th>
                        {displayPosition ? (
                          <th
                            key="3"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Position
                          </th>
                        ) : (
                          ""
                        )}
                        <th
                          key="4"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Points
                        </th>
                        <th
                          key="5"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          3 Points
                        </th>
                        <th
                          key="6"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          2 Points
                        </th>
                        <th
                          key="7"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Foul Shots
                        </th>
                        {displayAttempts3 ? (
                          <th
                            key="8"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            3 Attempts
                          </th>
                        ) : (
                          ""
                        )}
                        {displayAttempts2 ? (
                          <th
                            key="9"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            2 Attempts
                          </th>
                        ) : (
                          ""
                        )}
                        {displayAttempts1 ? (
                          <th
                            key="10"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            1 Attempts
                          </th>
                        ) : (
                          ""
                        )}
                        {displayBlocks ? (
                          <th
                            key="11"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Blocks
                          </th>
                        ) : (
                          ""
                        )}
                        {displayRebounds ? (
                          <th
                            key="12"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Rebounds
                          </th>
                        ) : (
                          ""
                        )}
                        {displayAssists ? (
                          <th
                            key="13"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Assists
                          </th>
                        ) : (
                          ""
                        )}
                        {displayFouls ? (
                          <th
                            key="14"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Fouls
                          </th>
                        ) : (
                          ""
                        )}
                        {displaySteals ? (
                          <th
                            key="15"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Steals
                          </th>
                        ) : (
                          ""
                        )}
                        {displayTurnovers ? (
                          <th
                            key="16"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Turnovers
                          </th>
                        ) : (
                          ""
                        )}
                        <th
                          key="17"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {/* {homeTeamMatchups.map((matchup, index) => {
                        const player = homeTeamPlayers.find(
                          (player) => player.id == matchup.playerId
                        );

                        return (
                          <tr
                            key={index}
                            className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
                          >
                            <td className="">
                              <div className="flex items-center underline justify-between px-3">
                                <img
                                  src={player?.avatar}
                                  alt=""
                                  className="w-8 h-8 mr-2 rounded-default"
                                />
                                <Link
                                  to={`/league/${leagueId}/player/${player?.userId}`}
                                >
                                  {player?.firstName} {player?.lastName}
                                </Link>
                              </div>
                            </td>
                            <td className="">{homeInput[index]?.points}</td>
                            <td className="">
                              <Input
                                key={index}
                                className="w-[50px] rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.points3 || 0}
                                onChange={(e) =>
                                  handleHomePoints3Change(index, e.target.value)
                                }
                              ></Input>
                            </td>
                            <td className="">
                              <Input
                                key={index}
                                className="w-[50px] rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.points2 || 0}
                                onChange={(e) =>
                                  handleHomePoints2Change(index, e.target.value)
                                }
                              ></Input>
                            </td>
                            <td className="">
                              <Input
                                key={index}
                                className="w-[50px] rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.points1 || 0}
                                onChange={(e) =>
                                  handleHomePoints1Change(index, e.target.value)
                                }
                              ></Input>
                            </td>
                            <td className="">{player?.jerseyNumber}</td>
                          </tr>
                        );
                      })} */}
                      {homeTeamPlayers.map((player, index) => (
                        <tr
                          key={index}
                          className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
                        >
                          <td className="">
                            <div className="flex items-center underline px-3">
                              <img
                                src={player.avatar}
                                alt=""
                                className="w-8 h-8 mr-2 rounded-default"
                              />
                              <Link
                                to={`/league/${leagueId}/player/${player.userId}`}
                              >
                                {player.firstName} {player.lastName}
                              </Link>
                            </div>
                          </td>
                          <td className="">{player?.jerseyNumber}</td>
                          {displayPosition ? (
                            <td className="">{homeInput[index]?.position}</td>
                          ) : (
                            ""
                          )}
                          <td className="">{homeInput[index]?.points}</td>
                          <td className="">
                            <input
                              key={index}
                              className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={homeInput[index]?.points3}
                              onChange={(e) =>
                                handleHomePoints3Change(index, e.target.value)
                              }
                            ></input>
                          </td>
                          <td className="">
                            <input
                              key={index}
                              className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={homeInput[index]?.points2}
                              onChange={(e) =>
                                handleHomePoints2Change(index, e.target.value)
                              }
                            ></input>
                          </td>
                          <td className="">
                            <input
                              key={index}
                              className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={homeInput[index]?.points1}
                              onChange={(e) =>
                                handleHomePoints1Change(index, e.target.value)
                              }
                            ></input>
                          </td>
                          {displayAttempts3 && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.attempts3 || 0}
                                onChange={(e) =>
                                  handleHomeAttempts3Change(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          {displayAttempts2 && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.attempts2 || 0}
                                onChange={(e) =>
                                  handleHomeAttempts2Change(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          {displayAttempts1 && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.attempts1 || 0}
                                onChange={(e) =>
                                  handleHomeAttempts1Change(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}

                          {displayBlocks && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.blocks || 0}
                                onChange={(e) =>
                                  handleHomeBlocksChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displayRebounds && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.rebounds || 0}
                                onChange={(e) =>
                                  handleHomeReboundsChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          {displayAssists && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.assists || 0}
                                onChange={(e) =>
                                  handleHomeAssistsChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displayFouls && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.fouls || 0}
                                onChange={(e) =>
                                  handleHomeFoulsChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displaySteals && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.steals || 0}
                                onChange={(e) =>
                                  handleHomeStealsChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displayTurnovers && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInput[index]?.turnovers || 0}
                                onChange={(e) =>
                                  handleHomeTurnoversChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          <td>
                            {player.isSubstitute === 1 && (
                              <img
                                src={
                                  darkMode ? deleteIconDark : deleteIconLight
                                }
                                onClick={() => removeSubstitute(player.userId)}
                                alt=""
                                className="cursor-pointer"
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-black dark:text-white w-full text-center">
                    No players to show!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-light-charcoal dark:bg-dark-gray transition ease-in-out delay-150 duration-200 w-full">
            <div className="flex justify-between h-button bg-light-dark-gray dark:bg-charcoal rounded-t-default p-4">
              <div className="flex items-center">
                <img
                  src={awayTeam?.logo}
                  className="w-8 h-8 rounded-default"
                ></img>
                <Link to={`/league/${leagueId}/team/${match?.awayTeamId}`}>
                  <p className="text-black dark:text-white text-sm mx-2 underline">
                    {awayTeam?.name}
                  </p>
                </Link>
                <p className="text-black dark:text-white text-[10px]">
                  {awayTeam?.waitlist}/{awayTeam?.max}
                </p>
              </div>
              <div
                onClick={() => handleAddSubstitute(match?.awayTeamId)}
                className="flex items-center space-x-2 text-sky-500 text-sm cursor-pointer hover:opacity-70"
              >
                + Substitute
              </div>
            </div>

            <div className="flex flex-grow items-center overflow-x-auto">
              {/* {awayTeamMatchups.length > 0 ? ( */}
              {awayTeamPlayers.length > 0 ? (
                <div className="text-black dark:text-white h-full w-full">
                  <table className="w-full table-auto text-left">
                    <thead className="sticky">
                      <tr>
                        <th
                          key="1"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Player
                        </th>
                        <th
                          key="2"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Jersey Number
                        </th>
                        {displayPosition ? (
                          <th
                            key="2"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Position
                          </th>
                        ) : (
                          ""
                        )}
                        <th
                          key="3"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Points
                        </th>
                        <th
                          key="4"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          3 Points
                        </th>
                        <th
                          key="5"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          2 Points
                        </th>
                        <th
                          key="6"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Foul Shots
                        </th>
                        {displayAttempts3 ? (
                          <th
                            key="8"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            3 Attempts
                          </th>
                        ) : (
                          ""
                        )}
                        {displayAttempts2 ? (
                          <th
                            key="9"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            2 Attempts
                          </th>
                        ) : (
                          ""
                        )}
                        {displayAttempts1 ? (
                          <th
                            key="10"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            1 Attempts
                          </th>
                        ) : (
                          ""
                        )}
                        {displayBlocks ? (
                          <th
                            key="11"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Blocks
                          </th>
                        ) : (
                          ""
                        )}
                        {displayRebounds ? (
                          <th
                            key="12"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Rebounds
                          </th>
                        ) : (
                          ""
                        )}
                        {displayAssists ? (
                          <th
                            key="13"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Assists
                          </th>
                        ) : (
                          ""
                        )}
                        {displayFouls ? (
                          <th
                            key="14"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Fouls
                          </th>
                        ) : (
                          ""
                        )}
                        {displaySteals ? (
                          <th
                            key="15"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Steals
                          </th>
                        ) : (
                          ""
                        )}
                        {displayTurnovers ? (
                          <th
                            key="16"
                            className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                          >
                            Turnovers
                          </th>
                        ) : (
                          ""
                        )}
                        <th
                          key="7"
                          className="h-button bg-light-charcoal dark:bg-slate text-center font-font-dark-gray font-normal text-sm"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {/* {awayTeamMatchups.map((matchup, index) => {
                        const player = awayTeamPlayers.find(
                          (player) => player.id == matchup.playerId
                        );

                        return (
                          <tr
                            key={index}
                            className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
                          >
                            <td className="">
                              <div className="flex items-center underline justify-between px-3">
                                <img
                                  src={player?.avatar}
                                  alt=""
                                  className="w-8 h-8 mr-2 rounded-default"
                                />
                                <Link
                                  to={`/league/${leagueId}/player/${player?.userId}`}
                                >
                                  {player?.firstName} {player?.lastName}
                                </Link>
                              </div>
                            </td>
                            <td className="">{awayInput[index]?.points}</td>
                            <td className="">
                              <Input
                                key={index}
                                className="w-[50px] rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.points3 || 0}
                                onChange={(e) =>
                                  handleAwayPoints3Change(index, e.target.value)
                                }
                              ></Input>
                            </td>
                            <td className="">
                              <Input
                                key={index}
                                className="w-[50px] rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.points2 || 0}
                                onChange={(e) =>
                                  handleAwayPoints2Change(index, e.target.value)
                                }
                              ></Input>
                            </td>
                            <td className="">
                              <Input
                                key={index}
                                className="w-[50px] rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.points1 || 0}
                                onChange={(e) =>
                                  handleAwayPoints1Change(index, e.target.value)
                                }
                              ></Input>
                            </td>
                            <td className="">{player?.jerseyNumber}</td>
                          </tr>
                        );
                      })} */}
                      {awayTeamPlayers.map((player, index) => (
                        <tr
                          key={index}
                          className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
                        >
                          <td className="">
                            <div className="flex items-center underline px-3">
                              <img
                                src={player.avatar}
                                alt=""
                                className="w-8 h-8 mr-2 rounded-default"
                              />
                              <Link
                                to={`/league/${leagueId}/player/${player.userId}`}
                              >
                                {player.firstName} {player.lastName}
                              </Link>
                            </div>
                          </td>
                          <td className="">{player?.jerseyNumber}</td>
                          {displayPosition ? (
                            <td className="">
                              {homeInput[index]?.position || 0}
                            </td>
                          ) : (
                            ""
                          )}
                          <td className="">{awayInput[index]?.points || 0}</td>
                          <td className="">
                            <input
                              key={index}
                              className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={awayInput[index]?.points3 || 0}
                              onChange={(e) =>
                                handleAwayPoints3Change(index, e.target.value)
                              }
                            ></input>
                          </td>
                          <td className="">
                            <input
                              key={index}
                              className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={awayInput[index]?.points2 || 0}
                              onChange={(e) =>
                                handleAwayPoints2Change(index, e.target.value)
                              }
                            ></input>
                          </td>
                          <td className="">
                            <input
                              key={index}
                              className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={awayInput[index]?.points1 || 0}
                              onChange={(e) =>
                                handleAwayPoints1Change(index, e.target.value)
                              }
                            ></input>
                          </td>
                          {displayAttempts3 && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.attempts3 || 0}
                                onChange={(e) =>
                                  handleAwayAttempts3Change(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          {displayAttempts2 && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.attempts2 || 0}
                                onChange={(e) =>
                                  handleAwayAttempts2Change(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          {displayAttempts1 && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.attempts1 || 0}
                                onChange={(e) =>
                                  handleAwayAttempts1Change(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}

                          {displayBlocks && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.blocks || 0}
                                onChange={(e) =>
                                  handleAwayBlocksChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displayRebounds && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.rebounds || 0}
                                onChange={(e) =>
                                  handleAwayReboundsChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          {displayAssists && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.assists || 0}
                                onChange={(e) =>
                                  handleAwayAssistsChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displayFouls && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.fouls || 0}
                                onChange={(e) =>
                                  handleAwayFoulsChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displaySteals && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.steals || 0}
                                onChange={(e) =>
                                  handleAwayStealsChange(index, e.target.value)
                                }
                              ></input>
                            </td>
                          )}
                          {displayTurnovers && (
                            <td>
                              <input
                                key={index}
                                className="w-[50px] outline-none rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={awayInput[index]?.turnovers || 0}
                                onChange={(e) =>
                                  handleAwayTurnoversChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              ></input>
                            </td>
                          )}
                          <td>
                            {player.isSubstitute === 1 ? (
                              <img
                                src={
                                  darkMode ? deleteIconDark : deleteIconLight
                                }
                                onClick={() => removeSubstitute(player.userId)}
                                alt=""
                                className="cursor-pointer"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-black dark:text-white w-full text-center">
                    No players to show!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* <MatchCard teamId={homeTeam.id} />
          <MatchCard teamId={awayTeam.id} /> */}
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

export default Matchup;
