import { Card, Typography } from "@material-tailwind/react";
import Matchup from "../../pages/home/matchup";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Table from "./index";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.png";

const TeamPlayerStatistics = (props) => {
  const { players, matchups } = props;
  let { leagueId, teamId } = useParams();

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId
  );
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

  const teams = useSelector((state) => state.home.teams);

  const columns = [
    {
      label: "#",
      fixed: true,
    },
    {
      label: "Player",
      accessor: "firstName",
      fixed: true,
      getValue: (row) => (
        <Typography
          variant="small"
          className="font-normal flex items-center sm:pl-8 space-x-3"
        >
          <Link
            to={`/league/${leagueId}/player/${row.userId}`}
            className="flex items-center hover:underline"
          >
            <img
              src={row.avatar}
              alt=""
              className="h-8 w-8 mr-4 rounded-full"
            />
            {row.firstName} {row.lastName}
          </Link>
        </Typography>
      ),
    },
    displayJerseyNumber && {
      label: "Jersey Number",
      accessor: "jerseNumber",
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
      accessor: "attempts2",
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
      condition: displayAttempts1,
      accessor: "attempts1",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts1}
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FT%",
      accessor: "ft%",
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
      accessor: "steals",
      condition: displaySteals,
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
      label: "PPG",
      accessor: "ppg",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.ppg}
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
  ].filter(Boolean);

  const substitutes = useSelector((state) => state.home.substitutes).filter(
    (sub) => sub.leagueId == leagueId && sub.teamId == teamId
  );

  const data = useMemo(
    () =>
      players
        .map(
          (
            { id, userId, avatar, firstName, lastName, jerseyNumber, position },
            index
          ) => {
            console.log(matches[0]?.isNew, matchups[0]?.attendance);
            // const playerMatchups = matchups.filter(
            //   (matchup) => matchup.playerId === id && matchup.attendance === 1
            // );
            const playerMatchups = matchups.filter((matchup) => {
              const match = matches.find((m) => m.id == matchup.matchId);
              return (
                matchup.playerId === id &&
                matchup.attendance === 1 &&
                match &&
                !match.isNew
              );
            });
            return {
              userId: userId,
              avatar: avatar,
              firstName: firstName,
              lastName: lastName,
              jerseyNumber: jerseyNumber,
              position: position,
              totalPoints: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.points,
                0
              ),
              totalPoints3: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.points3,
                0
              ),
              totalPoints2: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.points2,
                0
              ),
              totalPoints1: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.points1,
                0
              ),
              attempts3: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.attempts3,
                0
              ),
              attempts2: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.attempts2,
                0
              ),
              attempts1: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.attempts1,
                0
              ),
              blocks: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.blocks,
                0
              ),
              rebounds: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.rebounds,
                0
              ),
              assists: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.assists,
                0
              ),
              fouls: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.fouls,
                0
              ),
              steals: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.steals,
                0
              ),
              turnovers: playerMatchups.reduce(
                (sum, matchup) => sum + matchup.turnovers,
                0
              ),

              gp: playerMatchups.length,

              ppg:
                playerMatchups.length === 0
                  ? 0
                  : playerMatchups.reduce(
                      (sum, matchup) => sum + matchup.points,
                      0
                    ) / playerMatchups.length,
            };
          }
        )
        .concat(
          substitutes
            .sort((a, b) => b.points - a.points)
            .map((sub) => {
              return {
                firstName: sub.match.isNew ? 0 : sub.firstName,
                lastName: sub.match.isNew ? 0 : sub.lastName,
                jerseyNumber: sub.jerseyNumber,
                position: sub.position,
                totalPoints: sub.match.isNew ? 0 : sub.totalPoints,
                totalPoints3: sub.match.isNew ? 0 : sub.totalPoints3,
                totalPoints2: sub.match.isNew ? 0 : sub.totalPoints2,
                totalPoints1: sub.match.isNew ? 0 : sub.totalPoints1,
                attempts3: sub.match.isNew ? 0 : sub.attempts3,
                attempts2: sub.match.isNew ? 0 : sub.attempts2,
                attempts1: sub.match.isNew ? 0 : sub.attempts1,
                "3p%":
                  sub.match.isNew &&
                  isNaN((sub.totalPoints3 / sub.attempts3) * 100)
                    ? 0
                    : ((sub.totalPoints3 / sub.attempts3) * 100).toFixed(2),
                "fg%":
                  sub.match.isNew &&
                  isNaN((sub.totalPoints2 / sub.attempts2) * 100)
                    ? 0
                    : ((sub.totalPoints2 / sub.attempts2) * 100).toFixed(2),
                "ft%":
                  sub.match.isNew &&
                  isNaN((sub.totalPoints1 / sub.attempts1) * 100)
                    ? 0
                    : ((sub.totalPoints1 / sub.attempts1) * 100).toFixed(2),
                blocks: sub.match.isNew ? 0 : sub.blocks,
                rebounds: sub.match.isNew ? 0 : sub.rebounds,
                assists: sub.match.isNew ? 0 : sub.assists,
                fouls: sub.match.isNew ? 0 : sub.fouls,
                steals: sub.match.isNew ? 0 : sub.steals,
                turnovers: sub.match.isNew ? 0 : sub.turnovers,
                avatar: DefaultSubstituteAvatar,
                team: teams.find((team) => team.id == sub.teamId),
                teamId: sub.teamId,
                teamName: teams.find((team) => team.id == sub.teamId)?.name,
              };
            })
        ),
    [players, substitutes]
  );

  return (
    <div className="text-black dark:text-white w-full">
      <Table data={data} columns={columns} />
    </div>
  );
  // return (
  //   <div className="text-black dark:text-white h-full w-full mt-4">
  //     <table className="table-auto text-left w-full">
  //       <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
  //         <tr>
  //           <th
  //             key={1}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             Position
  //           </th>
  //           <th
  //             key={2}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             Player
  //           </th>
  //           <th
  //             key={3}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             Jersey Number
  //           </th>
  //           <th
  //             key={4}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             Points
  //           </th>
  //           <th
  //             key={5}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             3 Points
  //           </th>
  //           <th
  //             key={6}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             2 Points
  //           </th>
  //           <th
  //             key={7}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             Free throws
  //           </th>
  //           {displayAttempts3 ? (
  //             <th
  //               key={8}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               3 Attempts
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayAttempts2 ? (
  //             <th
  //               key={9}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               2 Attempts
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayAttempts1 ? (
  //             <th
  //               key={10}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               1 Attempts
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayBlocks ? (
  //             <th
  //               key={11}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               Blocks
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayRebounds ? (
  //             <th
  //               key={12}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               Rebounds
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayAssists ? (
  //             <th
  //               key={13}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               Assists
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayFouls ? (
  //             <th
  //               key={14}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               Fouls
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displaySteals ? (
  //             <th
  //               key={15}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               Steals
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           {displayTurnovers ? (
  //             <th
  //               key={16}
  //               className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //             >
  //               Turnovers
  //             </th>
  //           ) : (
  //             ""
  //           )}
  //           <th
  //             key={17}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             PPG
  //           </th>
  //           <th
  //             key={18}
  //             className="h-button text-center font-font-dark-gray font-normal  text-sm"
  //           >
  //             Games Played
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody className="text-center">
  //         {players.map(
  //           (
  //             {
  //               id,
  //               userId,
  //               avatar,
  //               firstName,
  //               lastName,
  //               jerseyNumber,
  //               position,
  //             },
  //             index
  //           ) => {
  //             console.log(matches[0]?.isNew, matchups[0]?.attendance);
  //             // const playerMatchups = matchups.filter(
  //             //   (matchup) => matchup.playerId === id && matchup.attendance === 1
  //             // );
  //             const playerMatchups = matchups.filter((matchup) => {
  //               const match = matches.find((m) => m.id == matchup.matchId);
  //               return (
  //                 matchup.playerId === id &&
  //                 matchup.attendance === 1 &&
  //                 match &&
  //                 !match.isNew
  //               );
  //             });

  //             const totalPoints = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points,
  //               0
  //             );
  //             const totalPoints3 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points3,
  //               0
  //             );
  //             const totalPoints2 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points2,
  //               0
  //             );
  //             const totalPoints1 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points1,
  //               0
  //             );
  //             const attempts3 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.attempts3,
  //               0
  //             );
  //             const attempts2 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.attempts2,
  //               0
  //             );
  //             const attempts1 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.attempts1,
  //               0
  //             );
  //             const blocks = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.blocks,
  //               0
  //             );
  //             const rebounds = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.rebounds,
  //               0
  //             );
  //             const assists = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.assists,
  //               0
  //             );
  //             const fouls = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.fouls,
  //               0
  //             );
  //             const steals = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.steals,
  //               0
  //             );
  //             const turnovers = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.turnovers,
  //               0
  //             );

  //             const gp = playerMatchups.length;

  //             const ppg = gp === 0 ? 0 : totalPoints / gp;

  //             return (
  //               <tr
  //                 key={index}
  //                 className="odd:bg-light-dark-gray dark:odd:bg-charcoal even:bg-light-charcoal dark:even:bg-dark-gray"
  //               >
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {index + 1}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal flex items-center underline"
  //                   >
  //                     <img
  //                       src={avatar}
  //                       alt=""
  //                       className="mr-3 w-8 h-8 rounded-full border border-gray-500"
  //                     />
  //                     <Link to={`/league/${leagueId}/player/${userId}`}>
  //                       {firstName} {lastName}
  //                     </Link>
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {jerseyNumber}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints3}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints2}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints1}
  //                   </Typography>
  //                 </td>
  //                 {displayAttempts3 ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {attempts3}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayAttempts2 ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {attempts2}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayAttempts1 ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {attempts1}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayBlocks ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {blocks}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayRebounds ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {rebounds}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayAssists ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {assists}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayFouls ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {fouls}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displaySteals ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {steals}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 {displayTurnovers ? (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {turnovers}
  //                     </Typography>
  //                   </td>
  //                 ) : (
  //                   ""
  //                 )}
  //                 <td>
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {ppg}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {gp}
  //                   </Typography>
  //                 </td>
  //               </tr>
  //             );
  //           }
  //         )}
  //       </tbody>
  //       {/* <tbody className="text-center">
  //         {players.map(
  //           (
  //             { id, userId, avatar, firstName, lastName, jerseyNumber, position },
  //             index
  //           ) => {
  //             console.log(matches[0].isNew, matchups[0].attendance)
  //             const playerMatchups = matchups.filter(
  //               (matchup) => matchup.playerId === id && matchup.attendance === 1
  //             );
  //             console.log(playerMatchups)

  //             const totalPoints = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points,
  //               0
  //             );
  //             const totalPoints3 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points3,
  //               0
  //             );
  //             const totalPoints2 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points2,
  //               0
  //             );
  //             const totalPoints1 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.points1,
  //               0
  //             );
  //             const attempts3 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.attempts3,
  //               0
  //             );
  //             const attempts2 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.attempts2,
  //               0
  //             );
  //             const attempts1 = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.attempts1,
  //               0
  //             );
  //             const blocks = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.blocks,
  //               0
  //             );
  //             const rebounds = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.rebounds,
  //               0
  //             );
  //             const assists = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.assists,
  //               0
  //             );
  //             const fouls = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.fouls,
  //               0
  //             );
  //             const steals = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.steals,
  //               0
  //             );
  //             const turnovers = playerMatchups.reduce(
  //               (sum, matchup) => sum + matchup.turnovers,
  //               0
  //             );

  //             const gp = playerMatchups.length;

  //             const ppg = gp === 0 ? 0 : totalPoints / gp;

  //             return (
  //               <tr
  //                 key={index}
  //                 className="odd:bg-light-dark-gray dark:odd:bg-charcoal even:bg-light-charcoal dark:even:bg-dark-gray"
  //               >
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {index + 1}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal flex items-center underline"
  //                   >
  //                     <img
  //                       src={avatar}
  //                       alt=""
  //                       className="mr-3 w-8 h-8 rounded-full border border-gray-500"
  //                     />
  //                     <Link to={`/league/${leagueId}/player/${userId}`}>
  //                       {firstName} {lastName}
  //                     </Link>
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {jerseyNumber}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints3}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints2}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {totalPoints1}
  //                   </Typography>
  //                 </td>
  //                 {
  //                   displayAttempts3?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {attempts3}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayAttempts2?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {attempts2}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayAttempts1?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {attempts1}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayBlocks?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {blocks}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayRebounds?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {rebounds}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayAssists?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {assists}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayFouls?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {fouls}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displaySteals?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {steals}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 {
  //                   displayTurnovers?
  //                   (
  //                   <td className="">
  //                     <Typography
  //                       variant="small"
  //                       color="blue-gray"
  //                       className="font-normal"
  //                     >
  //                       {turnovers}
  //                     </Typography>
  //                   </td>
  //                   ):""
  //                 }
  //                 <td>
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {ppg}
  //                   </Typography>
  //                 </td>
  //                 <td className="">
  //                   <Typography
  //                     variant="small"
  //                     color="blue-gray"
  //                     className="font-normal"
  //                   >
  //                     {gp}
  //                   </Typography>
  //                 </td>
  //               </tr>
  //             );
  //           }
  //         )}
  //       </tbody> */}
  //     </table>
  //   </div>
  // );
};

export default TeamPlayerStatistics;
