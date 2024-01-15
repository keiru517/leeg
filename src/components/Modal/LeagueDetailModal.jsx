import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import close from "../../assets/img/dark_mode/close.png";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "../Button";

const LeagueDetailModal = () => {
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state) => state.home.league_detail_dialog.open);
  const league = useSelector((state) => state.home.league_detail_dialog.league);

  const users = useSelector((state) => state.home.users);
  const user = useSelector((state) => state.home.user);
  const owner = users.find((user) => user.id == league.userId);

  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league.id && admin.isDeleted !== 1
  );
  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league.userId == user?.id;

  const player = useSelector((state) => state.home.players).find(
    (player) => player.userId == user?.id && player.leagueId == league.id
  );
  console.log(user, player);

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_LEAGUE_DETAIL_DIALOG });
  };

  const handleView = (e) => {
    navigate(`/league/${league.id}?tab=0`);
    closeDialog();
  };

  const handleApply = (e) => {
    if (league?.requirePassword) {
      dispatch({
        type: actions.OPEN_APPLY_LEAGUE_PASSWORD_DIALOG,
        payload: league,
      });
    } else {
      actions.applyLeague(dispatch, { userId: user?.id, leagueId: league?.id });
    }
    closeDialog();
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate w-[400px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <div className="flex items-center">
                      <p className="text-xl sm:text-2xl text-black dark:text-white font-bold">
                        League Information
                      </p>
                    </div>

                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex flex-col rounded p-7">
                    <div>
                      <div className="grid grid-cols-6 gap-4 mb-6 items-center">
                        <div className="col-span-2">
                          <img
                            src={league.logo}
                            className="rounded-md cursor-pointer w-12 h-12"
                            alt=""
                          />
                        </div>
                        <div className="col-span-4">
                          <p className="text-sky-500">Admin: </p>
                          <p className="text-black dark:text-white text-sm">{owner?.email}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sky-500">
                          League Name:
                        </p>
                        <p className="text-black dark:text-white text-sm">{league.name}</p>

                      </div>
                      <div className="mb-4">
                        <p className="text-sky-500">
                          League Description:
                        </p>
                        <p className="text-black dark:text-white text-sm">{league.description}</p>
                      </div>
                      <div className="mb-6 grid grid-cols-2 gap-2">
                        <span>
                          <p className="text-sky-500">
                            Start Date:
                          </p>
                          <p className="text-black dark:text-white text-sm">{league.startDate}</p>
                        </span>
                        <span>
                          <p className="text-sky-500">End Date:</p>
                          <p className="text-black dark:text-white text-sm">{league.endDate || "N/A"}</p>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      {(isAdmin ||
                        player?.isAcceptedList === 1 ||
                        league?.isAllowedFan) && (
                          <Button
                            onClick={handleView}
                            className="text-xs border-solid border-2 border-blue-700 w-full rounded hover:cursor-pointer hover:bg-gray-700"
                          >
                            View League
                          </Button>
                        )}

                      {player?.isWaitList !== 1 &&
                        player?.isAcceptedList !== 1 && (
                          <Button
                            onClick={handleApply}
                            className="text-xs border-solid border-2 border-blue-700 w-full rounded hover:cursor-pointer hover:bg-gray-700"
                          >
                            APPLY
                          </Button>
                        )}
                    </div>
                    {/* {!player && (
                      <div className="flex-col flex flex-grow justify-between">
                        <button
                          onClick={handleApply}
                          className="bg-primary rounded-default w-full hover:bg-sky-600 text-white h-button"
                        >
                          Apply
                        </button>
                      </div>
                    )} */}
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

export default LeagueDetailModal;
