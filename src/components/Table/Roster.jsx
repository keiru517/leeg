import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { AiOutlineCheck } from "react-icons/ai";
import { Switch } from "@headlessui/react";
import Option from "../Option";

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

const RosterTable = () => {
  const navigate = useNavigate();
  let { leagueId } = useParams();

  // let { leagueId} = useParams();
  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId && league.isDeleted !== 1
  );

  const players = useSelector((state) => state.home.players).filter(
    (player) => player.leagueId == leagueId && player.isDeleted !== 1
  );

  var columns = [];
  if (league?.userId == user?.id) {
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

  const options = [
    { id: 0, name: "Accept" },
    { id: 1, name: "Remove" },
  ];

  const teams = useSelector((state) => state.home.teams);

  // const goToMatchup = (id) => {
  //   navigate(`/league/${leagueId}/matchup/${id}`)
  // }

  const handleOption = (idx, matchId) => {
    if (idx === 0) {
      navigate(`/league/${leagueId}/matchup/${matchId}`);
    } else if (idx === 1) {
      alert("Match has been deleted");
    }
  };

  const isDeletedTeam = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    if (team.isDeleted === 1) return true;
    else return false;
  };

  const [itemChecked, setItemChecked] = useState({});
  const setWaitListItemChecked = (index, checked) => {
    let temp = { ...itemChecked };
    temp[index] = checked;
    setItemChecked(temp);
  };
  return (
    <div className="text-black dark:text-white h-full w-full mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th>
              <Checkbox
                name="name"
                // itemChecked={!!waitItemChecked[player.id]}
                // setItemChecked={(checked) => {
                //   setWaitListItemChecked(player.id, checked);
                // }}
              />
            </th>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray font-normal opacity-70 text-sm"
              >
                {head}
              </th>
            ))}
            {league?.userId == user?.id ? (
              <th>
                <Option
                  options={options}
                  // handleClick={(idx) => handleOption(idx, player.id)}
                ></Option>
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {players.map((player, index) => (
            // <tr onClick={()=>goToMatchup(id)} key={index} className="odd:bg-dark-gray even:bg-charcoal  hover:opacity-70">
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
                  <Checkbox
                    name="name"
                    itemChecked={!!itemChecked[player.id]}
                    setItemChecked={(checked) => {
                      setWaitListItemChecked(player.id, checked);
                    }}
                  />
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
                  {player.createdAt}
                </Typography>
              </td>
              <td className="w-1/7">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {player.updatedAt}
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
                <td className="w-1/7">
                  {/* <Option
                    options={options}
                    handleClick={(idx) => handleOption(idx, player.id)}
                  ></Option> */}
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
