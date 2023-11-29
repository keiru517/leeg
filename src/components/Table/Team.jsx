import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Option from "../Option";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import apis from "../../utils/apis";
import EditPlayerModal from "../Modal/EditPlayerModal";
import { useState } from "react";

const TeamTable = (props) => {
  const { data } = props;
  const { leagueId, teamId } = useParams();

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

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
        .post(apis.removePlayerFromTeam, { id: playerId })
        .then((res) => {
          actions.getPlayers(dispatch);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
      // alert("Match has been deleted")
    }
  };

  return (
    <div className="text-black dark:text-white h-full w-full">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            <th
              key="1"
              className="h-button bg-light-charcoal dark:bg-slate text-center w-1/3 rounded-none"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none"
              >
                Player
              </Typography>
            </th>
            <th
              key="2"
              className="h-button bg-light-charcoal dark:bg-slate text-center w-1/3"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none"
              >
                Jersey Number
              </Typography>
            </th>
            {league?.displayPosition ? (
              <th
                key="3"
                className="h-button bg-light-charcoal dark:bg-slate text-center w-1/3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  Position
                </Typography>
              </th>
            ) : (
              ""
            )}
            <th
              key="4"
              className="h-button bg-light-charcoal dark:bg-slate text-center w-1/3"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none"
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((player, idx) => (
            <tr
              key={idx}
              className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
            >
              <td className="">
                <Link to={`/league/${leagueId}/player/${player.userId}`}>
                  <div className="flex items-center px-3">
                    <img
                      src={player.avatar}
                      alt=""
                      className="w-8 h-8 mr-2 rounded-full border border-gray-500 dark:border-gray-100"
                    />
                      <span className="font-normal underline">{player.firstName} {player.lastName}</span>
                  </div>
                </Link>
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

              {league?.displayPosition && (
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {player.position}
                  </Typography>
                </td>
              )}

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
      <EditPlayerModal
        playerId={playerId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default TeamTable;
