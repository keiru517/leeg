import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router";
import MatchCard from "../../components/Card/Match";
import search from "../../assets/img/dark_mode/search.png";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PageTitle from "../../components/PageTitle";
import leftarrowIcon from "../../assets/img/dark_mode/left-arrow.png";
import * as actions from "../../actions";
import SubstituteModal from "../../components/Modal/SubstituteModal";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
import axios from "axios";
import apis from "../../utils/apis";
import MatchupTitle from "../../components/MatchupTitle";

const Matchup = () => {
  let { leagueId, matchId } = useParams();
  const dispatch = useDispatch();

  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const homeTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match.homeTeamId
  );

  const homeTeamPlayers = useSelector((state) => state.home.players).filter(
    (player) => player.teamId == match.homeTeamId && player.role == 2
  );

  const homeTeamMatchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.matchId == matchId && matchup.teamId == homeTeam.id
  );

  const awayTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match.awayTeamId
  );

  const awayTeamPlayers = useSelector((state) => state.home.players).filter(
    (player) => player.teamId == match.awayTeamId && player.role == 2
  );

  const awayTeamMatchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.matchId == matchId && matchup.teamId == awayTeam.id
  );

  const options = ["Ascend", "Descend", "Recent"];
  const [value, setValue] = useState("Sort by");

  const handleAddSubstitute = () => {
    dispatch({ type: actions.OPEN_ADD_SUBSTITUTE_DIALOG });
  };

  const [homeInputValues, setHomeInputValues] = useState(homeTeamMatchups);

  const handleHomeInputChange = (index, playerId, matchId, teamId, points) => {
    let temp = { ...homeInputValues };
    temp[index] = { playerId, matchId, teamId, points };
    setHomeInputValues(temp);
  };

  const [awayInputValues, setAwayInputValues] = useState(awayTeamMatchups);

  const handleAwayInputChange = (index, playerId, matchId, teamId, points) => {
    let temp = { ...awayInputValues };
    temp[index] = { playerId, matchId, teamId, points };
    setAwayInputValues(temp);
  };

  const [matchupResult, setMatchupResult] = useState([]);
  // const [mergedObject, setMergedObject] = useState({});

  useEffect(() => {
    console.log(homeInputValues);
    console.log(awayInputValues);

    let homeTeamPoints = 0;
    Object.keys(homeInputValues).map((id) => {
      homeTeamPoints += Number(homeInputValues[id].points);
    });
    let awayTeamPoints = 0;
    Object.keys(awayInputValues).map((id) => {
      awayTeamPoints += Number(awayInputValues[id].points);
    });
    setMatchupResult([homeTeamPoints, awayTeamPoints]);
  }, [homeInputValues, awayInputValues]);

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
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
      })
      .catch((error) => console.log(error.message));

    axios
      .post(apis.createMatchup, {
        matchId: matchId,
        // data: mergedObject,
        homeInputValues: homeInputValues,
        awayInputValues: awayInputValues,
      })
      .then((res) => {
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
        alert(res.data.message);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="flex flex-col flex-grow">
      <MatchupTitle handleClick={handleSubmit} result={match.result}>
        Matchup Page
      </MatchupTitle>
      <p className="font-dark-gray my-[20px]">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>
        <span className=""> &gt; </span>
        <Link to={`/league/${leagueId}`}>
          <span className="underline">2023 Summer League</span>
        </Link>

        <span className=""> &gt; </span>
        <span className="">Matches</span>
        <span className=""> &gt; </span>
        <span className="text-sky-500">
          {/* <Link to={`/league/${leagueId}/team/${team.id}`}> */}
          {homeTeam.name}{" "}
        </span>
        <span> Vs</span>
        <span className="text-sky-500">
          {" "}
          {awayTeam.name}
          {/* </Link> */}
        </span>
      </p>
      <div className="flex rounded-main bg-slate p-12 h-[284px] items-center justify-center">
        <div className="flex space-x-10">
          <div className="text-center w-[330px]">
            <img
              src={homeTeam.logo}
              alt=""
              className="w-28 h-28 rounded-full mx-auto"
            />
            <p className="text-white font-semibold text-2xl mt-5">
              {homeTeam.name}
            </p>
            <p className="text-font-dark-gray font-semibold text-xl">Home</p>
          </div>
          <div className="text-center mt-3">
            <p className="text-white text-sm mt-3">{match.status}</p>
            <p className="text-white text-[56px] my-2">
              {matchupResult[0]}:{matchupResult[1]}
            </p>
            <p className="text-white text-sm">{match.date}</p>
            <p className="text-font-dark-gray text-sm mt-1">{match.location}</p>
          </div>
          <div className="text-center w-[330px]">
            <img
              src={awayTeam.logo}
              alt=""
              className="w-28 h-28 rounded-full mx-auto"
            />
            <p className="text-white font-semibold text-2xl mt-5">
              {awayTeam.name}
            </p>
            <p className="text-font-dark-gray font-semibold text-xl">Away</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow rounded-main bg-slate overflow-auto mt-[20px] p-default">
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
          <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-dark-gray transition ease-in-out delay-150 hover:bg-dark-gray duration-200 w-full">
            <div className="flex justify-between h-button bg-charcoal rounded-t-default p-4">
              <div className="flex items-center">
                <img src={homeTeam.logo} className="w-8 h-8"></img>
                <Link to={`/league/${leagueId}/team/${match.homeTeamId}`}>
                  <p className="text-white text-sm mx-2 underline">
                    {homeTeam.name}
                  </p>
                </Link>
                <p className="text-white text-[10px]">
                  {homeTeam.waitlist}/{homeTeam.max}
                </p>
              </div>
              <div
                onClick={handleAddSubstitute}
                className="flex items-center space-x-2 text-sky-500 text-sm cursor-pointer hover:opacity-70"
              >
                + Substitute
              </div>
            </div>

            <div className="flex flex-grow items-center">
              {homeTeamPlayers.length > 0 ? (
                <div className="text-white h-full w-full">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead className="sticky">
                      <tr>
                        <th
                          key="2"
                          className="h-button bg-slate text-center font-font-dark-gray w-1/2"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            Player
                          </Typography>
                        </th>
                        <th
                          key="3"
                          className="h-button bg-slate text-center font-font-dark-gray w-1/2"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            Points
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {homeTeamPlayers.map((player, index) => (
                        <tr
                          key={index}
                          className="even:bg-dark-gray odd:bg-charcoal"
                        >
                          <td className="">
                            <div className="flex items-center underline justify-center">
                              <img
                                src={player.avatar}
                                alt=""
                                className="w-8 h-8 mr-2"
                              />
                              <Link
                                to={`/league/${leagueId}/player/${player.id}`}
                              >
                                {player.name}
                              </Link>
                            </div>
                          </td>
                          <td className="">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Input
                                key={index}
                                className="rounded-default bg-transparent border-none text-center"
                                type="number"
                                value={homeInputValues[index]?.points || 0}
                                onChange={(e) =>
                                  handleHomeInputChange(
                                    index,
                                    player.id,
                                    matchId,
                                    match.homeTeamId,
                                    e.target.value
                                  )
                                }
                              ></Input>
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-white w-full text-center">
                    No players to show!
                  </p>
                </div>
              )}
            </div>
            <SubstituteModal id={match.homeTeamId}></SubstituteModal>
          </div>
          <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-dark-gray transition ease-in-out delay-150 hover:bg-dark-gray duration-200 w-full">
            <div className="flex justify-between h-button bg-charcoal rounded-t-default p-4">
              <div className="flex items-center">
                <img src={awayTeam.logo} className="w-8 h-8"></img>
                <Link to={`/league/${leagueId}/team/${match.awayTeamId}`}>
                  <p className="text-white text-sm mx-2 underline">
                    {awayTeam.name}
                  </p>
                </Link>
                <p className="text-white text-[10px]">
                  {awayTeam.waitlist}/{awayTeam.max}
                </p>
              </div>
              <div
                onClick={handleAddSubstitute}
                className="flex items-center space-x-2 text-sky-500 text-sm cursor-pointer hover:opacity-70"
              >
                + Substitute
              </div>
            </div>

            <div className="flex flex-grow items-center">
              {awayTeamPlayers.length > 0 ? (
                <div className="text-white h-full w-full">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead className="sticky">
                      <tr>
                        <th
                          key="2"
                          className="h-button bg-slate text-center font-font-dark-gray w-1/2"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            Player
                          </Typography>
                        </th>
                        <th
                          key="3"
                          className="h-button bg-slate text-center font-font-dark-gray w-1/2"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            Points
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {awayTeamPlayers.map((player, index) => (
                        <tr
                          key={index}
                          className="even:bg-dark-gray odd:bg-charcoal"
                        >
                          <td className="">
                            <div className="flex items-center underline justify-center">
                              <img
                                src={player.avatar}
                                alt=""
                                className="w-8 h-8 mr-2"
                              />
                              <Link
                                to={`/league/${leagueId}/player/${player.id}`}
                              >
                                {player.name}
                              </Link>
                            </div>
                          </td>
                          <td className="justify-center">
                            <Input
                              key={index}
                              className="rounded-default bg-transparent border-none text-center"
                              type="number"
                              value={awayInputValues[index]?.points || 0}
                              onChange={(e) =>
                                handleAwayInputChange(
                                  index,
                                  player.id,
                                  matchId,
                                  match.awayTeamId,
                                  e.target.value
                                )
                              }
                            ></Input>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center flex-grow">
                  <p className="text-2xl text-white w-full text-center">
                    No players to show!
                  </p>
                </div>
              )}
            </div>
            <SubstituteModal id={match.awayTeamId}></SubstituteModal>
          </div>

          {/* <MatchCard teamId={homeTeam.id} />
          <MatchCard teamId={awayTeam.id} /> */}
        </div>
      </div>
      {/* <SubstituteModal /> */}
    </div>
    // </div>
  );
};

export default Matchup;
