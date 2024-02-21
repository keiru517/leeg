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
import PlayerList from "../ListItem/PlayerList";
import search from "../../assets/img/dark_mode/search.png";

const AddPlayerModal = (props) => {
  const { isOpenAddPlayerModal, setIsOpenAddPlayerModal } = props;
  let { leagueId, matchId } = useParams();

  const users = useSelector((state) => state.home.users);
  const teamId = useSelector((state) => state.home.substitute_dialog.id);
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const [playersList, setPlayersList] = useState({});
  const dispatch = useDispatch();


  const positions = [
    { id: 0, name: "Center" },
    { id: 1, name: "Power Forward" },
    { id: 2, name: "Small Forward" },
    { id: 3, name: "Point Guard" },
    { id: 4, name: "Shooting Guard" },
  ];
  const [position, setPosition] = useState("Select Position");

  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const createSubmit = () => {
    if (firstName === "" || lastName === "") {
      alert("First name or Last name is required!")
    } else {
      let userId = null;
      let teamId = 0;
      let avatar = "";
      let email = "";
      let isWaitList = 1;
      let isAcceptedList = 0;
      let isSubstitute = 0;
      let data = {
        leagueId,
        userId,
        teamId,
        email,
        avatar,
        firstName,
        lastName,
        jerseyNumber,
        position,
        isWaitList,
        isAcceptedList,
        isSubstitute
      }

      actions.createPlayer(dispatch, data);
      closeDialog();
    }
  };

  const closeDialog = () => {
    // dispatch({ type: actions.CLOSE_ADD_SUBSTITUTE_DIALOG });
    setIsOpenAddPlayerModal(false)
    setPlayersList({});
    setFirstName("");
    setLastName("");
    setEmail("");
    setJerseyNumber("");
    setPosition("Select Position");
  };
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpenAddPlayerModal} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Add Player
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
                      {/* <div
                        className={`flex w-full h-[86px] bg-light-charcoal dark:bg-charcoal rounded-default items-center mb-4`}
                      >
                        <img
                          src={team?.logo}
                          alt=""
                          className="rounded-full w-[58px] h-[58px] mx-2"
                        />
                        <div className="">
                          <p className="text-black dark:text-white text-base">
                            {team?.name}
                          </p>
                        </div>
                      </div> */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor=""
                            className="text-black dark:text-white text-xs"
                          >
                            First Name
                          </label>
                          <Input
                            className="rounded-default text-xs h-12 col-span-2"
                            placeholder="Type First Name*"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          ></Input>
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="text-black dark:text-white text-xs"
                          >
                            Last Name
                          </label>
                          <Input
                            className="rounded-default text-xs h-12"
                            placeholder="Type Last Name*"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          ></Input>
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="text-black dark:text-white text-xs"
                          >
                            Jersey Number
                          </label>
                          <Input
                            className="rounded-default text-xs h-12"
                            placeholder="Jersey Number"
                            value={jerseyNumber}
                            type="number"
                            onChange={(e) => setJerseyNumber(e.target.value)}
                          ></Input>
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="text-black dark:text-white text-xs"
                          >
                            Position
                          </label>
                          <Select
                            name="position"
                            className="w-full h-12 rounded-lg text-xs"
                            options={positions}
                            value={position}
                            handleClick={(e) => setPosition(e.name)}
                          >
                            {position}
                          </Select>
                        </div>

                        {/* <Input
                          className="rounded-default text-xs h-12"
                          placeholder="First Name*"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        ></Input>
                        <Input
                          className="rounded-default text-xs h-12"
                          placeholder="Last Name*"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        ></Input> */}
                      </div>
                    </div>
                    <button
                      onClick={createSubmit}
                      className={`bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10`}
                    >
                      Add Player
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

export default AddPlayerModal;
