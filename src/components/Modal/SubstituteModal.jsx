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

const SubstituteModal = (props) => {
  const { homeTeamPlayers, awayTeamPlayers } = props;
  let { leagueId, matchId } = useParams();

  const users = useSelector((state) => state.home.users);
  const teamId = useSelector((state) => state.home.substitute_dialog.id);
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );

  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.substitute_dialog.open);

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
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_ADD_SUBSTITUTE_DIALOG });
    setEmail("");
    setJerseyNumber("");
  };
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    // Check if the email exists in the users array
    const emailExistsInUsers = users.some((user) => user.email === email);
    // Check if the email does not exist in the homeTeamPlayers array
    const emailExistsInHomeTeamPlayers = homeTeamPlayers.some(
      (player) => player.email === email
    );
    // Check if the email does not exist in the awayTeamPlayers array
    const emailExistsInAwayTeamPlayers = awayTeamPlayers.some(
      (player) => player.email === email
    );

    if (
      emailExistsInUsers &&
      !emailExistsInHomeTeamPlayers &&
      !emailExistsInAwayTeamPlayers
    ) {
      setCanAdd(true);
    } else {
      setCanAdd(false);
    }
  }, [email]);
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
                      Add Substitute
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
                      <div
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
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          className="rounded-default text-xs h-12 col-span-2"
                          placeholder="Type email address*"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Input>
                        <Input
                          className="rounded-default text-xs h-12"
                          placeholder="Jersey Number*"
                          value={jerseyNumber}
                          onChange={(e) => setJerseyNumber(e.target.value)}
                        ></Input>
                        <Select
                          name="position"
                          className="w-full h-12 rounded-lg text-xs"
                          options={positions}
                          value={position}
                          handleClick={(e) => setPosition(e.name)}
                        >
                          {position}
                        </Select>

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
                      className={`bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white disabled:opacity-10`}
                      disabled={!canAdd}
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

export default SubstituteModal;
