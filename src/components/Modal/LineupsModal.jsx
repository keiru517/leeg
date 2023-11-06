import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import Select from "../Select";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import apis from "../../utils/apis";
import LineupTable from "../Table/Lineup";

const LineupsModal = (props) => {
  const { homeTeamPlayers, awayTeamPlayers } = props;
  let { leagueId, matchId } = useParams();

  const users = useSelector((state) => state.home.users);
  const teamId = useSelector((state) => state.home.lineup_dialog.id);
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const players = useSelector((state) => state.home.matchups)
  .filter(
    (matchup) => matchup.matchId == matchId && matchup.teamId == teamId
  )
  .map(
    ({
      player,
      points,
      points3,
      points2,
      points1,
      attempts3,
      attempts2,
      attempts1,
      blocks,
      rebounds,
      assists,
      fouls,
      steals,
      turnovers,
    }) => {
      return {
        ...player,
        points,
        points3,
        points2,
        points1,
        attempts3,
        attempts2,
        attempts1,
        blocks,
        rebounds,
        assists,
        fouls,
        steals,
        turnovers,
      };
    }
  );

  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.lineup_dialog.open);

  const positions = [
    { id: 0, name: "Center" },
    { id: 1, name: "Power Forward" },
    { id: 2, name: "Small Forward" },
    { id: 3, name: "Point Guard" },
    { id: 4, name: "Shooting Guard" },
  ];
  const [position, setPosition] = useState("Select Position");

  const [email, setEmail] = useState("");
  const [canAdd, setCanAdd] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const handleAddSubstitute = (id) => {
    closeDialog();
    dispatch({ type: actions.OPEN_ADD_SUBSTITUTE_DIALOG, payload: id });
  };

  const createSubmit = () => {
    dispatch({ type: actions.CLOSE_ADD_SUBSTITUTE_DIALOG });
    axios
      .post(apis.createOneMatchup, {
        email,
        leagueId,
        matchId,
        teamId,
        jerseyNumber,
        position,
      })
      .then((res) => {
        actions.getPlayers(dispatch);
        actions.getTeams(dispatch);
        actions.getMatches(dispatch);
        actions.getMatchups(dispatch);
      })
      .catch((error) => console.log(error.response.data.message));
  };

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_LINEUP_DIALOG });
  };
  const cancelButtonRef = useRef(null);

  // useEffect(() => {
  //   // Check if the email exists in the users array
  //   const emailExistsInUsers = users.some((user) => user.email === email);
  //   // Check if the email does not exist in the homeTeamPlayers array
  //   const emailExistsInHomeTeamPlayers = homeTeamPlayers.some(
  //     (player) => player.email === email
  //   );
  //   // Check if the email does not exist in the awayTeamPlayers array
  //   const emailExistsInAwayTeamPlayers = awayTeamPlayers.some(
  //     (player) => player.email === email
  //   );

  //   if (
  //     emailExistsInUsers &&
  //     !emailExistsInHomeTeamPlayers &&
  //     !emailExistsInAwayTeamPlayers
  //   ) {
  //     setCanAdd(true);
  //   } else {
  //     setCanAdd(false);
  //   }
  // }, [email]);
  return (
    <Transition.Root show={status} as={Fragment}>
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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-white font-bold">
                      Edit Lineups
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-default justify-between">
                    <div>
                      <LineupTable players={players}></LineupTable>
                    </div>
                    <button
                      onClick={()=>handleAddSubstitute(teamId)}
                      className={`bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10`}
                    >
                      Add Substitute
                    </button>
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

export default LineupsModal;
