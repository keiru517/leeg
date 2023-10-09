import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Player = (props) => {
  // const { teams } = props;
  const { players, league } = props;
  console.log("players", players);
  const matchups = useSelector((state) => state.home.matchups);

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
        console.log("substitute",player.id, player.isSubstitute)
        acc[player.userId].teamId =player.isDeleted? 0 : player.teamId;
        // overwrite the isDeleted if there is a player who is not deleted
        acc[player.userId].isDeleted = player.isDeleted ? 1 : player.isDeleted;
      } else {
        // If player doesn't exist, create a new entry
        acc[player.userId] = { ...player, points: points };
      }
      return acc;
    }, {})
  );

  console.log(updatedPlayers);

  // const players = useSelector(state=>state.home.players);
  const columns = league?.displayPosition
    ? ["Player", "Jersery Number", "Position", "Points", "Team"]
    : ["Player", "Jersery Number", "Points", "Team"];
  const teams = useSelector((state) => state.home.teams);

  // const players = useSelector((state) => state.home.players).filter(
  //   (player) => player.teamId !== 0 // Filter players who are added to the team
  // );

  return (
    <div className="text-black dark:text-white mt-5 w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
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
                const points = matchup.reduce(
                  (sum, item) => sum + item.points,
                  0
                );
                const team = teams.find((team) => team.id == player.teamId );
                console.log("team:", team);
                return (
                  <tr
                    key={idx}
                    className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal h-[53px]"
                  >
                    <td className="w-1/5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal flex items-center underline px-3"
                      >
                        <img
                          src={player.avatar}
                          alt=""
                          className="h-8 w-8 mr-2 rounded-default"
                        />
                        <Link to={`player/${player.userId}`}>
                          {player.firstName} {player.lastName}
                        </Link>
                      </Typography>
                    </td>
                    <td className="w-1/5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {player?.jerseyNumber}
                      </Typography>
                    </td>
                    {league?.displayPosition && (
                      <td className="w-1/5">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {player?.position}
                        </Typography>
                      </td>
                    )}
                    <td className="w-1/5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {points}
                      </Typography>
                    </td>
                    <td className="w-1/5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal flex items-center underline justify-between px-10"
                      >
                        {team ? (
                          <>
                            <img
                              src={team.logo}
                              alt=""
                              className="w-8 h-8 mr-2 rounded-default"
                            />
                            <Link to={`team/${player.teamId}`}>
                              {team.name}
                            </Link>
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>
                    </td>
                    {/* <td className="w-1/5"> 
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex items-center justify-center"
                    >
                      {player.country}
                    </Typography>
                  </td>
                  <td className="w-1/5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {player.jerseyNumber}
                    </Typography>
                  </td> */}
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
