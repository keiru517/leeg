import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AiOutlineCheck } from "react-icons/ai";
import { Switch } from "@headlessui/react";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.png";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg";
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
            ${checked && !disabled ? "ring-sky-400" : ""} 
            ${disabled ? "bg-gray-200 ring-gray-200" : ""}  
          `}
        >
          <AiOutlineCheck
            size="1rem"
            className={`
             ${checked ? "scale-100" : "scale-0"} 
             ${checked && !disabled ? "text-sky-400" : "text-gray-400"} 
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
  const darkMode = useSelector((state) => state.home.dark_mode);

  const columns = ["#", "Players"];

  const teams = useSelector((state) => state.home.teams);

  const isDeletedTeam = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    if (team.isDeleted === 1) return true;
    else return false;
  };

  const [itemChecked, setItemChecked] = useState({});

  useEffect(() => {
    let temp = {};
    players.map((player) => {
      console.log(player.isSubstitute);
      temp[player.id] = player.attendance === 1 ? true : false;
    });
    setItemChecked(temp);
  }, []);

  const setListItemChecked = (index, checked) => {
    let temp = { ...itemChecked };
    temp[index] = checked;
    setItemChecked(temp);
  };

  useEffect(() => {
    setLineups(itemChecked);
  }, [itemChecked]);

  return (
    <div className="text-black dark:text-white h-full w-full mt-4 overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
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
                  className="font-normal flex items-center px-3 justify-between"
                >
                  <div className="flex items-center">
                    {
                      player.isSubstitute == false ?
                        <Link to={`/league/${leagueId}/player/${player.userId}`} className="underline">
                          <img
                            src={
                              player.isSubstitute
                                ? DefaultSubstituteAvatar
                                : player.avatar
                            }
                            alt=""
                            className="h-8 w-8 mr-2 sm:ml-5 rounded-full border border-gray-500"
                          />
                        </Link> :
                        <img
                          src={
                            player.isSubstitute
                              ? DefaultSubstituteAvatar
                              : player.avatar
                          }
                          alt=""
                          className="h-8 w-8 mr-2 sm:ml-5 rounded-full border border-gray-500"
                        />
                    }
                    {
                      !player.isSubstitute &&
                      <Link to={`/league/${leagueId}/player/${player.userId}`} className="underline">
                        {player.firstName} {player.lastName}
                      </Link>
                    }
                    {
                      player.isSubstitute && <>{player.firstName} {player.lastName}</>
                    }
                  </div>
                  {player.isSubstitute && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Substitute
                    </span>
                  )}
                </Typography>
              </td>
              <td className="w-24">
                {/* <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex"
                > */}
                <div className="flex space-x-3">
                  <Checkbox
                    name="name"
                    checked={!!itemChecked[player.id]}
                    onChange={(checked) => {
                      setListItemChecked(player.id, checked);
                    }}
                  />
                  {player.isSubstitute && (
                    <img
                      src={darkMode ? deleteIconDark : deleteIconLight}
                      alt=""
                      className="w-4.5 h-4.5 cursor-pointer"
                    />
                  )}
                </div>
                {/* </Typography> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LineupTable;
