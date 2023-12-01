import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../components/Select";
import line from "../../assets/img/dark_mode/point-line.png";
import * as actions from "../../actions";
import ProfileTable from "../../components/Table/Profile";
import DefaultTeamLogo from "../../assets/img/dark_mode/default-team-logo.jpg";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";

const Player = () => {
  let { leagueId, userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.home.dark_mode);

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

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getPlayers(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
  }, []);

  const [value, setValue] = useState("Sort by");
  const user = useSelector((state) => state.home.user);
  const admins = useSelector((state) => state.home.admins);
  const isAdmin = admins.some((admin) => admin.userId == user?.id);
  const player = useSelector((state) => state.home.players).find(
    (player) => player.userId == userId && player.leagueId == leagueId
  );

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == player?.teamId
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const matches = useSelector((state) => state.home.matches);

  return (
    <div className="flex flex-col flex-grow">
      <p className="font-dark-gray my-3">
        <Link to="/">
          <span className="underline">My Leagues</span>
        </Link>

        <span className=""> &gt; </span>
        <Link to={`/league/${league?.id}`}>
          <span className="underline">{league?.name}</span>
        </Link>
        <span className=""> &gt; </span>
        {team && (
          <>
            <span className="underline">
              <Link to={`/league/${leagueId}/team/${team?.id}`}>
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
              className="w-[34px] h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
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
                className="w-20 h-20 mx-6 rounded-full border border-gray-500"
              />
            ) : (
              ""
            )}
            {/* <p className="text-3xl text-white text-left font-black"> */}
            <div className="text-3xl text-white text-left font-black">
              <div className="flex items-center">
                <p className="text-[28px] text-black dark:text-white">
                  {player?.firstName} {player?.lastName}{" "}
                </p>
                {isAdmin && (
                  <span className="text-xs font-normal mt-2 text-gray-400">
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
          {/* <button className="w-[377px] h-[102px] bg-primary rounded-default hover:opacity-70 text-white">
            <div className="w-[297px] mx-auto">
              <p className="text-xl font-semibold">Season Averages</p>
              <div className="flex full h-[35px]">
                <div className="h-full">
                  <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                  <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]" />
                <div className="h-full">
                  <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                  <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]" />
                <div className="h-full">
                  <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                  <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]" />
                <div className="h-full">
                  <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                  <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]" />
                <div className="h-full">
                  <p className="text-[10px] text-[#FFFFFF] opacity-50">PTS</p>
                  <p className="text-base font-semibold">12.1</p>
                </div>
                <img src={line} alt="" className="mx-[19px]" />
              </div>
            </div>
          </button> */}
        </div>
        {/* <div className="search flex justify-between space-x-6 mt-3">
          <Select
            className="w-full rounded-lg text-xs h-[42px]"
            options={options}
            handleClick={(e) => setValue(e.name)}
            value={value}
          >
            {value}
          </Select>
        </div> */}
        {matches.length > 0 ? (
          <ProfileTable userId={userId} leagueId={leagueId} />
        ) : (
          <div className="flex flex-grow items-center ">
            <p className="text-2xl text-white font-bold w-full text-center">
              No Statistics To Show!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
