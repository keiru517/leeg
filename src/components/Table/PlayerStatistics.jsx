import { Card, Typography } from "@material-tailwind/react";
import Matchup from "../../pages/home/matchup";
import { Link, useParams } from "react-router-dom";

const PlayerStatistics = (props) => {
  const { players, matchups } = props;
  let {leagueId} = useParams();
  const columns = [
    "Position",
    "Player",
    "Jersey Number",
    "Points",
    "PPG",
    "Games Played",
  ];

  return (
    <div className="text-white h-full w-full mt-4">
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
          {players.map(({ id,userId, avatar, firstName, lastName, jerseyNumber }, index) => {
            const playerMatchups = matchups.filter(
              (matchup) => matchup.playerId === id
            );
            
            const totalPoints = playerMatchups.reduce(
              (sum, matchup) => sum + matchup.points,
              0
              );
              const gp = playerMatchups.length;
              const ppg = totalPoints/gp;
              
            return (
              <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
                <td className="w-1/6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="w-1/6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center underline"
                  >
                    <img src={avatar} alt="" className="mr-3 w-8 h-8 rounded-default" />
                    <Link to={`/league/${leagueId}/player/${userId}`}>
                      {firstName} {lastName}
                    </Link>
                  </Typography>
                </td>
                <td className="w-1/6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {jerseyNumber}
                  </Typography>
                </td>
                <td className="w-1/6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {totalPoints}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {ppg}
                  </Typography>
                </td>
                <td className="w-1/6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {gp}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatistics;
