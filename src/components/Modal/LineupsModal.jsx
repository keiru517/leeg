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
  let { leagueId, matchId } = useParams();
  const teamId = useSelector((state) => state.home.lineup_dialog.id);

  const players = useSelector((state) => state.home.matchups)
    .filter((matchup) => matchup.matchId == matchId && matchup.teamId == teamId)
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
        attendance
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
          attendance
        };
      }
    );

  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.lineup_dialog.open);

  const handleAddSubstitute = (id) => {
    closeDialog();
    dispatch({ type: actions.OPEN_ADD_SUBSTITUTE_DIALOG, payload: id });
  };

  const [lineups, setLineups] = useState({});

  const handleLineups = () => {
    // console.log(lineups)
    console.log(lineups)
    axios.post(apis.editLineups, {lineups, matchId}).then((res)=>{
      dispatch({type:actions.GET_MATCHUPS, payload:res.data.matchups})
      alert("Updated lineups!");
    }).catch(()=>{
      console.log("Error")
    })
  }

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_LINEUP_DIALOG });
  };
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={status} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
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
                      <LineupTable players={players} setLineups={setLineups}></LineupTable>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleLineups}
                        className={`bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10`}
                      >
                        Save Lineups
                      </button>
                      <button
                        onClick={() => handleAddSubstitute(teamId)}
                        className={`bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10`}
                      >
                        Add Substitute
                      </button>
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

export default LineupsModal;
