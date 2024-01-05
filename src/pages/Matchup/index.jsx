import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as actions from "../../actions";
import Select from "../../components/Select";
import EditEventModal from "../../components/Modal/EditEventModal";
import MatchupSettingModal from "../../components/Modal/MatchupSettingModal";
import SubstituteModal from "../../components/Modal/SubstituteModal";
import LineupsModal from "../../components/Modal/LineupsModal";
import PlayerStatsModal from "../../components/Modal/PlayerStatsModal";
import Scoreboard from "../../components/Scoreboard";
import ActionButtons from "../../components/ActionButtons";
import EventLogs from "../../components/EventLogs";
import ActionLogModal from "../../components/Modal/ActionLogsModal";
import ActionButtonsModal from "../../components/Modal/ActionButtonsModal";

const MatchupMobile = () => {
  let { leagueId, matchId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
    actions.getLogs(dispatch);
    actions.getPlayers(dispatch);
    actions.getSubstitutes(dispatch);
  }, []);
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const currentPeriod = useSelector((state) => state.matchup.currentPeriod);

  const options = [
    { id: 0, name: "Incomplete" },
    { id: 1, name: "Completed" },
  ];
  const [status, setStatus] = useState(
    match?.isNew ? "Incomplete" : "Completed"
  );
  const handleStatus = (e) => {
    setStatus(e.name);
    if (e.id === 1) {
      actions.completeMatchup(dispatch, { matchId });
    } else {
      actions.incompleteMatchup(dispatch, { matchId });
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

  const homeTeamSubstitutes = useSelector(
    (state) => state.home.substitutes
  ).filter(
    (substitute) =>
      substitute.leagueId == leagueId &&
      substitute.matchId == matchId &&
      substitute.teamId == match?.homeTeamId
  );

  const homeTeamPlayers = [...homeTeamMatchups, ...homeTeamSubstitutes];
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

  const handleAction = (teamId, playerId, event, isDirect, isSubstitute) => {
    actions.createOneLog(dispatch, {
      leagueId,
      matchId,
      period: currentPeriod,
      teamId,
      playerId,
      event,
      time,
      isDirect,
      isSubstitute,
    });
  };

  const [time, setTime] = useState("");

  return (
    <div className="flex flex-col flex-grow">
      <p className="flex font-dark-gray my-3 sm:my-[20px] justify-between ">
        <div className="flex items-center text-sm">
          <Link to="/" className="hidden sm:flex">
            <span className="hover:underline">My Leagues</span>
          </Link>
          <span className="hidden sm:flex"> &gt; </span>
          <Link to={`/league/${leagueId}?tab=0`} className="hidden sm:flex">
            <span className="hover:underline">{league?.name}</span>
          </Link>

          <span className="hidden sm:flex"> &gt; </span>
          <Link to={`/league/${leagueId}?tab=1`} className="">
            <span className="hover:underline">Matches</span>
          </Link>
          <span className=""> &gt; </span>
          <span className="text-sky-500">{homeTeam?.name} </span>
          <span>&nbsp;vs&nbsp;</span>
          <span className="text-sky-500 "> {awayTeam?.name}</span>
        </div>
        <div className="flex space-x-3">
          <Select
            className="w-[120px] sm:w-[140px] rounded-lg text-xs h-button"
            options={options}
            handleClick={handleStatus}
            value={status}
          >
            {status}
          </Select>
        </div>
      </p>

      <div className="flex flex-grow space-x-3 h-[816px]">
        <div className="flex flex-grow rounded-main justify-center">
          <div className="flex flex-col flex-grow space-y-3">
            <Scoreboard setTime={setTime} />
            <ActionButtons className="hidden lg:flex" handleAction={handleAction} />
          </div>
        </div>
        <EventLogs className="hidden lg:flex w-1/4"/>
      </div>
      <ActionLogModal />
      <ActionButtonsModal handleAction={handleAction}/>
      <MatchupSettingModal />
      <EditEventModal homeTeam={homeTeam} awayTeam={awayTeam} />
      <SubstituteModal
        homeTeamPlayers={homeTeamPlayers}
        awayTeamPlayers={awayTeamPlayers}
      ></SubstituteModal>
      <LineupsModal />
      <PlayerStatsModal />

    </div>
  );
};

export default MatchupMobile;
