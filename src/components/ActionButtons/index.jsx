import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import playerStats from "../../assets/img/dark_mode/player-stats.svg";
import editLineup from "../../assets/img/dark_mode/edit-lineup.svg";
import SelectPlayerModal from "../../components/Modal/SelectPlayerModal";

const Index = (props) => {
  let { leagueId, matchId } = useParams();
  let { handleAction } = props;
  const dispatch = useDispatch();
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );
  const currentPeriod = useSelector((state) => state.matchup.currentPeriod);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const homeTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.homeTeamId
  );
  const awayTeam = useSelector((state) => state.home.teams).find(
    (team) => team.id == match?.awayTeamId
  );
  const handlePlayerStats = (teamId) => {
    dispatch({ type: actions.OPEN_PLAYER_STATS_DIALOG, payload: teamId });
  };
  const handleLineups = (teamId) => {
    dispatch({ type: actions.OPEN_LINEUP_DIALOG, payload: teamId });
  };

  const [event, setEvent] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleClickButtons = (event, id) => {
    if (match?.isNew) {
      setEvent(event);
      setTeamId(id);
      dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: true });
      // dispatch to show the modal
    } else {
      alert("The matchup is completed!");
    }
  };

  const handleClickTimeout = (teamId) => {
    if (match?.isNew) {
      setEvent("TimeOut");
      handleAction(teamId, null, "TimeOut", 1);
    } else {
      alert("The matchup is completed!");
    }
  };

  return (
    <div className="hidden lg:flex flex-col bg-white dark:bg-slate rounded-main p-[26px]">
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
              <p className="text-black dark:text-white underline truncate w-40">
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
              {match?.isNew && (
                <img
                  src={editLineup}
                  alt=""
                  className="cursor-pointer hover:opacity-75"
                  onClick={() => handleLineups(homeTeam?.id)}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[10px]">
            <div
              className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
              onClick={() => handleClickButtons("points3", homeTeam?.id)}
            >
              <p className="text-black dark:text-white">+3</p>
            </div>
            <div
              className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
              onClick={() => handleClickButtons("points2", homeTeam?.id)}
            >
              <p className="text-black dark:text-white">+2</p>
            </div>
            <div
              className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
              onClick={() => handleClickButtons("points1", homeTeam?.id)}
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
                  onClick={() => handleClickButtons("attempts3", homeTeam?.id)}
                >
                  <p className="text-black dark:text-white">MISSED 3</p>
                </div>
              )}
              {league?.displayAttempts2 && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("attempts2", homeTeam?.id)}
                >
                  <p className="text-black dark:text-white">MISSED 2</p>
                </div>
              )}
              {league?.displayAttempts1 && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("attempts1", homeTeam?.id)}
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
                  onClick={() => handleClickButtons("rebounds", homeTeam?.id)}
                >
                  <p className="text-black dark:text-white">REBOUND</p>
                </div>
              )}
              {league?.displayTurnovers && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("turnovers", homeTeam?.id)}
                >
                  <p className="text-black dark:text-white">TURNOVER</p>
                </div>
              )}

              {league?.displayFouls && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("fouls", homeTeam?.id)}
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
                onClick={() => handleClickButtons("blocks", homeTeam?.id)}
              >
                <p className="text-black dark:text-white">BLOCK</p>
              </div>
            )}
            {league?.displayAssists && (
              <div
                className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                onClick={() => handleClickButtons("assists", homeTeam?.id)}
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
              <p className="text-black dark:text-white underline truncate w-40">
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
              {match?.isNew && (
                <img
                  src={editLineup}
                  alt=""
                  className="cursor-pointer hover:opacity-75"
                  onClick={() => handleLineups(awayTeam?.id)}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[10px]">
            <div
              className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
              onClick={() => handleClickButtons("points3", awayTeam?.id)}
            >
              <p className="text-black dark:text-white">+3</p>
            </div>
            <div
              className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
              onClick={() => handleClickButtons("points2", awayTeam?.id)}
            >
              <p className="text-black dark:text-white">+2</p>
            </div>
            <div
              className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
              onClick={() => handleClickButtons("points1", awayTeam?.id)}
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
                  onClick={() => handleClickButtons("attempts3", awayTeam?.id)}
                >
                  <p className="text-black dark:text-white">MISSED 3</p>
                </div>
              )}
              {league?.displayAttempts2 && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("attempts2", awayTeam?.id)}
                >
                  <p className="text-black dark:text-white">MISSED 2</p>
                </div>
              )}
              {league?.displayAttempts1 && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("attempts1", awayTeam?.id)}
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
                  onClick={() => handleClickButtons("rebounds", awayTeam?.id)}
                >
                  <p className="text-black dark:text-white">REBOUND</p>
                </div>
              )}
              {league?.displayTurnovers && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("turnovers", awayTeam?.id)}
                >
                  <p className="text-black dark:text-white">TURNOVER</p>
                </div>
              )}
              {league?.displayFouls && (
                <div
                  className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                  onClick={() => handleClickButtons("fouls", awayTeam?.id)}
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
                onClick={() => handleClickButtons("blocks", awayTeam?.id)}
              >
                <p className="text-black dark:text-white">BLOCK</p>
              </div>
            )}
            {league?.displayAssists && (
              <div
                className="flex bg-light-charcoal dark:bg-[#303335] w-full items-center justify-center h-12 rounded-xl cursor-pointer hover:opacity-75"
                onClick={() => handleClickButtons("assists", awayTeam?.id)}
              >
                <p className="text-black dark:text-white">ASSIST</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <SelectPlayerModal
        event={event}
        teamId={teamId}
        handleAction={handleAction}
        period={currentPeriod}
      />
    </div>
  );
};

export default Index;
