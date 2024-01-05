import { Switch } from "@headlessui/react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import addIcon from "../../assets/img/dark_mode/circle-add.png";
import addedIcon from "../../assets/img/dark_mode/circle-added.png";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const EventPlayerList = ({
  className,
  player,
  playerId,
  setPlayerId,
  setTeamId,
  setIsDirect,
}) => {
  const [itemOnechecked, setItemOneChecked] = useState(false);
  const [itemTwochecked, setItemTwoChecked] = useState(false);
  const [itemThreechecked, setItemThreeChecked] = useState(false);
  const [itemFourchecked, setItemFourChecked] = useState(true);

  const dispatch = useDispatch();

  const logId = useSelector((state) => state.home.event_dialog.logId);

  const log = useSelector((state) => state.home.logs).find(
    (log) => log.id == logId
  );
  // const [isDirectEvent, setIsDirectEvent] = useState();
  const [isDirectEvent, setIsDirectEvent] = useState(log?.isDirect);

  const handleClick = (playerId, teamId) => {
    dispatch({ type: actions.CLOSE_SELECT_PLAYER_DIALOG });
    setPlayerId(playerId);
    setTeamId(teamId);
    setIsDirectEvent(!isDirectEvent? true : false);
    setIsDirect(!isDirectEvent? true : false);
  };

  return (
    <div className={`${className} w-full`}>
      <div
        className={`flex items-center justify-between ${
          playerId == player.id && !isDirectEvent
            ? "bg-success"
            : "bg-[#e6e6e6] dark:bg-dark-gray"
        }  w-full h-10 sm:h-14 rounded-default py-1.5 px-4 cursor-pointer hover:opacity-75`}
        onClick={() => handleClick(player?.id, player?.teamId)}
      >
        <div className="flex">
          <img
            src={player?.avatar}
            className="w-8 h-8 sm:w-10 sm:h-10 mr-3 rounded-full border border-gray-500"
            alt=""
          />
          <div>
            <p className="text-black dark:text-white text-sm sm:text-base underline">
              {player?.firstName} {player?.lastName}
            </p>
            <div className="flex">
              <p className="text-black dark:text-white text-xs font-dark-gray">
                {player?.email}
              </p>
              <p className="text-black dark:text-white text-xs font-dark-gray">
                {player?.date}
              </p>
            </div>
          </div>
        </div>
        {/* <img
          src={status}
          alt=""
          className="cursor-pointer"
          onClick={() => handleClick(player?.id)}
        /> */}
      </div>
    </div>
  );
};

export default EventPlayerList;
