import { Switch } from "@headlessui/react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import addIcon from '../../assets/img/dark_mode/circle-add.png';
import addedIcon from '../../assets/img/dark_mode/circle-added.png';
import * as actions from '../../actions';
import { useDispatch } from "react-redux";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.svg";

const PlayerList = ({ className, player, setChecked, checked }) => {
  const [itemOnechecked, setItemOneChecked] = useState(false);
  const [itemTwochecked, setItemTwoChecked] = useState(false);
  const [itemThreechecked, setItemThreeChecked] = useState(false);
  const [itemFourchecked, setItemFourChecked] = useState(true);

  const dispatch = useDispatch();

  const [status, setStatus] = useState(checked ? addedIcon : addIcon)
  const handleClick = (id) => {
    if (status == addedIcon) {
      setChecked(false);
      setStatus(addIcon)
      // dispatch({type:actions.REMOVE_PLAYER, payload:id})
    }
    else {
      setChecked(true);
      setStatus(addedIcon)
      // dispatch({type:actions.ADD_PLAYER, payload:id})
    }
    // dispatch
  }

  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center justify-between bg-[#e6e6e6] dark:bg-dark-gray w-full h-10 sm:h-14 rounded-default py-1.5 px-4">
        <div className="flex">
          <img src={player?.avatar ? player?.avatar : DefaultSubstituteAvatar} className="w-8 h-8 sm:w-10 sm:h-10 mr-3 rounded-full border border-gray-500" alt="" />
          <div>
            <p className="text-black dark:text-white text-xs sm:text-base underline">{player?.firstName} {player?.lastName}</p>
            <div className="flex">
              <p className="text-black dark:text-white text-xs font-dark-gray">{player?.email}</p>
              <p className="text-black dark:text-white text-xs font-dark-gray">{player?.date}</p>
            </div>
          </div>
        </div>
        <img src={status} alt="" className="cursor-pointer" onClick={() => handleClick(player?.id)} />
      </div>
    </div>
  );
};

export default PlayerList;
