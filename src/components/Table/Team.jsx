import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";

const TeamTable = (props) => {
  const { data } = props;

  return (
    <div className="text-white h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky">
          <tr>
              <th key='1' className="h-button bg-slate text-center font-font-dark-gray w-1/2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Player
                </Typography>
              </th>
              <th key='2' className="h-button bg-slate text-center font-font-dark-gray w-1/2">
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
          {/* <tr>
            <td className="w-1/2 bg-slate text-left text-font-dark-gray text-sm">
              Player
            </td>
            <td className="w-1/2 bg-slate text-left text-font-dark-gray text-sm">
              Action
            </td>
          </tr> */}
          {data.map((player, index) => (
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
                <img src={actionIcon} alt="" className="mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
