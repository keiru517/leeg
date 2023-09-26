import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Player = (props) => {
  // const { teams } = props;
  const { players } = props;
  const columns = ["Player", "Jersery Number", "Points", "Team"];
  const teams = useSelector((state) => state.home.teams);
  const matchups = useSelector((state) => state.home.matchups);

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
            players
              .filter((player) => player.teamId !== 0)
              .map((player, idx) => (
                <tr
                  key={idx}
                  className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal h-[53px]"
                >
                  <td className="w-1/4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex items-center underline justify-between px-10"
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
                  <td className="w-1/4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {player?.jerseyNumber}
                    </Typography>
                  </td>
                  <td className="w-1/4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {
                        matchups.filter(
                          (matchup) => matchup.playerId == player?.id
                        ).reduce((accumulator, currentMatchup) => accumulator + currentMatchup.points, 0)
                      }
                    </Typography>
                  </td>
                  <td className="w-1/5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex items-center underline justify-between px-10"
                    >
                      <img
                        src={
                          teams.find((team) => team.id == player.teamId)?.logo
                        }
                        alt=""
                        className="w-8 h-8 mr-2 rounded-default"
                      />
                      <Link to={`team/${player.teamId}`}>
                        {teams.find((team) => team.id == player.teamId)?.name}
                      </Link>
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
              ))
            // )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Player;
