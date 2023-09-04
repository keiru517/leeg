import { Card, Typography } from "@material-tailwind/react";
import actionIcon from '../../assets/img/dark_mode/action.png';
import avatar from '../../assets/img/dark_mode/player.png';

const PlayerStatistics = (props) => {
  const {players } = props;
  
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
              <th key={idx} className="h-button text-center font-font-dark-gray">
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
          {players.map(({ position, name, jerseyNumber, points, ppg, gp }, index) => (
            <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
              <td className="w-1/6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {index+1}
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex items-center"
                >
                <img src={avatar} alt="" className="mr-3 w-8 h-8"/>
                  {name}
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
                  points
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  PPG
                </Typography>
              </td>
              <td className="w-1/6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Games Played
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatistics;
