import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Table from "./index";

const PlayerMatchHistory = (props) => {
  const { leagueId, userId } = props;

  const teams = useSelector((state) => state.home.teams);
  const player = useSelector((state) => state.home.players).find(
    (player) =>
      player.userId == userId &&
      player.leagueId == leagueId &&
      player?.teamId !== 0
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId
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

  const matchups = useSelector((state) => state.home.matchups);
  //   .filter((matchup) => {
  //     const match = matches.find((m) => m.id == matchup.matchId);
  //     return (
  //       matchup.userId == userId &&
  //       matchup.leagueId == leagueId &&
  //       match &&
  //       !match.isNew
  //     );
  //   })
  //   .map((matchup) => {
  //     const match = matches.find((m) => m.id == matchup.matchId);
  //     return { ...matchup, match };
  //   });

  const columns = [
    {
      label: "Game Date",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.date}
        </Typography>
      ),
    },
    {
      label: "Matchup",
      getValue: (row) => (
        <div className="flex items-center space-x-2 justify-center sticky left-0">
          <img
            src={row.homeTeam.logo}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <p
            className={`underline ${
              row.homeTeamPoints > row.awayTeamPoints
                ? "font-bold"
                : ""
            }`}
          >
            <Link to={`/league/${leagueId}/team/${row.homeTeamId}`}>
              {row.homeTeam.name}
            </Link>
          </p>
          <p className="text-font-dark-gray">VS</p>
          <img
            src={
              row.awayTeam.logo
            }
            alt=""
            className="w-8 h-8 mr-2 rounded-full"
          />
          <p
            className={`underline ${
              row.awayTeamPoints > row.homeTeamPoints
                ? "font-bold"
                : ""
            }`}
          >
            <Link to={`/league/${leagueId}/team/${row.awayTeamId}`}>
              {row.awayTeam.name}
            </Link>
          </p>
        </div>
      ),
    },
    {
      label: "PTS",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints}
        </Typography>
      ),
    },
    {
      label: "3PM",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints3}
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3PA",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts3}
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3P%",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {isNaN((row.totalPoints3 / row.attempts3) * 100)
            ? 0
            : ((row.totalPoints3 / row.attempts3) * 100).toFixed(2)}
        </Typography>
      ),
    },
    {
      label: "FGM",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints2}
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FGA",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts2}
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FG%",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {isNaN((row.totalPoints2 / row.attempts2) * 100)
            ? 0
            : ((row.totalPoints2 / row.attempts2) * 100).toFixed(2)}
        </Typography>
      ),
    },
    {
      label: "FTM",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints1}
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FTA",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts1}
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FT%",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {isNaN((row.totalPoints1 / row.attempts1) * 100)
            ? 0
            : ((row.totalPoints1 / row.attempts1) * 100).toFixed(2)}
        </Typography>
      ),
    },
    displayBlocks && {
      label: "BLK",
      condition: displayBlocks,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.blocks}
        </Typography>
      ),
    },
    displayRebounds && {
      label: "REB",
      condition: displayRebounds,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.rebounds}
        </Typography>
      ),
    },
    displayAssists && {
      label: "AST",
      condition: displayAssists,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.assists}
        </Typography>
      ),
    },
    displayFouls && {
      label: "PF",
      condition: displayFouls,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.fouls}
        </Typography>
      ),
    },
    displaySteals && {
      label: "STL",
      condition: displaySteals,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.steals}
        </Typography>
      ),
    },
    displayTurnovers && {
      label: "TOV",
      condition: displayTurnovers,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.turnovers}
        </Typography>
      ),
    },
  ].filter(Boolean);

  const data = useMemo(
    () =>
      matchups
        .filter((matchup) => {
          const match = matches.find((m) => m.id == matchup.matchId);
          return (
            matchup.userId == userId &&
            matchup.leagueId == leagueId &&
            match &&
            !match.isNew
          );
        })
        .map((matchup) => {
          const match = matches.find((m) => m.id == matchup.matchId);
          return {
            date: match.date,
            homeTeamId: match.homeTeamId,
            awayTeamId: match.awayTeamId,
            homeTeamPoints: match.homeTeamPoints,
            awayTeamPoints: match.awayTeamPoints,
            homeTeam: teams.find((team) => team.id == match.homeTeamId),
            awayTeam: teams.find((team) => team.id == match.awayTeamId),
            totalPoints: matchup.points,
            totalPoints1: matchup.points1,
            totalPoints2: matchup.points2,
            totalPoints3: matchup.points3,
            attempts1: matchup.attempts1,
            attempts2: matchup.attempts2,
            attempts3: matchup.attempts3,
            blocks: matchup.blocks,
            rebounds: matchup.rebounds,
            assists: matchup.assists,
            fouls: matchup.fouls,
            steals: matchup.steals,
            turnovers: matchup.turnovers,
          };
        }),
    [matchups]
  );

  return (
    <div className="text-black dark:text-white mt-5 w-ful text-xs overflow-auto">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default PlayerMatchHistory;
