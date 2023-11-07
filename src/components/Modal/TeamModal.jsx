import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg";
import search from "../../assets/img/dark_mode/search.png";
import uploadCircle from "../../assets/img/dark_mode/upload-circle.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import MatchupPlayerList from "../ListItem/MatchupPlayerList";
import apis from "../../utils/apis";
import PlayerList from "../ListItem/PlayerList";

const TeamModal = () => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.home.dark_mode);
  const user = useSelector((state) => state.home.user);
  const status = useSelector((state) => state.home.team_dialog.open);
  const type = useSelector((state) => state.home.team_dialog.type);

  const team = useSelector((state) => state.home.team_dialog.team);

  const cancelButtonRef = useRef(null);

  const fileUploadRef = useRef(undefined);
  const [chosenFile, setChosenFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [logoWarning, setLogoWarning] = useState(false);
  const [nameWarning, setNameWarning] = useState(false);
  const [confirmTeamName, setConfirmTeamName] = useState("");
  const [color, setColor] = useState("");

  const players = useSelector((state) => state.home.players).filter(
    (player) =>
      player.leagueId == leagueId &&
      player.isAcceptedList &&
      player.teamId === 0
  );

  const [teamName, setTeamName] = useState("");
  useEffect(() => {
    if (teamName?.length > 0) {
      setNameWarning(false);
    }
  }, [teamName]);

  useEffect(() => {
    setTeamName(team.name);
  }, [team]);

  const closeDialog = () => {
    setPreviewURL(null);
    setColor(null);
    setChosenFile(null);
    setTeamName("");
    setLogoWarning(false);
    setConfirmTeamName("");
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
  };

  const handleDelete = () => {
    dispatch({ type: actions.OPEN_DELETE_TEAM_DIALOG, payload: team });
  };

  // const handleEdit = () => {
  //   dispatch({
  //     type: actions.OPEN_EDIT_TEAM_DIALOG,
  //     payload: { open: true, type: "edit", team: team },
  //   });
  // };

  const createSubmit = () => {
    if (!teamName?.length > 0) {
      // alert("Please choose file");
      // setLogoWarning(true);
      setNameWarning(true);
    } else if (!chosenFile && !color) {
      setLogoWarning(true);
    } else {
      const formData = new FormData();
      formData.append("userId", user?.id);
      formData.append("leagueId", leagueId);
      formData.append("logo", chosenFile);
      formData.append("color", color);
      formData.append("name", teamName);

      dispatch({ type: actions.CLOSE_TEAM_DIALOG });
      axios.post(apis.createTeam, formData).then((res) => {
        actions.getTeams(dispatch);
        actions.getPlayers(dispatch);
        setPreviewURL(null);
        setColor(null);
        setTeamName("");
        setLogoWarning(false);
      });
    }
  };

  const editSubmit = () => {
    dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    const formData = new FormData();
    formData.append("userId", user?.id);
    formData.append("leagueId", leagueId);
    formData.append("logo", chosenFile);
    formData.append("color", color);
    formData.append("name", teamName);
    axios
      .post(apis.updateTeam, formData)
      .then((res) => {
        actions.getTeams(dispatch);
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    console.log("Clicked edit");
  };

  const deleteSubmit = () => {
    if (confirmTeamName == "") {
      alert("Please type the league name you want to delete for confirmation.");
    } else if (confirmTeamName === team?.name) {
      setConfirmTeamName("");
      axios
        .delete(apis.deleteTeam(team.id))
        .then((res) => {
          actions.getTeams(dispatch);
          actions.getPlayers(dispatch);
          alert(res.data.message);
        })
        .catch((error) => alert(error.response.data.message));
      dispatch({ type: actions.CLOSE_TEAM_DIALOG });
    } else {
      alert("Please type the league name correctly.");
    }
  };

  const [playersList, setPlayersList] = useState({});
  const addPlayers = () => {
    axios
      .post(apis.addPlayer, {
        teamId: team.id,
        playersList: playersList,
      })
      .then((res) => {
        dispatch({ type: actions.CLOSE_TEAM_DIALOG });
        actions.getPlayers(dispatch);
        setPlayersList({});
      })
      .catch((error) => console.log(error.response.data.message));
    console.log("playersList", playersList);
  };

  const setCheckedList = (id, checked) => {
    let temp = { ...playersList };
    temp[id] = checked;
    setPlayersList(temp);
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
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
                      {
                        type === "edit" ? (
                          <img
                            src={darkMode ? deleteIconDark : deleteIconLight}
                            alt=""
                            className="w-[18px] h-[18px] mr-5 hover:opacity-70 cursor-pointer"
                            onClick={handleDelete}
                          />
                        ) : (
                          ""
                        )
                        // : type === "delete" ? (
                        //   <img
                        //     src={editIcon}
                        //     alt="sdf"
                        //     className="w-[18px] h-[18px] mr-5 hover:opacity-70 cursor-pointer"
                        //     onClick={handleEdit}
                        //   />
                        // ) : (
                        //   ""
                        // )
                      }
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
                            className={`${
                              logoWarning ? "border-2 border-red-500" : ""
                            } flex w-full h-[86px] bg-light-charcoal dark:bg-charcoal rounded-default items-center justify-between`}
                          >
                            <div className="flex items-center">
                              {/* {previewURL ? (
                                <img
                                  onClick={() => {
                                    fileUploadRef.current?.click();
                                  }}
                                  src={previewURL}
                                  className="rounded-full w-[58px] h-[58px] mx-2"
                                  alt=""
                                  style={{
                                    filter: `birghtness(100%) hue-rotate(180deg) saturate(150%) sepia(20%)`,
                                  }}
                                />
                              ) : type === "create" ? (
                                <img
                                  src={uploadCircle}
                                  alt=""
                                  className="mx-2"
                                  onClick={() => {
                                    fileUploadRef.current?.click();
                                  }}
                                />
                              ) : type === "edit" ? (
                                <img
                                  src={team?.logo}
                                  onClick={() => {
                                    fileUploadRef.current?.click();
                                  }}
                                  alt=""
                                  className="rounded-full w-[58px] h-[58px] mx-2"
                                />
                              ) : (
                                ""
                              )} */}
                              <div
                                className={`w-[58px] h-[58px] rounded-full mx-2`}
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                  fileUploadRef.current?.click();
                                }}
                              >
                                {previewURL ? (
                                  <img
                                    // onClick={() => {
                                    //   fileUploadRef.current?.click();
                                    // }}
                                    src={previewURL}
                                    className="rounded-full w-[58px] h-[58px]"
                                    alt=""
                                  />
                                ) : type === "create" ? (
                                  color ? (
                                    ""
                                  ) : (
                                    <img
                                      src={uploadCircle}
                                      alt=""
                                      className=""
                                      // onClick={() => {
                                      //   fileUploadRef.current?.click();
                                      // }}
                                    />
                                  )
                                ) : type === "edit" ? (
                                  <img
                                    src={team?.logo}
                                    alt=""
                                    className="rounded-full w-[58px] h-[58px]"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <input
                                id="nativeColorPicker1"
                                type="color"
                                className="mr-3 w-[30px]"
                                value={color}
                                onChange={(e) => {
                                  setPreviewURL(null);
                                  setChosenFile(null);
                                  setColor(e.target.value);
                                }}
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
                                    setPreviewURL(URL.createObjectURL(file));
                                    setColor(null);
                                    setLogoWarning(false);
                                  }
                                }}
                              />
                              <p className="text-black dark:text-white font-bold text-sm">
                                Upload Team Logo
                              </p>
                            </div>
                            <div className="flex items-center"></div>
                          </div>
                          <Input
                            className={`${
                              nameWarning ? "border-2 border-red-500" : ""
                            } rounded-default text-xs mt-5`}
                            placeholder="Type Team Name*"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                          ></Input>
                        </>
                      ) : type === "delete" ? (
                        <div className="flex flex-col justify-between h-full">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between bg-light-charcoal dark:bg-charcoal w-full h-[86px] rounded-default py-1.5 px-2">
                              <div className="flex items-center">
                                <img
                                  src={team?.logo}
                                  className="w-[58px] h-[58px] mr-3 rounded-full"
                                  alt=""
                                />
                                <div className="">
                                  <p className="text-black dark:text-white text-base">
                                    {team?.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Input
                              className="rounded-default text-xs "
                              placeholder="Type Team Name*"
                              value={confirmTeamName}
                              onChange={(e) =>
                                setConfirmTeamName(e.target.value)
                              }
                            ></Input>
                          </div>
                        </div>
                      ) : type === "addPlayer" ? (
                        <>
                          <div className="flex bg-light-charcoal dark:bg-[#4A5462] h-[66px] rounded-default p-4 items-center">
                            <img
                              src={team.logo}
                              className="w-8 h-8 rounded"
                              alt=""
                            />
                            <p className="text-black dark:text-white underline mx-2 text-sm">
                              {team.name}
                            </p>
                            <p className="text-black dark:text-white text-[10px]">
                              {team.waitlist}/{team.max}
                            </p>
                          </div>
                          <Input
                            className="rounded-lg my-[10px] text-xs"
                            icon={search}
                            placeholder="Search Players"
                          />
                          <div className="overflow-y-auto h-[260px]">
                            {players.map((player, idx) => (
                              <PlayerList
                                key={idx}
                                className="mb-5"
                                player={player}
                                teamId={team.id}
                                checked={playersList[player.id]}
                                setChecked={(checked) => {
                                  setCheckedList(player.id, checked);
                                }}
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
