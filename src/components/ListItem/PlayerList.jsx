import { Switch } from "@headlessui/react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import addIcon from '../../assets/img/dark_mode/circle-add.png';
import addedIcon from '../../assets/img/dark_mode/circle-added.png';

const PlayerList = ({className, player, team_id}) => {
  const [itemOnechecked, setItemOneChecked] = useState(false);
  const [itemTwochecked, setItemTwoChecked] = useState(false);
  const [itemThreechecked, setItemThreeChecked] = useState(false);
  const [itemFourchecked, setItemFourChecked] = useState(true);

  const [status, setStatus] = useState(team_id == player.team_id?addedIcon:addIcon)
  const handleClick = () => {
    if (status == addedIcon)
      setStatus(addIcon)
      // dispatch
    else
      setStatus(addedIcon)
      // dispatch
  }

  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center justify-between bg-dark-gray w-full h-14 rounded-default py-1.5 px-4">
        <div className="flex">
          <img src={player.avatar} className="w-10 h-10 mr-3" alt="" />
          <div>
            <p className="text-white text-base underline">{player.name}</p>
            <div className="flex">
              <p className="text-white text-xs font-dark-gray">{player.email}</p>
              <p className="text-white text-xs font-dark-gray">{player.date}</p>
            </div>
          </div>
        </div>
        <img src={status} alt="" className="cursor-pointer" onClick={handleClick}/>
      </div>
    </div>
  );
};

export default PlayerList;
