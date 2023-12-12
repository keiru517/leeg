import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { Tab } from "@headlessui/react";
import Select from "../../components/Select";
import line from "../../assets/img/dark_mode/point-line.png";
import * as actions from "../../actions";
import ProfileTable from "../../components/Table/PlayerMatchHistory";
import PlayerStatistics from "../../components/Table/PlayerStatistics";
import DefaultTeamLogo from "../../assets/img/dark_mode/default-team-logo.png";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";
import Input from "../../components/Input";
import search from "../../assets/img/dark_mode/search.png";

const Player = () => {
  let { leagueId, userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.home.dark_mode);

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

  const options = [
    {
      id: 0,
      name: "Ascend",
    },
    {
      id: 1,
      name: "Descend",
    },
    {
      id: 2,
      name: "Recent",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getPlayers(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
  }, []);

  const categories = ["Match History", "Statistics"];

  const user = useSelector((state) => state.home.user);
  const admins = useSelector((state) => state.home.admins);
  const isAdmin = admins.some((admin) => admin.userId == user?.id);
  const player = useSelector((state) => state.home.players).find(
    (player) => player.userId == userId && player.leagueId == leagueId
  );

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == player?.teamId
  );

  const matches = useSelector((state) => state.home.matches).filter(
    (match) =>
      match.leagueId == leagueId &&
      (match.homeTeamId == player?.teamId ||
        match.awayTeamId == player?.teamId) &&
      !match.isNew
  );

  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => 
      matchup.leagueId == leagueId && matchup.userId == player?.userId && matchup.attendance === 1 && !matchup.match.isNew
  );
  // const matchups = useSelector((state) => state.home.matchups).filter(
  //   (matchup) => {
  //     const match = matches.find(match=>match.id == matchup.matchId)
  //     return matchup.leagueId == leagueId && matchup.playerId == player?.id && matchup.attendance === 1 && match
  //   }
  // );

  const totalPoints = matchups.reduce(
    (sum, matchup) => sum + matchup.points,
    0
  );
  const totalPoints3 = matchups.reduce(
    (sum, matchup) => sum + matchup.points3,
    0
  );
  const totalPoints2 = matchups.reduce(
    (sum, matchup) => sum + matchup.points2,
    0
  );
  const totalPoints1 = matchups.reduce(
    (sum, matchup) => sum + matchup.points1,
    0
  );
  const attempts3 = matchups.reduce(
    (sum, matchup) => sum + matchup.attempts3,
    0
  );
  const attempts2 = matchups.reduce(
    (sum, matchup) => sum + matchup.attempts2,
    0
  );
  const attempts1 = matchups.reduce(
    (sum, matchup) => sum + matchup.attempts1,
    0
  );
  const blocks = matchups.reduce((sum, matchup) => sum + matchup.blocks, 0);
  const rebounds = matchups.reduce((sum, matchup) => sum + matchup.rebounds, 0);
  const assists = matchups.reduce((sum, matchup) => sum + matchup.assists, 0);
  const fouls = matchups.reduce((sum, matchup) => sum + matchup.fouls, 0);
  const steals = matchups.reduce((sum, matchup) => sum + matchup.steals, 0);
  const turnovers = matchups.reduce(
    (sum, matchup) => sum + matchup.turnovers,
    0
  );

  const gp = matchups.length;

  const ppg = gp === 0 ? 0 : totalPoints / gp;

  return (
    <div className="flex flex-col flex-grow">
      <p className="font-dark-gray my-3">
        <Link to="/" className="hover:underline">
          <span className="">My Leagues</span>
        </Link>

        <span className=""> &gt; </span>
        <Link to={`/league/${league?.id}`} className="hover:underline">
          <span className="">{league?.name}</span>
        </Link>
        <span className=""> &gt; </span>
        {team && (
          <>
            <span className="">
              <Link to={`/league/${leagueId}/team/${team?.id}`} className="hover:underline">
                {team?.name}
              </Link>
            </span>
            <span className=""> &gt; </span>
          </>
        )}
        <span className="text-sky-500">
          {player?.firstName} {player?.lastName}
        </span>
      </p>

      <div className="flex flex-col flex-grow rounded-main bg-white dark:bg-slate overflow-auto p-default">
        <div className="page-title bg-white dark:bg-charcoal flex items-center justify-between p-3">
          <div className="flex items-center">
            <div
              className="w-6 h-6 sm:w-[34px] sm:h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
              onClick={() => navigate(-1)}
            >
              <img
                src={darkMode ? backIconDark : backIconLight}
                alt=""
                className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
              />
            </div>
            {player?.avatar ? (
              <img
                src={player?.avatar}
                alt=""
                className="w-10 h-10 sm:w-20 sm:h-20 mx-6 rounded-full border border-gray-500"
              />
            ) : (
              ""
            )}
            {/* <p className="text-3xl text-white text-left font-black"> */}
            <div className="text-sm sm:text-3xl text-white text-left font-black">
              <div className="flex items-center">
                <p className="text-lg sm:text-[28px] text-black dark:text-white">
                  {player?.firstName} {player?.lastName}{" "}
                </p>
                {isAdmin && (
                  <span className="text-[10px] sm:text-xs sm:mt-2 font-normal text-gray-400 sm:inline hidden">
                    / {player?.email}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={team?.logo ? team.logo : DefaultTeamLogo}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-black dark:text-white text-xs font-medium">
                  {team?.name} | # {player?.jerseyNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-2 sm:px-0 h-full flex flex-col flex-grow mt-3">
          <Tab.Group>
            <Tab.List className="flex justify-start space-x-5 rounded-xl bg-transparent p-1 ">
              {categories.map((category, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    classNames(
                      "py-2.5 text-sm font-medium leading-5 text-gray-500 dark:text-gray-300 px-3",
                      " focus:outline-none ",
                      selected
                        ? "divide-[bg-sky-500] text-black dark:text-white border-b-2 border-sky-500"
                        : " rounded-lg hover:bg-white/[0.12]"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex-grow flex items-center ">
              {/* Match History */}
              <Tab.Panel
                key={0}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="search flex justify-between space-x-3">
                  <Input
                    icon={search}
                    className="flex-grow rounded-lg text-xs h-[42px]"
                    placeholder="Search Leagues"
                  />
                  {/* <Select
                    className="w-[144px] rounded-lg text-xs"
                    options={options}
                    handleClick={(e) => setValue(e)}
                    value={value}
                  >
                    {value}
                  </Select> */}
                </div>
                {matches.length > 0 ? (
                  <ProfileTable userId={userId} leagueId={leagueId} />
                ) : (
                  <div className="flex flex-grow items-center ">
                    <p className="text-2xl text-white font-bold w-full text-center">
                      No Match History To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>

              {/* Statitics */}
              <Tab.Panel
                key={1}
                className={classNames(
                  "rounded-xl flex flex-col w-full h-full "
                )}
              >
                <div className="text-black dark:text-white h-full w-full mt-4 overflow-auto">
                  <PlayerStatistics userId={userId} leagueId={leagueId}/>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Player;
