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
  const dispatch = useDispatch();

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const user = useSelector((state) => state.home.user);

  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league?.id && admin.isDeleted !== 1
  );

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league?.userId == user?.id;

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
    }
  };

  return (
    <div className="text-black dark:text-white h-full w-full overflow-auto">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            <th
              key="1"
              className="h-button bg-light-charcoal dark:bg-slate text-center rounded-none "
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none"
              >
                Player
              </Typography>
            </th>
            {league?.displayJerseyNumber && (
              <th
                key="2"
                className="h-button bg-light-charcoal dark:bg-slate text-center "
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  Jersey Number
                </Typography>
              </th>
            )}
            {league?.displayPosition && (
              <th
                key="3"
                className="h-button bg-light-charcoal dark:bg-slate text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  Position
                </Typography>
              </th>
            )}
            {isAdmin && (
              <th
                key="4"
                className="h-button bg-light-charcoal dark:bg-slate text-center "
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  Action
                </Typography>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((player, idx) => (
            <tr
              key={idx}
              className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
            >
              <td className="">
                <div className="flex items-center px-3">
                  <Link to={`/league/${leagueId}/player/${player.userId}`}>
                    <img
                      src={player.avatar}
                      alt=""
                      className="w-8 h-8 mr-2 rounded-full border border-gray-500 dark:border-gray-100"
                    />
                  </Link>
                  <Link to={`/league/${leagueId}/player/${player.userId}`}>
                    <span className="font-normal hover:underline">
                      {player.firstName} {player.lastName}
                    </span>
                  </Link>
                </div>
              </td>
              {league?.displayJerseyNumber && (
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {player.jerseyNumber}
                  </Typography>
                </td>
              )}

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
              {isAdmin && (
                <td>
                  <Option
                    className="mx-auto"
                    options={options}
                    handleClick={(idx, event) =>
                      handleOption(idx, player.id, event)
                    }
                  ></Option>
                </td>
              )}
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
