import { Switch } from "@headlessui/react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import addIcon from "../../assets/img/dark_mode/circle-add.png";
import addedIcon from "../../assets/img/dark_mode/circle-added.png";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.svg";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";
import apis from "../../utils/apis";

const MatchupPlayerList = ({ className, player, addAction, handleAddSubstituteScore, checked }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(checked ? addedIcon : addIcon);
  const handleClick = (id) => {
    dispatch({ type: actions.CLOSE_SELECT_PLAYER_DIALOG });
    console.log("playerID", id);
    // if a player is a substitutue
    if (player.isSubstitute) {
      handleAddSubstituteScore(player)
    }
    // if a player is not a substitute
    else {
      addAction(player.id);
    }
  };

  return (
    <div className={`${className} w-full`}>
      <div
        className="flex items-center justify-between bg-[#e6e6e6] dark:bg-dark-gray w-full h-14 rounded-default py-1.5 px-4 cursor-pointer hover:opacity-80"
        onClick={() => handleClick(player)}
      >
        <div className="flex items-center text-black dark:text-white">
          <img
            src={
              player?.avatar.startsWith("avatar") ? apis.playerAvatarURL(player?.id) : player?.avatar ? player?.avatar : DefaultSubstituteAvatar
            }
            className="w-10 h-10 mr-3 rounded-full border border-gray-500"
            alt={player?.avatar}
          />
          <div className="">
            <p className="text-base underline">
              {player?.firstName} {player?.lastName}
            </p>
            {!player?.isSubstitute && (
              <div className="flex">
                <p className="text-xs">
                  {player?.email}
                </p>
              </div>
            )}
          </div>
          <p className="ml-3">{player?.jerseyNumber ? "#" + player?.jerseyNumber : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchupPlayerList;
