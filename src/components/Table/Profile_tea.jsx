import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Table from './index';

const Profile = (props) => {
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

  const matchups = useSelector((state) => state.home.matchups)
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
      return { ...matchup, match };
    });
  // const matchups = useSelector((state) => state.home.matchups).filter(
  //   (matchup) => matchup.userId == userId && matchup.leagueId == leagueId
  // );

  const columns = [
    {
      label: "Game Date",
      fixed: true,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.gameDate}
        </Typography>
      ),
    },
    {
      label: "Matchup",
      getValue: (row) => (
        <>
          <img
            src={
              teams.find((team) => team.id == row.homeTeamId)?.logo
            }
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
            <Link to={`/league/${leagueId}/team/${row?.homeTeamId}`}>
              {teams.find((team) => team.id == row?.homeTeamId)?.name}
            </Link>
          </p>
          <p className="text-font-dark-gray">VS</p>
          <img
            src={
              teams.find((team) => team.id == row?.awayTeamId)?.logo
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
            <Link to={`/league/${leagueId}/team/${row?.awayTeamId}`}>
              {teams.find((team) => team.id == row?.awayTeamId)?.name}
            </Link>
          </p>
        </>
      ),
    },
    {
      label: "Points",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints}
        </Typography>
      ),
    },
    {
      label: "3 Points",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints3}
        </Typography>
      ),
    },
    {
      label: "2 Points",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints2}
        </Typography>
      ),
    },
    {
      label: "Free throws",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints1}
        </Typography>
      ),
    },
    {
      label: "3 Attempts",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts3}
        </Typography>
      ),
    },
    {
      label: "2 Attempts",
      condition: displayAttempts2,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts2}
        </Typography>
      ),
    },
    {
      label: "FT Attempts",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts1}
        </Typography>
      ),
    },
    {
      label: "Blocks",
      condition: displayBlocks,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.blocks}
        </Typography>
      ),
    },
    {
      label: "Rebounds",
      condition: displayRebounds,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.rebounds}
        </Typography>
      ),
    },
    {
      label: "Assists",
      condition: displayAssists,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.assists}
        </Typography>
      ),
    },
    {
      label: "Fouls",
      condition: displayFouls,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.fouls}
        </Typography>
      ),
    },
    {
      label: "Steals",
      condition: displaySteals,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.steals}
        </Typography>
      ),
    },
    {
      label: "Turnovers",
      condition: displayTurnovers,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.turnovers}
        </Typography>
      ),
    },
  ];

  const data = useMemo(
    () =>
      matchups.map((matchup) => {
        return {
          gameDate: matchup.match?.date,
          homeTeamId: matchup.match?.homeTeamId,
          awayTeamId: matchup.match?.awayTeamId,
          homeTeamPoints: matchup.match.homeTeamPoints,
          awayTeamPoints: matchup.match.awayTeamPoints,

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
          playerPosition: player.position,
          userId: player.userId,
          jerseyNumber: player.jerseyNumber,
          firstName: player.firstName,
          lastName: player.lastName,
          avatar: player.avatar,
          team: teams.find((team) => team.id == player.teamId),
          teamId: player.teamId,
        };
      }),
    [matchups]
  );

  return (
    <div className="text-black dark:text-white mt-5 w-full">
      <Table data={data} columns={columns} />
    </div>
  );

  // return (
  //   <div className="text-black dark:text-white mt-4 w-ful text-xs overflow-auto">
  //     <table className="table-auto text-left w-full">
  //       <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
  //         <tr>
  //           <th
  //             key={0}
  //             className="h-button text-center font-font-dark-gray font-normal"
  //           >
  //             Game Date
  //           </th>
  //           <th
  //             key={1}
  //             className="h-button text-center font-font-dark-gray font-normal"
  //           >
  //             Matchup
  //           </th>
  //           <th
  //             key={2}
  //             className="h-button text-center font-font-dark-gray font-normal w-[40px]"
  //           >
  //             Points
  //           </th>
  //           <th
  //             key={3}
  //             className="h-button text-center font-font-dark-gray font-normal"
  //           >
  //             3 Points
  //           </th>
  //           <th
  //             key={4}
  //             className="h-button text-center font-font-dark-gray font-normal"
  //           >
  //             2 Points
  //           </th>
  //           <th
  //             key={5}
  //             className="h-button text-center font-font-dark-gray font-normal"
  //           >
  //             Free throws
  //           </th>
  //           {displayAttempts3 ? (
  //             <th
  //               key={6}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               3 Attempts
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayAttempts2 ? (
  //             <th
  //               key={7}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               2 Attempts
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayAttempts1 ? (
  //             <th
  //               key={8}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               1 Attempts
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayBlocks ? (
  //             <th
  //               key={9}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               Blocks
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayRebounds ? (
  //             <th
  //               key={10}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               Rebounds
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayAssists ? (
  //             <th
  //               key={11}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               Assists
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayFouls ? (
  //             <th
  //               key={12}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               Fouls
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displaySteals ? (
  //             <th
  //               key={13}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               Steals
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayTurnovers ? (
  //             <th
  //               key={14}
  //               className="h-button text-center font-font-dark-gray font-normal"
  //             >
  //               Turnovers
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //         </tr>
  //       </thead>
  //       <tbody className="text-center">
  //         {matchups.map((matchup, index) => {
  //           return (
  //             <tr
  //               key={index}
  //               className="odd:bg-light-dark-gray dark:odd:bg-charcoal even:bg-light-charcoal dark:even:bg-dark-gray"
  //             >
  //               <td className="">{matchup.match?.date}</td>
  //               <td className="flex items-center space-x-2 justify-center">
  //                 <img
  //                   src={
  //                     teams.find((team) => team.id == matchup.match?.homeTeamId)
  //                       ?.logo
  //                   }
  //                   alt=""
  //                   className="w-8 h-8 rounded-full"
  //                 />
  //                 <p
  //                   className={`underline ${
  //                     matchup.match.homeTeamPoints >
  //                     matchup.match.awayTeamPoints
  //                       ? "font-bold"
  //                       : ""
  //                   }`}
  //                 >
  //                   <Link
  //                     to={`/league/${leagueId}/team/${matchup.match?.homeTeamId}`}
  //                   >
  //                     {
  //                       teams.find(
  //                         (team) => team.id == matchup.match?.homeTeamId
  //                       )?.name
  //                     }
  //                   </Link>
  //                 </p>
  //                 <p className="text-font-dark-gray">VS</p>
  //                 <img
  //                   src={
  //                     teams.find((team) => team.id == matchup.match?.awayTeamId)
  //                       ?.logo
  //                   }
  //                   alt=""
  //                   className="w-8 h-8 mr-2 rounded-full"
  //                 />
  //                 <p
  //                   className={`underline ${
  //                     matchup.match.awayTeamPoints >
  //                     matchup.match.homeTeamPoints
  //                       ? "font-bold"
  //                       : ""
  //                   }`}
  //                 >
  //                   <Link
  //                     to={`/league/${leagueId}/team/${matchup.match?.awayTeamId}`}
  //                   >
  //                     {
  //                       teams.find(
  //                         (team) => team.id == matchup.match?.awayTeamId
  //                       )?.name
  //                     }
  //                   </Link>
  //                 </p>
  //               </td>
  //               <td className="">{matchup.points}</td>
  //               <td className="">{matchup.points3}</td>
  //               <td className="">{matchup.points2}</td>
  //               <td className="">{matchup.points1}</td>
  //               {displayAttempts3 ? (
  //                 <td className="">{matchup.attempts3}</td>
  //               ) : (
  //                 ""
  //               )}
  //               {displayAttempts2 ? (
  //                 <td className="">{matchup.attempts2}</td>
  //               ) : (
  //                 ""
  //               )}
  //               {displayAttempts1 ? (
  //                 <td className="">{matchup.attempts1}</td>
  //               ) : (
  //                 ""
  //               )}
  //               {displayBlocks ? <td className="">{matchup.blocks}</td> : ""}
  //               {displayRebounds ? (
  //                 <td className="">{matchup.rebounds}</td>
  //               ) : (
  //                 ""
  //               )}
  //               {displayAssists ? <td className="">{matchup.assists}</td> : ""}
  //               {displayFouls ? <td className="">{matchup.fouls}</td> : ""}
  //               {displaySteals ? <td className="">{matchup.steals}</td> : ""}
  //               {displayTurnovers ? (
  //                 <td className="">{matchup.turnovers}</td>
  //               ) : (
  //                 ""
  //               )}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default Profile;
