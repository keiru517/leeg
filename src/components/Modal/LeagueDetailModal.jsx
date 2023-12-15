import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const LeagueDetailModal = () => {
  let { leagueId } = useParams();
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.league_detail_dialog.open);
  const type = useSelector((state) => state.home.league_detail_dialog.type);
  const league = useSelector((state) => state.home.league_detail_dialog.league);
  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId && team.isDeleted !== 1
  );

  const users = useSelector((state) => state.home.users);
  const owner = users.find((user) => user.id == league.userId);

  const options = teams;
  const [homeValue, setHomeValue] = useState({ name: "Select Home Team*" });
  const [awayValue, setAwayValue] = useState({ name: "Select Away Team*" });

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_LEAGUE_DETAIL_DIALOG });
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
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <div className="flex items-center">
                      <p className="text-2xl text-black dark:text-white font-bold">
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
                  {/* <div className="flex-col p-default flex flex-grow justify-between ">
                    <div>
                      <div className="">
                        <label htmlFor="" className="dark:text-white text-black text-xs">League Description</label>
                        <textarea
                          id="message"
                          rows="6"
                          className="block p-2.5 w-full text-xs text-gray-900 rounded-default border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none"
                          placeholder="Describe your League"
                          value={league.description}
                          maxLength={500}
                        ></textarea>
                      </div>
                    </div>
                  </div> */}
                  <div className="flex flex-col border border-dark-gray rounded p-7">
                    <div>
                      <div className="grid grid-cols-6 gap-4 mb-6 items-end">
                        <div>
                          <img
                            src={league.logo}
                            className="rounded-md cursor-pointer"
                            alt=""
                          />
                        </div>
                        <div className="col-span-5">
                          <p className="dark:text-white text-black">
                            Admin
                          </p>
                          <Input
                            className="rounded-lg flex-grow text-xs "
                            placeholder="League Name"
                            value={owner?.email}
                            readOnly
                          ></Input>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="dark:text-white text-black">
                          League Name
                        </p>
                        <Input
                          className="rounded-lg flex-grow text-xs "
                          placeholder="League Name"
                          value={league.name}
                          readOnly
                        ></Input>
                      </div>
                      <div className="mb-4">
                        <p className="dark:text-white text-black">
                          League Description
                        </p>
                        <textarea
                          id="message"
                          rows="6"
                          className="block p-2.5 w-full text-xs text-gray-900 rounded-lg border border-charcoal dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white resize-none outline-none"
                          placeholder="Describe your League*"
                          value={league.description}
                          readOnly
                        ></textarea>
                      </div>
                      <div className="mb-6 grid grid-cols-2 gap-2">
                        <span>
                          <p className="dark:text-white text-black">
                            Start Date
                          </p>
                          <Input
                            className="text-xs rounded-default"
                            placeholder="Enter Start Date*"
                            value={league.startDate}
                            readOnly
                          />
                        </span>
                        <span>
                          <p className="dark:text-white text-black">End Date</p>
                          <Input
                            className="text-xs rounded-default"
                            placeholder="Enter End Date*"
                            value={league.endDate}
                            readOnly
                          />
                        </span>
                      </div>
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

export default LeagueDetailModal;
