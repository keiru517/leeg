import { Link, useParams } from "react-router-dom";
import TeamTable from "../Table/Team";
import userIcon from "../../assets/img/dark_mode/user-add.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import apis from "../../utils/apis";

const TeamCard = (props) => {
  const { team } = props;
  let { leagueId } = useParams();

  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const players = useSelector((state) => state.home.players).filter(
    (player) => player.teamId == team.id && player.isDeleted !== 1
  );

  const dispatch = useDispatch();

  const handleAddPlayer = () => {
    dispatch({ type: actions.OPEN_ADD_PLAYER_DIALOG, payload: team });
  };

  const handleEdit = () => {
    dispatch({ type: actions.OPEN_EDIT_TEAM_DIALOG, payload: team });
  };

  return (
    <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-dark-gray transition ease-in-out delay-150 hover:bg-dark-gray duration-200 w-full">
      <div className="flex justify-between h-button bg-charcoal rounded-t-default p-4">
        <div className="flex items-center">
          <img src={team.logo} className="w-8 h-8 rounded-default"></img>
          <Link to={`team/${team.id}`}>
            <p className="text-white text-sm mx-2 underline">{team.name}</p>
          </Link>
          <p className="text-white text-[10px]">
            {team.waitlist}/{team.max}
          </p>
        </div>
        {league?.userId == user?.id ? (
          <div className="flex items-center space-x-2">
            <img
              src={userIcon}
              className="w-3.5 h-3.5 cursor-pointer"
              onClick={handleAddPlayer}
            ></img>
            <img
              src={editIcon}
              className="w-3.5 h-3.5 cursor-pointer"
              onClick={handleEdit}
            ></img>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-grow items-center">
        {players.length ? (
          <TeamTable data={players} />
        ) : (
          <div className="flex items-center flex-grow">
            <p className="text-2xl text-white w-full text-center">
              No players to show!
            </p>
          </div>
        )}
      </div>
      {/* <TeamModal id={team.id}></TeamModal> */}
    </div>
  );
};

export default TeamCard;
