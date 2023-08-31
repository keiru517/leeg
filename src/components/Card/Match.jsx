import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
import SubstituteModal from "../Modal/SubstituteModal";
import { useEffect, useState } from "react";

const MatchCard = (props) => {
  let { leagueId } = useParams();

  const { teamId } = props;
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );
  const players = useSelector((state) => state.home.players).filter(
    (player) => player.teamId == teamId
  );

  const dispatch = useDispatch();

  const handleAddSubstitute = () => {
    dispatch({ type: actions.OPEN_ADD_SUBSTITUTE_DIALOG });
  };

  const handleEdit = () => {
    dispatch({ type: actions.OPEN_EDIT_TEAM_DIALOG, payload: team });
  };

  
  const [inputValues, setInputValues] = useState({});
  const handleInputChange = (id, value) => {
    let temp = {...inputValues};
    temp[id] = value;
    setInputValues(temp);
  }

  useEffect(()=>{
    console.log(inputValues);
  }, [inputValues])


  return (
    <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-dark-gray transition ease-in-out delay-150 hover:bg-dark-gray duration-200 w-full">
      <div className="flex justify-between h-button bg-charcoal rounded-t-default p-4">
        <div className="flex items-center">
          <img src={team.logo} className="w-8 h-8"></img>
          <Link to={`/league/${leagueId}/team/${teamId}`}>
            <p className="text-white text-sm mx-2 underline">{team.name}</p>
          </Link>
          <p className="text-white text-[10px]">
            {team.waitlist}/{team.max}
          </p>
        </div>
        <div
          onClick={handleAddSubstitute}
          className="flex items-center space-x-2 text-sky-500 text-sm cursor-pointer hover:opacity-70"
        >
          + Substitute
        </div>
      </div>

      <div className="flex flex-grow items-center">
        {players.length > 0 ? (
          <div className="text-white h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="sticky">
                <tr>
                  <th
                    key="2"
                    className="h-button bg-slate text-center font-font-dark-gray w-1/2"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Player
                    </Typography>
                  </th>
                  <th
                    key="3"
                    className="h-button bg-slate text-center font-font-dark-gray w-1/2"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Points
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {players.map((player, index) => (
                  <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
                    <td className="">
                      <div className="flex items-center justify-between">
                        <img
                          src={player.avatar}
                          alt=""
                          className="w-8 h-8 mr-2"
                        />
                        {player.name}
                        <img src={deleteIcon} alt="" className="text-right" />
                      </div>
                    </td>
                    <td className="">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Input
                        key={index}
                          className="rounded-default bg-transparent border-none text-center"
                          type="number"
                          value={inputValues[player.id]}
                          onChange={e=>handleInputChange(player.id, e.target.value)}
                        ></Input>
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center flex-grow">
            <p className="text-2xl text-white w-full text-center">
              No players to show!
            </p>
          </div>
        )}
      </div>
      <SubstituteModal id={teamId}></SubstituteModal>
    </div>
  );
};

export default MatchCard;
