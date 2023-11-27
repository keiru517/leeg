import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Table from "./index";
import { Link } from "react-router-dom";
import {useMemo} from "react";

const Player = ({ players, league }) => {
  const matchups = useSelector((state) => state.home.matchups);

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

  const updatedPlayers = Object.values(
    players.reduce((acc, player) => {
      const matchup = matchups.filter(
        (matchup) =>
          matchup.userId == player.userId && matchup.leagueId == league.id
      );
      const points = matchup.reduce((sum, item) => sum + item.points, 0);
      if (player.userId in acc) {
        // If player already exists, add points to existing player
        acc[player.userId].points = points;
        // overwrite the teamId if there is a player who is not deleted
        console.log("substitute", player.id, player.isSubstitute);
        if (player.teamId !== 0 && player.isSubstitute !== 1) {
          acc[player.userId].teamId = player.teamId;
        }
        // acc[player.userId].teamId = player.teamId !== 0 && player.isSubstitute !== 1? player.teamId : 0;
        // overwrite the isDeleted if there is a player who is not deleted
        acc[player.userId].isDeleted = player.isDeleted ? 1 : player.isDeleted;
      } else {
        // If player doesn't exist, create a new entry
        acc[player.userId] = { ...player, points: points };
      }
      return acc;
    }, {})
  );

  const teams = useSelector((state) => state.home.teams);

  const columns = [
      {
      label: 'Player',
      fixed: true,
      getValue: (row) => (
          <Link to={`player/${row.userId}`} className="flex items-center">
              <img src={row.avatar} alt="" className="h-8 w-8 mr-4 rounded-full" />
              {row.firstName} {row.lastName}
          </Link>
      )
    },
      {
      label: 'Jersey Number',
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.jerseyNumber}
          </Typography>
      )
    },
      {
      label: 'Team',
      getValue: (row) => (
          <Link to={`team/${row.teamId}`} className="flex items-center">
              <img
                  src={row.team.logo}
                  alt=""
                  className="w-8 h-8 mr-2 rounded-full border border-gray-500"
              />
              {row.team.name}
          </Link>
      )
    },
      {
      label: 'Position',
      condition: displayPosition,
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.playerPosition}
          </Typography>
      )
    },
      {
      label: 'Points',
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.totalPoints}
          </Typography>
      )
    },
      {
      label: '3 Points',
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.totalPoints3}
          </Typography>
      )
    },
      {
      label: '2 Points',
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.totalPoints2}
          </Typography>
      )
    },
      {
      label: 'Free throws',
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.totalPoints1}
          </Typography>
      )
    },
      {
      label: '3 Attempts',
      condition: displayAttempts3,
      getValue: (row) => (
          <Typography
              variant="small"
              className="font-normal"
          >
              {row.attempts3}
          </Typography>
      )
    },
      {
          label: '2 Attempts',
          condition: displayAttempts2,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.attempts2}
              </Typography>
          )
      },
      {
          label: 'FT Attempts',
          condition: displayAttempts1,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.attempts1}

              </Typography>
          )
      },
      {
          label: 'Blocks',
          condition: displayBlocks,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.blocks}
              </Typography>
          )
      },
      {
          label: 'Rebounds',
          condition: displayRebounds,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.rebounds}
              </Typography>
          )
      },
      {
          label: 'Assists',
          condition: displayAssists,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.assists}
              </Typography>
          )
      },
      {
          label: 'Fouls',
          condition: displayFouls,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.fouls}
              </Typography>
          )
      },
      {
          label: 'Steals',
          condition: displaySteals,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.steals}
              </Typography>
          )
      },
      {
          label: 'Turnovers',
          condition: displayTurnovers,
          getValue: (row) => (
              <Typography
                  variant="small"
                  className="font-normal"
              >
                  {row.turnovers}
              </Typography>
          )
      },

  ];

  const data = useMemo(() => updatedPlayers
      .sort((a, b) => b.points - a.points)
      .map((player) => {
          const matchup = matchups.filter(
                  (matchup) =>
                      matchup.userId == player.userId &&
                      matchup.leagueId == league.id
              );
          return {
              totalPoints: matchup.reduce(
                  (sum, item) => sum + item.points,
                  0
              ),
              totalPoints1: matchup.reduce(
                  (sum, matchup) => sum + matchup.points1,
                  0
              ),
              totalPoints2: matchup.reduce(
                  (sum, matchup) => sum + matchup.points2,
                  0
              ),
              totalPoints3: matchup.reduce(
                  (sum, matchup) => sum + matchup.points3,
                  0
              ),
              attempts1: matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts1,
                  0
              ),
              attempts2: matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts2,
                  0
              ),
              attempts3: matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts3,
                  0
              ),
              blocks: matchup.reduce(
                  (sum, matchup) => sum + matchup.blocks,
                  0
              ),
              rebounds: matchup.reduce(
                  (sum, matchup) => sum + matchup.rebounds,
                  0
              ),
              assists: matchup.reduce(
                  (sum, matchup) => sum + matchup.assists,
                  0
              ),
              fouls: matchup.reduce(
                  (sum, matchup) => sum + matchup.fouls,
                  0
              ),
              steals: matchup.reduce(
                  (sum, matchup) => sum + matchup.steals,
                  0
              ),
              turnovers: matchup.reduce(
                  (sum, matchup) => sum + matchup.turnovers,
                  0
              ),
              playerPosition: player.position,
              jerseyNumber: player.jerseyNumber,
              firstName: player.firstName,
              lastName: player.lastName,
              avatar: player.avatar,
              team: teams.find((team) => team.id == player.teamId),
              teamId: player.teamId
          }
      }), [updatedPlayers]);

  return (
    <div className="text-black dark:text-white mt-5 w-full">
        <Table
            data={data}
            columns={columns}
        />
    </div>
  );
};

export default Player;
