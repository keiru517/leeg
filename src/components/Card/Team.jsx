import { Link, useParams } from "react-router-dom";
import TeamTable from "../Table/Team";
import userIconDark from "../../assets/img/dark_mode/user-add-icon-dark.png";
import userIconLight from "../../assets/img/dark_mode/user-add-icon-light.png";
import editIconDark from "../../assets/img/dark_mode/edit-icon-dark.svg";
import editIconLight from "../../assets/img/dark_mode/edit-icon-light.svg";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const TeamCard = (props) => {
  const { team } = props;
  let { leagueId } = useParams();
  const darkMode = useSelector(state=>state.home.dark_mode);
  const user = useSelector((state) => state.home.user);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const players = useSelector((state) => state.home.players).filter(
    (player) => player.teamId == team.id && player.isDeleted !== 1 && player.isSubstitute !==1
  );

  const dispatch = useDispatch();

  const handleAddPlayer = () => {
    dispatch({ type: actions.OPEN_ADD_PLAYER_DIALOG, payload: team });
  };

  const handleEdit = () => {
    dispatch({ type: actions.OPEN_EDIT_TEAM_DIALOG, payload: team });
  };

  return (
    <div className="flex flex-col overflow-y-auto rounded-default h-full bg-transparent border border-dark-gray rounded transition ease-in-out delay-150 duration-200 w-full">
      <div className="flex justify-between h-button bg-transparent px-4 py-6">
        <div className="flex items-center">
          <img src={team.logo} className="w-8 h-8 rounded-full "></img>
          <Link to={`team/${team.id}`}>
            <p className="text-black dark:text-white text-sm mx-2">{team.name}</p>
          </Link>
        </div>
        {league?.userId == user?.id && (
          <div className="flex items-center space-x-2">
            <img
              src={darkMode?userIconDark:userIconLight}
              className="w-5 h-5 cursor-pointer"
              onClick={handleAddPlayer}
            ></img>
            <img
              src={darkMode?editIconDark:editIconLight}
              className="w-5 h-5 cursor-pointer"
              onClick={handleEdit}
            ></img>
          </div>
        )}
      </div>
      <div className="flex flex-grow items-center overflow-y-auto">
        {players.length ? (
          <TeamTable data={players} />
        ) : (
          <div className="flex items-center flex-grow">
            <p className="text-2xl text-black dark:text-white w-full text-center mb-5">
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
