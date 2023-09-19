import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TeamTable = (props) => {
  const { data } = props;
  const { leagueId, teamId } = useParams();

  return (
    <div className="text-white h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky">
          <tr>
            <th
              key="1"
              className="h-button bg-slate text-center font-font-dark-gray w-1/2"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Player
              </Typography>
            </th>
            <th
              key="2"
              className="h-button bg-slate text-center font-font-dark-gray w-1/2"
            >
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
                <div className="flex items-center justify-between px-8">
                  <img src={player.avatar} alt="" className="w-8 h-8 mr-2 rounded-default" />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal underline"
                  >
                    <Link to={`/league/${leagueId}/player/${player.id}`}>
                      {player.firstName} {player.lastName}
                    </Link>
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
