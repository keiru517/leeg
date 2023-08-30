import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/24/outline";
import close from "../../assets/img/dark_mode/close.png";
import btn1 from "../../assets/img/dark_mode/btn1.png";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
import editIcon from "../../assets/img/dark_mode/edit.png";
import search from "../../assets/img/dark_mode/search.png";
import btn3 from "../../assets/img/dark_mode/btn3.png";
import uploadCircle from "../../assets/img/dark_mode/upload-circle.png";
import calendar from "../../assets/img/dark_mode/calendar.png";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";
import ListItem from "../ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import logo from "../../assets/img/dark_mode/league-logo.png";
import avatar from "../../assets/img/dark_mode/player.png";
import PlayerList from "../ListItem/PlayerList";

const TeamModal = () => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.team_dialog.open);
  const type = useSelector((state) => state.home.team_dialog.type);

  const team = useSelector((state) => state.home.team_dialog.team);

  const cancelButtonRef = useRef(null);

  const fileUploadRef = useRef(undefined);
  const [chosenFile, setChosenFile] = useState();

  const players = useSelector((state) => state.home.players).filter(
    (player) => (player.leagueId == leagueId) & (player.role == 1)
  );

  const [teamName, setTeamName] = useState(team.name);

  const closeDialog = () => {
    // setStep(1);
    // dispatch({ type: actions.OPEN_CREATE_TEAM_DIALOG, payload: false });
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
  };

  const handleDelete = () => {
    console.log("teamid", team.id);
    // confirm("HI");
    axios
      .delete(`/team/remove/${team.id}`)
      .then((res) => {
        dispatch({ type: actions.CLOSE_TEAM_DIALOG });
        actions.getTeams(dispatch);
        alert(res.data.message);
      })
      .catch((err) => alert(err.data.message));
    // dispatch({ type: actions.OPEN_DELETE_TEAM_DIALOG, payload: team });
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
    const formData = new FormData();
    formData.append("leagueId", leagueId);
    formData.append("logo", chosenFile);
    formData.append("name", teamName);

    axios.post("/team/create", formData).then((res) => {
      actions.getTeams(dispatch);
      dispatch({ type: actions.CLOSE_TEAM_DIALOG });
      setTeamName("");
    });
  };

  const editSubmit = () => {
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    axios
      .post("/team/update", {
        id: team.id,
        name: teamName,
        logo: "updated logo",
      })
      .then((res) => {
        actions.getTeams(dispatch);
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.data.message);
      });
    console.log("Clicked edit");
  };

  const deleteSubmit = () => {
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    console.log("Clicked delete");
  };

  const [playersList, setPlayersList] = useState({});
  const addPlayers = () => {

  }

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
                      {type == "create"
                        ? "Create Team"
                        : type == "edit"
                        ? "Edit Team"
                        : type === "delete"
                        ? "Delete Team"
                        : type === "addPlayer"
                        ? "Add Players To Team"
                        : ""}
                    </p>
                    <div className="flex items-center">
                      {type === "edit" ? (
                        <img
                          src={deleteIcon}
                          alt=""
                          className="w-[18px] h-[18px] mr-5 hover:opacity-70 cursor-pointer"
                          onClick={handleDelete}
                        />
                      ) : type === "delete" ? (
                        <img
                          src={editIcon}
                          alt="sdf"
                          className="w-[18px] h-[18px] mr-5 hover:opacity-70 cursor-pointer"
                          onClick={handleEdit}
                        />
                      ) : (
                        ""
                      )}
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <div>
                      {type === "create" || type === "edit" ? (
                        <>
                          <div
                            className="flex w-full h-[86px] bg-charcoal rounded-default items-center hover:opacity-70 cursor-pointer"
                            onClick={() => {
                              fileUploadRef.current?.click();
                            }}
                          >
                            <img
                              src={uploadCircle}
                              alt=""
                              className="px-[14px]"
                            />
                            <input
                              type="file"
                              ref={fileUploadRef}
                              hidden
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files.length) {
                                  const file = files[0];
                                  setChosenFile(file);
                                }
                              }}
                            />
                            <p className="text-white font-bold text-sm">
                              Upload League Logo
                            </p>
                          </div>
                          <Input
                            className="rounded-default text-xs mt-5"
                            placeholder="Type Team Name*"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                          ></Input>
                        </>
                      ) : type === "delete" ? (
                        <Input
                          className="rounded-default text-xs "
                          placeholder="Type Team Name*"
                          // value={team.name}
                          // onChange={(e) => setTeamName(e.target.value)}
                        ></Input>
                      ) : type === "addPlayer" ? (
                        <>
                          <div className="flex bg-[#4A5462] h-[66px] rounded-default p-4 items-center">
                            <img src={team.logo} className="w-8 h-8 rounded" alt="" />
                            <p className="text-white underline mx-2 text-sm">
                              {team.name}
                            </p>
                            <p className="text-white text-[10px]">
                              {team.waitlist}/{team.max}
                            </p>
                          </div>
                          <Input
                            className="rounded-lg my-[10px] text-xs"
                            icon={search}
                            placeholder="Search Players"
                          />
                          <div className="overflow-y-auto">
                            {players.map((player, idx) => (
                              <PlayerList
                                key={idx}
                                className="mb-5"
                                player={player}
                                teamId={team.id}
                              ></PlayerList>
                            ))}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {type === "create" ? (
                      <button
                        onClick={createSubmit}
                        className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white"
                      >
                        Create Team
                      </button>
                    ) : type === "edit" ? (
                      <button
                        onClick={editSubmit}
                        className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white"
                      >
                        Edit Team
                      </button>
                    ) : type === "delete" ? (
                      <button
                        onClick={deleteSubmit}
                        className="bg-danger bg-opacity-10 rounded-xl w-full h-12 text-danger font-semibold hover:bg-opacity-5"
                      >
                        Delete Team
                      </button>
                    ) : type === "addPlayer" ? (
                      <button
                        onClick={addPlayers}
                        className="bg-primary rounded-xl w-full hover:bg-opacity-70 h-button text-white"
                      >
                        Confirm
                      </button>
                    ) : (
                      ""
                    )}
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

export default TeamModal;
