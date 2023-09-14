import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../utils/apis";

const MatchModal = () => {
  let { leagueId } = useParams();
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.match_dialog.open);
  const type = useSelector((state) => state.home.match_dialog.type);

  const team = useSelector((state) => state.home.match_dialog.match);
  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId
  );

  // const options = ["Real Madrid", "Manchester City", "FC Barcelona"];
  const options = teams;
  const [homeValue, setHomeValue] = useState({ name: "Select Home Team*" });
  const [awayValue, setAwayValue] = useState({ name: "Select Away Team*" });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentTime = currentDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const formattedTime =
    currentDate.getHours() >= 12 ? `${currentTime}` : `${currentTime}`;

  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);
  const [location, setLocation] = useState("");

  const closeDialog = () => {
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_MATCH_DIALOG });
  };

  const handleDelete = () => {
    dispatch({ type: actions.OPEN_DELETE_TEAM_DIALOG, payload: team });
    // dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: true });
  };

  const handleEdit = () => {
    dispatch({
      type: actions.OPEN_EDIT_TEAM_DIALOG,
      payload: { open: true, type: "edit", team: team },
    });
    // dispatch({ type: actions.OPEN_TEAM_DIALOG, payload: true });
  };

  const createSubmit = () => {
    axios
      .post(apis.createMatch, {
        leagueId: leagueId,
        homeTeamId: homeValue.id,
        awayTeamId: awayValue.id,
        date,
        time,
        location,
      })
      .then((res) => {
        actions.getMatches(dispatch);
        dispatch({ type: actions.CLOSE_MATCH_DIALOG });
      })
      .catch((error) => alert(error.data.message));

    console.log("Clicked create");
  };

  const [warning, setWarning] = useState(false);
  useEffect(() => {
    if (homeValue.name == awayValue.name) setWarning(true);
    else setWarning(false)
  }, [homeValue, awayValue]);

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
                      Create Match
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between ">
                    <div>
                      <div className="grid grid-cols-2 gap-[10px]">
                        <Select
                          options={options}
                          // handleClick={e=>handleHome(e)}
                          handleClick={(e) => setHomeValue(e)}
                          value={homeValue.name}
                          className="rounded-default w-full h-12 text-xs"
                        >
                          Select Home Team*
                        </Select>
                        <Select
                          options={options}
                          handleClick={(e) => setAwayValue(e)}
                          value={awayValue.name}
                          className="rounded-default w-full h-12 text-xs"
                        >
                          Select Away Team*
                        </Select>
                        {warning ? (
                          <p className="text-red-700 col-span-2">
                            Can not create a match between the same teams
                          </p>
                        ) : (
                          ""
                        )}
                        <Input
                          className="rounded-default text-xs h-12"
                          placeholder="Enter Date*"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        ></Input>
                        <Input
                          className="rounded-default text-xs h-12"
                          placeholder="Select Time*"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        ></Input>
                        <Input
                          className="rounded-default col-span-2 text-xs h-12"
                          placeholder="Enter Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <button
                      onClick={createSubmit}
                      className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10"
                      disabled={warning}
                    >
                      Create Match
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

export default MatchModal;
