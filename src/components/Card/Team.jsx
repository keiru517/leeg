
import { Link } from "react-router-dom";
import TeamTable from "../Table/Team";
import Table from '../Table';
import logo from '../../assets/img/dark_mode/team-logo.png';
import userIcon from '../../assets/img/dark_mode/user-add.png';
import editIcon from '../../assets/img/dark_mode/edit.png';
import avatar from '../../assets/img/dark_mode/player.png';

const Team = (props) => {
    const { route, item} = props;


    // const players = [
    //     {
    //       id: 1,
    //       logo: avatar,
    //       name:"Christiano Ronaldo"
    //     },
    //     {
    //       id: 2,
    //       logo: avatar,
    //       name: "2024 TABC Winter League",
    //     },
    //     {
    //       id: 2,
    //       logo: avatar,
    //       name: "2024 TABC Winter League",
    //     },
    //     {
    //       id: 2,
    //       logo: avatar,
    //       name: "2024 TABC Winter League",
    //     },
    //     {
    //       id: 2,
    //       logo: avatar,
    //       name: "2024 TABC Winter League",
    //     },
    //     {
    //       id: 2,
    //       logo: avatar,
    //       name: "2024 TABC Winter League",
    //     },
    //   ];
    
    const players = []

    return (
        <Link to = {`/${route}/${item.id}`}>
        <div className="flex flex-col overflow-y-auto rounded-default h-[350px] bg-dark-gray transition ease-in-out delay-150 hover:bg-dark-gray duration-200">
            <div className="flex justify-between h-[53px] bg-charcoal rounded-t-default p-4">
                <div className="flex items-center">
                    <img src={logo} className="w-8 h-8"></img>
                    <p className='text-white text-sm mx-2 underline'>Bucks</p>
                    <p className="text-white text-[10px]">10/12</p>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={userIcon} className="w-3 h-3"></img>
                    <img src={editIcon} className="w-3 h-3"></img>
                </div>
            </div>

            <div className="flex flex-grow items-center">
                {
                    players.length > 1?
                    <TeamTable players={players}/>
                    :
                    <div className="flex items-center flex-grow">
                    <p className="text-2xl text-white w-full text-center">
                      No players to show!
                    </p>
                  </div>
                }
            </div>
        </div>
        </Link>
    );
}

export default Team;