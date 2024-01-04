import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { useParams } from "react-router";
import SelectPlayerModal from "./SelectPlayerModal";

const ActionButtonsModal = (props) => {
  let { leagueId, matchId } = useParams();
  let { handleAction } = props;
  const dispatch = useDispatch();

  const status = useSelector(
    (state) => state.matchup.action_buttons_dialog.open
  );

  const teamId = useSelector(
    (state) => state.matchup.action_buttons_dialog.teamId
  );

  const time = useSelector((state) => state.matchup.action_buttons_dialog.time);
  console.log("time", time);
  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const currentPeriod = useSelector((state) => state.matchup.currentPeriod);
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");

  const closeDialog = () => {
    setEmail("");
    dispatch({
      type: actions.CLOSE_ACTION_BUTTONS_DIALOG,
    });
  };
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  // const handleAction = (teamId, playerId, event, isDirect, isSubstitute) => {
  //   actions.createOneLog(dispatch, {
  //     leagueId,
  //     matchId,
  //     period: currentPeriod,
  //     teamId,
  //     playerId,
  //     event,
  //     time,
  //     isDirect,
  //     isSubstitute,
  //   });
  // };


  const handleClickButtons = (event, id) => {
    if (match?.isNew) {
      dispatch({ type: actions.SET_EVENT, payload: event });
      dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: true });
      dispatch({
        type: actions.CLOSE_ACTION_BUTTONS_DIALOG,
      });
      // dispatch to show the modal
    } else {
      alert("The matchup is completed!");
    }
  };

  const handleClickTimeout = (teamId) => {
    if (match?.isNew) {
      handleAction(teamId, null, "TimeOut", 1, 0);
      dispatch({
        type: actions.CLOSE_ACTION_BUTTONS_DIALOG,
      });
    } else {
      alert("The matchup is completed!");
    }
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-full w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold"></p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <div className="flex flex-col dark:bg-slate bg-white rounded-lg mb-3">
                      <img
                        src={team?.logo}
                        alt=""
                        className="w-20 h-20 rounded-full mx-auto border border-gray-500"
                      />
                      <p className="self-center text-black dark:text-white font-semibold text-lg mt-5 truncate w-52 text-center">
                        {team?.name}
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow overflow-auto sm:mt-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div
                          className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                          onClick={() => handleClickButtons("points3", teamId)}
                        >
                          +3
                        </div>
                        <div
                          className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                          onClick={() => handleClickButtons("points2", teamId)}
                        >
                          +2
                        </div>
                        <div
                          className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                          onClick={() => handleClickButtons("points1", teamId)}
                        >
                          +1
                        </div>
                        {league?.displayAttempts3 && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() =>
                              handleClickButtons("attempts3", teamId)
                            }
                          >
                            <p className="text-black dark:text-white">
                              MISSED 3
                            </p>
                          </div>
                        )}
                        {league?.displayAttempts2 && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() =>
                              handleClickButtons("attempts2", teamId)
                            }
                          >
                            <p className="text-black dark:text-white">
                              MISSED 2
                            </p>
                          </div>
                        )}
                        {league?.displayAttempts1 && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() =>
                              handleClickButtons("attempts1", teamId)
                            }
                          >
                            <p className="text-black dark:text-white">
                              MISSED 1
                            </p>
                          </div>
                        )}
                        {league?.displayRebounds && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() =>
                              handleClickButtons("rebounds", teamId)
                            }
                          >
                            <p className="text-black dark:text-white">
                              REBOUNDS
                            </p>
                          </div>
                        )}
                        {league?.displayTurnovers && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() =>
                              handleClickButtons("turnovers", teamId)
                            }
                          >
                            <p className="text-black dark:text-white">
                              TURNOVER
                            </p>
                          </div>
                        )}
                        {league?.displayFouls && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() => handleClickButtons("fouls", teamId)}
                          >
                            <p className="text-black dark:text-white">FOUL</p>
                          </div>
                        )}

                        <div
                          className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                          onClick={() => handleClickTimeout(teamId)}
                        >
                          <p className="text-black dark:text-white">TIMEOUT</p>
                        </div>
                        {league?.displayBlocks && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() => handleClickButtons("blocks", teamId)}
                          >
                            <p className="text-black dark:text-white">BLOCK</p>
                          </div>
                        )}
                        {league?.displayAssists && (
                          <div
                            className="flex dark:bg-[#282A2C] bg-white h-20 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                            onClick={() =>
                              handleClickButtons("assists", teamId)
                            }
                          >
                            <p className="text-black dark:text-white">ASSIST</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <SelectPlayerModal
                    handleAction={handleAction}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ActionButtonsModal;
