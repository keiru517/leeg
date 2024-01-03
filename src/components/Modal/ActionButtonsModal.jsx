import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import EventLogs from "../../components/EventLogs";

const ActionButtonsModal = (props) => {
  let { leagueId, matchId, teamId, time } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const darkMode = useSelector((state) => state.home.dark_mode);

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const handleAction = (teamId, playerId, event, isDirect, isSubstitute) => {
    actions.createOneLog(dispatch, {
      leagueId,
      matchId,
      period: 1,
      teamId,
      playerId,
      event,
      time,
      isDirect,
      isSubstitute,
    });
  };

  const [event, setEvent] = useState("");

  const handleClickButtons = (event, id) => {
    if (match?.isNew) {
      setEvent(event);
      dispatch({ type: actions.OPEN_SELECT_PLAYER_DIALOG, payload: true });
      // dispatch to show the modal
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
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Logs
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <div className="flex flex-col dark:bg-slate bg-white rounded-lg mb-3 p-default">
                      <div
                        className="w-6 h-6 sm:w-[34px] sm:h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
                        onClick={() => navigate(-1)}
                      >
                        <img
                          src={darkMode ? backIconDark : backIconLight}
                          alt=""
                          className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
                        />
                      </div>
                      <img
                        src={team?.logo}
                        alt=""
                        className="w-28 h-28 rounded-full mx-auto border border-gray-500"
                      />
                      <p className="self-center text-black dark:text-white font-semibold text-2xl mt-5 truncate w-52 text-center">
                        {team?.name}
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow overflow-auto sm:mt-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div
                          className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer"
                          onClick={() => handleClickButtons("points3", teamId)}
                        >
                          +3
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          +2
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          +1
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          Missed 3
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          Missed 2
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          Missed 1
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          REBOUND
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          TURNOVER
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          FOUL
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          TIMEOUT
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          BLOCK
                        </div>
                        <div className="flex dark:bg-[#282A2C] bg-white h-36 text-black dark:text-white items-center justify-center rounded-xl hover:cursor-pointer">
                          ASSIST
                        </div>
                      </div>
                    </div>
                    <SelectPlayerModal
                      event={event}
                      teamId={teamId}
                      handleAction={handleAction}
                      period={currentPeriod}
                    />
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

export default ActionButtonsModal;
