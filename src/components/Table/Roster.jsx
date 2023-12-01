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
import moment from 'moment';

function Checkbox({ label, name, checked, onChange, disabled }) {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="">{label}</Switch.Label>
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

const RosterTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { leagueId } = useParams();

  // let { leagueId} = useParams();
  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId && league.isDeleted !== 1
  );

  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league?.id && admin.isDeleted !== 1
  );

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league?.userId == user?.id;

  const { rosters, rosterValue, setRosterValue } = props;

  var columns = [];
  if (isAdmin) {
    var columns = [
      "Player",
      "Email",
      "Date Applied",
      "Date Accepted",
      "Team",
      "Status",
      // "Action",
    ];
  } else {
    var columns = [
      "Player",
      "Email",
      "Date Applied",
      "Date Accepted",
      "Team",
      "Status",
    ];
  }

  const options =
    rosterValue === "WaitList"
      ? [
          { id: 0, name: "Accept" },
          { id: 1, name: "Remove" },
        ]
      : [{ id: 0, name: "WaitList" }];

  const teams = useSelector((state) => state.home.teams);

  const handleOption = (idx) => {
    // Return true if nothing is selected
    const allItemsFalse = Object.values(itemChecked).every(
      (value) => value === false
    );

    if (Object.keys(itemChecked).length === 0 || allItemsFalse) {
      // alert("Please select one or more players!");
    } else {
      if (rosterValue === "WaitList") {
        // if the user clicks Accept
        if (idx === 0) {
          axios
            .post(apis.acceptPlayer, itemChecked)
            .then((res) => {
              actions.getPlayers(dispatch);
            })
            .catch((error) => alert(error.response.data.message));
        } else {
          console.log("remove", idx)
          console.log("remove", itemChecked)
          actions.removeFromLeague(dispatch, itemChecked);
        }
      } else if (rosterValue === "AcceptedList") {
        console.log(itemChecked);
        axios
          .post(apis.unacceptPlayer, itemChecked)
          .then((res) => {
            actions.getPlayers(dispatch);
          })
          .catch((error) => alert(error.response.data.message));
      }
    }
    setItemChecked({});
  };

  const isDeletedTeam = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    if (team.isDeleted === 1) return true;
    else return false;
  };

  const [itemChecked, setItemChecked] = useState({});
  const setListItemChecked = (index, checked) => {
    let temp = { ...itemChecked };
    temp[index] = checked;
    setItemChecked(temp);
  };

  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    // Return true if nothing is selected
    const allItemsFalse = Object.values(itemChecked).every(
      (value) => value === false
    );
    if (allItemsFalse) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [itemChecked]);

  // Set itemchecked as {} when the select option is changed
  useEffect(() => {
    setItemChecked({});
  }, [rosterValue]);

  return (
    <div className="text-black dark:text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            {/* <th>
              <Checkbox
                name="name"
                // checked={!!allchecked}
                // onChange={(checked) => {
                //   setWaitListItemChecked(player.id, checked);
                // }}
              />
            </th> */}
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                {head}
              </th>
            ))}
            {isAdmin && (
              <th className="text-center cursor-pointer w-20">
                {rosterValue === "AcceptedList" ? (
                  <span
                    className="text-black dark:text-white"
                    onClick={() => handleOption()}
                  >
                    {canSubmit ? "❌" : "..."}
                  </span>
                ) : (
                  // <span onClick={()=>handleOption()} className={`${canSubmit?"":"opacity-50"}`}>❌</span>
                  <div className="flex justify-center space-x-1">
                    {canSubmit ? (
                      <>
                        <span
                          onClick={() => handleOption(1)}
                          className={`${canSubmit ? "" : "opacity-50"}`}
                        >
                          ❌
                        </span>
                        <span
                          onClick={() => handleOption(0)}
                          className={`${canSubmit ? "" : "opacity-50"}`}
                        >
                          ✅
                        </span>
                      </>
                    ) : (
                      <span className="text-black dark:text-white">...</span>
                    )}
                  </div>
                )}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {rosters.map((player, index) => (
            // <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:">
            <tr
              key={index}
              className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal"
            >
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex items-center underline px-3"
                >
                  <img
                    src={player.avatar}
                    alt=""
                    className="h-8 w-8 sm:mr-2 sm:ml-5 rounded-full border border-gray-500"
                  />
                  <Link to={`player/${player.userId}`}>
                    {player.firstName} {player.lastName}
                  </Link>
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {player.email}
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {moment(player.createdAt).format('h:mmA DD/MM/YYYY')}
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {/* {new Date(player.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })} */}
                  {moment(player.createdAt).format('h:mmA DD/MM/YYYY')}
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {player.teamId !== 0 ? "Yes" : "No"}
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {player.isAcceptedList === 1 ? "Accepted" : "Not Accepted"}
                </Typography>
              </td>
              {league?.userId == user?.id && (
                // <td className="w-1/7">
                //   {/* <Option
                //     options={options}
                //     handleClick={(idx) => handleOption(idx, player.id)}
                //   ></Option> */}
                // </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex justify-center"
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RosterTable;
