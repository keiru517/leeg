import { Card, Typography } from "@material-tailwind/react";
import actionIcon from '../../assets/img/action.png';


const StandingsTable = (props) => {
  const { players } = props;

  return (
    <div className="text-white h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
              <th key='1' className="h-[53px] text-center font-table-border w-1/2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Player
                </Typography>
              </th>
              <th key='2' className="h-[53px] text-center font-table-border w-1/2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {players.map((player, index) => (
            <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
              <td className="">
                <div className="flex items-center">

                  <img src={player.avatar} alt="" className="w-8 h-8 mr-2" />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {player.name}
                  </Typography>
                </div>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <img src={actionIcon} alt="" />
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
