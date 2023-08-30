import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import teamLogo from "../../assets/img/dark_mode/team-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Player = (props) => {
  const { teams} = props;
  const columns = ["Team", "Player", "Jersey number"];

  const players = useSelector(state=>state.home.players).filter(player=>player.role == 2);
  
  return (
    <div className="text-white mt-5 w-full">
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
            players.map((player, idx) => (
              <tr key={idx} className="odd:bg-dark-gray even:bg-charcoal h-[53px]">
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center underline"
                  >
                    <img src={teams.find(team=>team.id==player.teamId).logo} alt="" className="w-8 h-8 mr-2" />
                    {
                      teams.find(team=>team.id==player.teamId).name
                    }
                    {/* {name} */}
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center underline"
                  >
                    <img src={player.avatar} alt="" className="h-8 w-8 mr-2" />
                    <Link to={`player/${player.id}`}>{player.name}</Link>
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
                </td>
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
