import { Card, Typography } from "@material-tailwind/react";
import actionIcon from "../../assets/img/dark_mode/action.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Option from "../Option";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import apis from "../../utils/apis";
import Input from "../Input";
import JerseyNumberModal from "../Modal/JerseyNumberModal";
import { useState } from "react";

const TeamTable = (props) => {
  const { data } = props;
  const { leagueId, teamId } = useParams();

  const dispatch = useDispatch();

  const options = [
    { id: 0, name: "Edit" },
    { id: 1, name: "Delete" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [playerId, setPlayerId] = useState("");
  const handleOption = (idx, playerId, event) => {
    // event.preventDefault();

    if (idx === 0) {
      setIsOpen(true);
      setPlayerId(playerId);
    } else if (idx === 1) {
      axios
        .post(apis.removePlayer, { id: playerId })
        .then((res) => {
          actions.getPlayers(dispatch);
        })
        .catch((error) => {
          alert(error.message);
        });
      // alert("Match has been deleted")
    }
  };

  return (
    <div className="text-black dark:text-white h-full w-full">
      <table className="w-full table-auto text-left">
        <thead className="sticky">
          <tr>
            <th
              key="1"
              className="h-button bg-slate text-center font-font-dark-gray w-1/3"
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
              className="h-button bg-slate text-center font-font-dark-gray w-1/3"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Jersey Number
              </Typography>
            </th>
            <th
              key="3"
              className="h-button bg-slate text-center font-font-dark-gray w-1/3"
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
            <tr key={idx} className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal">
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
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {player.jerseyNumber}
                </Typography>
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
      <JerseyNumberModal
        playerId={playerId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default TeamTable;
