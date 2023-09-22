import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Option from "../Option";

const TeamTable = (props) => {
  const { data } = props;
  const { leagueId, teamId } = useParams();

  const options = [
    { id: 0, name: "Edit" },
    { id: 1, name: "Delete" },
  ];

  const handleOption = (idx, playerId, event) => {
    // event.preventDefault();

    if (idx === 0) {
      alert(`edit: ${playerId}`);
      // navigate(`matchup/${matchId}`)
    } else if (idx === 1) {
      // alert("Match has been deleted")
      alert(`delete: ${playerId}`);
    }
  };

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
          {data.map((player, idx) => (
            <tr key={idx} className="even:bg-dark-gray odd:bg-charcoal">
              <td className="">
                <div className="flex items-center justify-between px-8">
                  <img
                    src={player.avatar}
                    alt=""
                    className="w-8 h-8 mr-2 rounded-default"
                  />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal underline"
                  >
                    <Link to={`/league/${leagueId}/player/${player.userId}`}>
                      {player.firstName} {player.lastName}
                    </Link>
                  </Typography>
                </div>
              </td>
              <td>
                <Option
                  options={options}
                  handleClick={(idx, event) =>
                    handleOption(idx, player.id, event)
                  }
                ></Option>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
