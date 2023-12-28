import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import Select from "../Select";
import MatchupPlayerList from "../ListItem/MatchupPlayerList";

const SelectPlayerModal = (props) => {
  let { leagueId, matchId } = useParams();
  const dispatch = useDispatch();

  const {period, event, playerId, teamId, handleAction } = props;
  const title = {
    points3: "+3 Pointer",
    points2: "+2 Pointer",
    points1: "+1 Pointer",
    attempts3: "+3 Attempt",
    attempts2: "+2 Attempt",
    attempts1: "+1 Attempt",
    rebounds: "Rebound",
    turnovers: "Turnover",
    fouls: "Foul",
    timeout: "TimeOut",
    blocks: "Block",
    assists: "Assist",
  };
  const isOpen = useSelector((state) => state.home.select_player_dialog.open);
  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.matchId == matchId && matchup.attendance === 1
  );
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const [filteredMatchups, setFilteredMatchups] = useState([]);

  useEffect(() => {
    setFilteredMatchups(matchups);
  }, []);

  const substitutues = useSelector(state=>state.home.substitutes).filter(substitute=>substitute.leagueId == leagueId && substitute.matchId == matchId && substitute.teamId == teamId);
  console.log('substitue', filteredMatchups)
  useEffect(() => {
    const result = matchups.filter((player) => player.teamId == teamId).map(matchup=>{
      return {
        matchup,
        ...matchup.player
      }
    });
    setFilteredMatchups([...result, ...substitutues]);
  }, [teamId]);

  const player = useSelector((state) => state.home.matchups).find(
    (player) => player.id == playerId
  );

  const [jerseyNumber, setJerseyNumber] = useState(0);

  const positions = [
    { id: 0, name: "Center" },
    { id: 1, name: "Power Forward" },
    { id: 2, name: "Small Forward" },
    { id: 3, name: "Point Guard" },
    { id: 4, name: "Shooting Guard" },
  ];

  const [position, setPosition] = useState(
    player?.position ? player?.position : "Select Position"
  );

  useEffect(() => {
    setJerseyNumber(player?.jerseyNumber);
  }, [player]);

  const cancelButtonRef = useRef(null);

  const closeDialog = () => {
    dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: false });
  };

  const handleEdit = () => {
    axios
      .post(apis.updatePlayer, { playerId, jerseyNumber, position })
      .then((res) => {
        actions.getPlayers(dispatch);
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const [playersList, setPlayersList] = useState({});

  const addAction = (playerId) => {
    handleAction(teamId, playerId, title[event], 0, 0);
    dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: false });
  };
  
  const handleAddDirectScore = () =>{
    handleAction(teamId, null, title[event], 1, 0)
    dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: false });
  }
  
  const handleAddSubstituteScore = (player) => {
    console.log("subsitute add score", player);
    // here playerID is the substitute id
    handleAction(player.teamId, player.id, title[event], 0, 1)
    dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: false });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      {title[event]}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex justify-between overflow-y-auto h-[500px]">
                    <div>
                      <div className="flex w-fit items-center mb-3 dark:text-white text-black hover:cursor-pointer"
                      onClick={handleAddDirectScore}
                      >
                        <img
                          src={team?.logo}
                          alt=""
                          className="w-8 h-8 mr-3 rounded-full"
                        />
                        {team?.name}
                      </div>
                      {filteredMatchups.map((player, idx) => (
                        <MatchupPlayerList
                          key={idx}
                          className="mb-5"
                          player={player}
                          teamId={teamId}
                          addAction={addAction}
                          handleAddSubstituteScore={handleAddSubstituteScore}
                        ></MatchupPlayerList>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SelectPlayerModal;
