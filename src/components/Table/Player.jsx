import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Player = (props) => {
  // const { teams } = props;
  const { players, league } = props;
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

  // const updatedPlayers = players.map(player=>{
  //   const points = calculatePoints(player.userId)
  //   return {...player, points}
  // })

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

  // const players = useSelector((state) => state.home.players).filter(
  //   (player) => player.teamId !== 0 // Filter players who are added to the team
  // );

  return (
    <div className="text-black dark:text-white mt-5 w-full text-xs">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            <th key={1} className="h-button text-center font-font-dark-gray font-normal">
                Player
            </th>
            <th key={2} className="h-button text-center font-font-dark-gray font-normal">
                Jersey Number
            </th>
            <th key={3} className="h-button text-center font-font-dark-gray font-normal">
                Team
            </th>
            {displayPosition && (
              <th
                key={4}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Position
              </th>
            )}
            <th key={5} className="h-button text-center font-font-dark-gray font-normal">
                Points
            </th>
            <th key={6} className="h-button text-center font-font-dark-gray font-normal">
                3 Points
            </th>
            <th key={7} className="h-button text-center font-font-dark-gray font-normal">
                2 Points
            </th>
            <th key={8} className="h-button text-center font-font-dark-gray font-normal">
                Free throws
            </th>
            {displayAttempts3 ? (
              <th
                key={9}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                3 Attempts
              </th>
            ) : (
              ""
            )}
            {displayAttempts2 ? (
              <th
                key={10}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                2 Attempts
              </th>
            ) : (
              ""
            )}
            {displayAttempts1 ? (
              <th
                key={11}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                FT Attempts
              </th>
            ) : (
              ""
            )}
            {displayBlocks ? (
              <th
                key={12}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Blocks
              </th>
            ) : (
              ""
            )}
            {displayRebounds ? (
              <th
                key={13}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Rebounds
              </th>
            ) : (
              ""
            )}
            {displayAssists ? (
              <th
                key={14}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Assists
              </th>
            ) : (
              ""
            )}
            {displayFouls ? (
              <th
                key={15}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Fouls
              </th>
            ) : (
              ""
            )}
            {displaySteals ? (
              <th
                key={16}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Steals
              </th>
            ) : (
              ""
            )}
            {displayTurnovers ? (
              <th
                key={17}
                className="h-button text-center font-font-dark-gray font-normal"
              >
                Turnovers
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {
            // teams.map(({ logo, name}, index) =>
            updatedPlayers
              .sort((a, b) => b.points - a.points)
              // .filter((player) => player.teamId !== 0)
              .map((player, idx) => {
                const matchup = matchups.filter(
                  (matchup) =>
                    matchup.userId == player.userId &&
                    matchup.leagueId == league.id
                );
                const totalPoints = matchup.reduce(
                  (sum, item) => sum + item.points,
                  0
                );
                const totalPoints3 = matchup.reduce(
                  (sum, matchup) => sum + matchup.points3,
                  0
                );
                const totalPoints2 = matchup.reduce(
                  (sum, matchup) => sum + matchup.points2,
                  0
                );
                const totalPoints1 = matchup.reduce(
                  (sum, matchup) => sum + matchup.points1,
                  0
                );
                const attempts3 = matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts3,
                  0
                );
                const attempts2 = matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts2,
                  0
                );
                const attempts1 = matchup.reduce(
                  (sum, matchup) => sum + matchup.attempts1,
                  0
                );
                const blocks = matchup.reduce(
                  (sum, matchup) => sum + matchup.blocks,
                  0
                );
                const rebounds = matchup.reduce(
                  (sum, matchup) => sum + matchup.rebounds,
                  0
                );
                const assists = matchup.reduce(
                  (sum, matchup) => sum + matchup.assists,
                  0
                );
                const fouls = matchup.reduce(
                  (sum, matchup) => sum + matchup.fouls,
                  0
                );
                const steals = matchup.reduce(
                  (sum, matchup) => sum + matchup.steals,
                  0
                );
                const turnovers = matchup.reduce(
                  (sum, matchup) => sum + matchup.turnovers,
                  0
                );

                const team = teams.find((team) => team.id == player.teamId);
                console.log("team:", team);
                return (
                  <tr
                    key={idx}
                    className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal h-[53px]"
                  >
                    <td className="">
                      <Link to={`player/${player.userId}`}>
                        <div className="flex items-center px-3">
                          <img
                            src={player.avatar}
                            alt=""
                            className="w-8 h-8 mr-2 rounded-full border border-gray-500 dark:border-gray-100"
                          />
                          <span className="font-normal underline">
                            {player.firstName} {player.lastName}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="">
                        {player?.jerseyNumber}
                    </td>
                    <td className="">
                        {team ? (
                          <div className="flex items-center underline">
                            <img
                              src={team.logo}
                              alt=""
                              className="w-8 h-8 rounded-full border border-gray-500"
                            />
                            <Link to={`team/${player.teamId}`} className="truncate w-24">
                              {team.name}
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                    </td>
                    {displayPosition && (
                      <td className="">
                          {player?.position}
                      </td>
                    )}
                    <td className="">
                        {totalPoints}
                    </td>
                    <td className="">
                        {totalPoints3}
                    </td>
                    <td className="">
                        {totalPoints2}
                    </td>
                    <td className="">
                        {totalPoints1}
                    </td>
                    {displayAttempts3 ? (
                      <td className="">
                          {attempts3}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayAttempts2 ? (
                      <td className="">
                          {attempts2}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayAttempts1 ? (
                      <td className="">
                          {attempts1}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayBlocks ? (
                      <td className="">
                          {blocks}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayRebounds ? (
                      <td className="">
                          {rebounds}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayAssists ? (
                      <td className="">
                          {assists}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayFouls ? (
                      <td className="">
                          {fouls}
                      </td>
                    ) : (
                      ""
                    )}
                    {displaySteals ? (
                      <td className="">
                          {steals}
                      </td>
                    ) : (
                      ""
                    )}
                    {displayTurnovers ? (
                      <td className="">
                          {turnovers}
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Player;
