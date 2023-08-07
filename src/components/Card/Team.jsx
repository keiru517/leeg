
import { Link } from "react-router-dom";
import TeamTable from "../Table/Team";
import userIcon from '../../assets/img/dark_mode/user-add.png';
import editIcon from '../../assets/img/dark_mode/edit.png';
import avatar from '../../assets/img/dark_mode/player.png';
import * as actions from '../../actions';
import { useDispatch } from "react-redux";

const TeamCard = (props) => {
    const {item} = props;


    const dispatch = useDispatch()
    
    // const players = []

    const handleAddPlayer = () => {
        dispatch({type:actions.OPEN_ADD_PLAYER_DIALOG, payload:item})
        // dispatch({type:actions.OPEN_TEAM_DIALOG, payload:true})
    }
    
    const handleEdit = () => {
        dispatch({type: actions.OPEN_EDIT_TEAM_DIALOG, payload:item})
    }

    return (
      <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-dark-gray transition ease-in-out delay-150 hover:bg-dark-gray duration-200 w-full">
            <div className="flex justify-between h-button bg-charcoal rounded-t-default p-4">
                <div className="flex items-center">
                    <img src={item.logo} className="w-8 h-8"></img>
                    <Link to = {`/team/${item.id}`}>
                      <p className='text-white text-sm mx-2 underline'>{item.name}</p>
                    </Link>
                    <p className="text-white text-[10px]">{item.waitlist}/{item.max}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={userIcon} className="w-3.5 h-3.5 cursor-pointer" onClick={handleAddPlayer}></img>
                    <img src={editIcon} className="w-3.5 h-3.5 cursor-pointer" onClick={handleEdit}></img>
                </div>
            </div>

            <div className="flex flex-grow items-center">
                {
                    item.players.length > 1?
                    <TeamTable data={item.players}/>
                    :
                    <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No players to show!
                    </p>
                  </div>
                }
            </div>
            {/* <TeamModal id={item.id}></TeamModal> */}
        </div>
    );
}

export default TeamCard;