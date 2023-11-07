import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AiOutlineCheck } from "react-icons/ai";
import { Switch } from "@headlessui/react";
import Option from "../Option";
import axios from "axios";
import apis from "../../utils/apis";
import * as actions from "../../actions";

function Checkbox({ label, name, checked, onChange, disabled }) {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">{label}</Switch.Label>
        <Switch
          checked={checked}
          onChange={onChange}
          name={name}
          disabled={disabled}
          className={`
            relative flex h-5 w-5 items-center justify-center transition-all duration-200 outline-none ring-1 
            ${!checked && !disabled ? "ring-gray-400" : ""}
            ${checked && !disabled ? "ring-red-400" : ""} 
            ${disabled ? "bg-gray-200 ring-gray-200" : ""}  
          `}
        >
          <AiOutlineCheck
            size="1rem"
            className={`
             ${checked ? "scale-100" : "scale-0"} 
             ${checked && !disabled ? "text-red-400" : "text-gray-400"} 
             transition-transform duration-200 ease-out`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}

const LineupTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { leagueId } = useParams();


  const { players, setLineups } = props;

  const columns = ["#", "Players"];

  const teams = useSelector((state) => state.home.teams);

  const isDeletedTeam = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    if (team.isDeleted === 1) return true;
    else return false;
  };

  const [itemChecked, setItemChecked] = useState({});

  useEffect(()=>{
    let temp = {}
    players.map(player=>{
      console.log(player.attendance)
      temp[player.id] = player.attendance===1?true:false;
    });
    setItemChecked(temp);
  }, [])

  const setListItemChecked = (index, checked) => {
    let temp = { ...itemChecked };
    temp[index] = checked;
    setItemChecked(temp);
  };

  useEffect(()=>{
    setLineups(itemChecked);
  }, [itemChecked])

  return (
    <div className="text-black dark:text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                {head}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {players.map((player, index) => (
            // <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:">
            <tr
              key={index}
              className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
            >
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {player.jerseyNumber}
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex items-center underline px-3"
                >
                  <img
                    src={player.avatar}
                    alt=""
                    className="h-8 w-8 sm:mr-2 sm:ml-5 rounded-default"
                  />
                  <Link to={`player/${player.userId}`}>
                    {player.firstName} {player.lastName}
                  </Link>
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <Checkbox
                    name="name"
                    checked={!!itemChecked[player.id]}
                    onChange={(checked) => {
                      setListItemChecked(player.id, checked);
                    }}
                  />
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LineupTable;
