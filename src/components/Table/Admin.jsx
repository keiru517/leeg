import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useSelector } from "react-redux";

const AdminTable = (props) => {
  const admins = useSelector(state=>state.home.admins);
  const players = useSelector(state=>state.home.players);

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
                  Admin
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
          {admins.map((admin, index) => (
            <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
              <td className="w-4/5">
                <div className="flex items-center">
                  <img src={players.find(player=> player.id == admin.player_id).avatar} alt="" className="w-8 h-8 mr-2" />
                  {/* <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  > */}
                    {
                      players.find(player=> player.id == admin.player_id).name
                    }
                  {/* </Typography> */}
                </div>
              </td>
              <td className="w-1/5">
                <img src={actionIcon} alt="" className="mx-auto cursor-pointer hover:opacity-70" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
