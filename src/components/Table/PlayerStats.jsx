import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Table from "./index";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useParams } from "react-router";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.png";

const PlayerStats = ({ players, league, teamId, playerKeyword }) => {
  let { leagueId } = useParams();
  const matchups = useSelector((state) => state.home.matchups);

  const displaySubstitutes = league?.displaySubstitutes;
  const displayPosition = league?.displayPosition;
  const displayJerseyNumber = league?.displayJerseyNumber;
  const displayAttempts3 = league?.displayAttempts3;
  const displayAttempts2 = league?.displayAttempts2;
  const displayAttempts1 = league?.displayAttempts1;
  const displayBlocks = league?.displayBlocks;
  const displayRebounds = league?.displayRebounds;
  const displayAssists = league?.displayAssists;
  const displayFouls = league?.displayFouls;
  const displaySteals = league?.displaySteals;
  const displayTurnovers = league?.displayTurnovers;

  // const players = useSelector((state) => state.home.players).filter(
  //   (player) => player.leagueId == leagueId && player.isAcceptedList
  // );

  // const substitutes = useSelector((state) => state.home.substitutes).filter(
  //   (sub) => sub.leagueId == leagueId && sub.teamId == teamId
  // );
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
        if (player.teamId !== 0 && !player.isSubstitute) {
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
      label: "Player",
      accessor: "firstName",
      fixed: true,
      getValue: (row) => (
        <div className="flex items-center">
          {
            row.isSubstitute == false ?
              <>
                <Link to={`/league/${leagueId}/player/${row.userId}`}>
                  <img
                    src={row.avatar}
                    alt=""
                    className="h-8 w-8 mr-4 rounded-full border border-gray-500"
                  />
                </Link>
                <Link
                  to={`/league/${leagueId}/player/${row.userId}`}
                  className="hover:underline"
                >
                  {row.firstName} {row.lastName}
                </Link>
              </>
              :
              <>
                <img
                  src={DefaultSubstituteAvatar}
                  alt=""
                  className="h-8 w-8 mr-4 rounded-full border border-gray-500"
                />
                {row.firstName} {row.lastName}
              </>
          }
        </div>
      ),
    },
    {
      label: "Team",
      accessor: "teamName",
      getValue: (row) =>
        row.team && (
          <div className="flex items-center">
            <Link to={`/league/${leagueId}/team/${row.teamId}`}>
              <img
                src={row.team?.logo}
                alt=""
                className="w-8 h-8 mr-2 rounded-full border border-gray-500"
              />
            </Link>
            <Link to={`/league/${leagueId}/team/${row.teamId}`} className="hover:underline">
              {row.teamName}
            </Link>
          </div>
        ),
    },
    displayJerseyNumber && {
      label: "Jersey Number",
      accessor: "jerseyNumber",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.jerseyNumber}
        </Typography>
      ),
    },
    displayPosition && {
      label: "Position",
      accessor: "position",
      condition: displayPosition,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.position}
        </Typography>
      ),
    },
    {
      label: "PTS",
      accessor: "totalPoints",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints}
        </Typography>
      ),
    },
    {
      label: "3PM",
      accessor: "totalPoints3",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints3}
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3PA",
      accessor: "attempts3",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts3}
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3P%",
      accessor: "3p%",
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
      accessor: "totalPoints2",
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
      accessor: "fg%",
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
      accessor: "totalPoints1",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints1}
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FTA",
      accessor: "attempts1",
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
      accessor: "blocks",
      condition: displayBlocks,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.blocks}
        </Typography>
      ),
    },
    displayRebounds && {
      label: "REB",
      accessor: "rebounds",
      condition: displayRebounds,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.rebounds}
        </Typography>
      ),
    },
    displayAssists && {
      label: "AST",
      accessor: "assists",
      condition: displayAssists,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.assists}
        </Typography>
      ),
    },
    displayFouls && {
      label: "PF",
      accessor: "fouls",
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
      accessor: "steals",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.steals}
        </Typography>
      ),
    },
    displayTurnovers && {
      label: "TOV",
      accessor: "turnovers",
      condition: displayTurnovers,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.turnovers}
        </Typography>
      ),
    },
    {
      label: "GP",
      accessor: "gp",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.gp}
        </Typography>
      ),
    },
    {
      label: "PPG",
      accessor: "ppg",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.ppg}
        </Typography>
      ),
    },
  ].filter(Boolean);

  const data = useMemo(() => {
    let mappedData = updatedPlayers
      .sort((a, b) => b.points - a.points)
      .map((player) => {
        const matchup = matchups.filter(
          (matchup) =>
            matchup.userId == player.userId &&
            matchup.leagueId == league.id
        );
        return {
          totalPoints: matchup.reduce((sum, item) => sum + item.points, 0),
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
          "3p%": isNaN(
            (matchup.reduce((sum, matchup) => sum + matchup.points3, 0) /
              matchup.reduce((sum, matchup) => sum + matchup.attempts3, 0)) *
            100
          )
            ? 0
            : (
              (matchup.reduce((sum, matchup) => sum + matchup.points3, 0) /
                matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts3,
                  0
                )) *
              100
            ).toFixed(2),
          "fg%": isNaN(
            (matchup.reduce((sum, matchup) => sum + matchup.points2, 0) /
              matchup.reduce((sum, matchup) => sum + matchup.attempts2, 0)) *
            100
          )
            ? 0
            : (
              (matchup.reduce((sum, matchup) => sum + matchup.points2, 0) /
                matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts2,
                  0
                )) *
              100
            ).toFixed(2),
          "ft%": isNaN(
            (matchup.reduce((sum, matchup) => sum + matchup.points1, 0) /
              matchup.reduce((sum, matchup) => sum + matchup.attempts1, 0)) *
            100
          )
            ? 0
            : (
              (matchup.reduce((sum, matchup) => sum + matchup.points1, 0) /
                matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts1,
                  0
                )) *
              100
            ).toFixed(2),
          blocks: matchup.reduce((sum, matchup) => sum + matchup.blocks, 0),
          rebounds: matchup.reduce((sum, matchup) => sum + matchup.rebounds, 0),
          assists: matchup.reduce((sum, matchup) => sum + matchup.assists, 0),
          fouls: matchup.reduce((sum, matchup) => sum + matchup.fouls, 0),
          steals: matchup.reduce((sum, matchup) => sum + matchup.steals, 0),
          turnovers: matchup.reduce(
            (sum, matchup) => sum + matchup.turnovers,
            0
          ),
          position: player.position,
          userId: player.userId,
          jerseyNumber: player.jerseyNumber,
          firstName: player.firstName,
          lastName: player.lastName,
          avatar: player.avatar,
          isSubstitute: player.isSubstitute,
          team: teams.find((team) => team.id == player.teamId),
          teamName: teams.find((team) => team.id == player.teamId)?.name,
          teamId: player.teamId,
          gp: matchup.length,
          ppg:
            matchup.length === 0
              ? 0
              : matchup.reduce((sum, item) => sum + item.points, 0) /
              matchup.length,
        };
      });

    // if (displaySubstitutes) {
    //   mappedData = mappedData.concat(
    //     substitutes
    //       .sort((a, b) => b.points - a.points)
    //       .map((sub) => {
    //         return {
    //           firstName: sub.firstName,
    //           lastName: sub.lastName,
    //           jerseyNumber: sub.jerseyNumber,
    //           position: sub.position,
    //           totalPoints: sub.totalPoints,
    //           totalPoints3: sub.totalPoints3,
    //           totalPoints2: sub.totalPoints2,
    //           totalPoints1: sub.totalPoints1,
    //           attempts3: sub.attempts3,
    //           attempts2: sub.attempts2,
    //           attempts1: sub.attempts1,
    //           "3p%":
    //             sub.match.isNew &&
    //               isNaN((sub.totalPoints3 / sub.attempts3) * 100)
    //               ? 0
    //               : ((sub.totalPoints3 / sub.attempts3) * 100).toFixed(2),
    //           "fg%":
    //             sub.match.isNew &&
    //               isNaN((sub.totalPoints2 / sub.attempts2) * 100)
    //               ? 0
    //               : ((sub.totalPoints2 / sub.attempts2) * 100).toFixed(2),
    //           "ft%":
    //             sub.match.isNew &&
    //               isNaN((sub.totalPoints1 / sub.attempts1) * 100)
    //               ? 0
    //               : ((sub.totalPoints1 / sub.attempts1) * 100).toFixed(2),
    //           blocks: sub.blocks,
    //           rebounds: sub.rebounds,
    //           assists: sub.assists,
    //           fouls: sub.fouls,
    //           steals: sub.steals,
    //           turnovers: sub.turnovers,
    //           avatar: DefaultSubstituteAvatar,
    //           team: teams.find((team) => team.id == sub.teamId),
    //           teamId: sub.teamId,
    //           teamName: teams.find((team) => team.id == sub.teamId)?.name,
    //         };
    //       })
    //   );
    // }

    return mappedData.filter((data)=>(
      data.firstName + data.lastName
    ).toLowerCase().includes(playerKeyword.toLowerCase()));
  }, [updatedPlayers, displaySubstitutes]);

  return (
    <div className="text-black dark:text-white mt-5 w-full">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default PlayerStats;
