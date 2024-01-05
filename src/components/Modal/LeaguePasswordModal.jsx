import { Fragment, useRef, useState } from "react";
import { useParams } from "react-router";
import { Dialog, Transition } from "@headlessui/react";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import PasswordInput from "../Input/password";
import apis from "../../utils/apis";

const LeaguePasswordModal = () => {
  const dispatch = useDispatch();

  const league = useSelector(
    (state) => state.home.league_password_dialog.league
  );
  const status = useSelector((state) => state.home.league_password_dialog.open);
  const type = useSelector((state) => state.home.league_password_dialog.type);
  const user = useSelector((state) => state.home.user);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPassowrdConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const cancelButtonRef = useRef(null);

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_LEAGUE_PASSWORD_DIALOG });
    setPassword("");
    setPassowrdConfirm("");
    setCurrentPassword("");
  };

  const applyWithPassword = () => {
    if (password == league?.password) {
      dispatch({type:actions.CLOSE_LEAGUE_PASSWORD_DIALOG});
      actions.applyLeague(dispatch, {userId:user?.id, leagueId:league?.id});
    } else {
      alert("Password is wrong!");
    }
  }

  const addPassword = () => {
    if (password === passwordConfirm) {
      actions.addPassword(dispatch, { id: league?.id, password: password });
      dispatch({ type: actions.CLOSE_LEAGUE_PASSWORD_DIALOG });
      setPassword("");
      setPassowrdConfirm("");
    } else {
      alert("Password does not match!");
    }
  };
  const removePassword = () => {
    if (league?.password !== currentPassword) {
      alert("Password is incorrect!");
    } else {
      actions.removePassword(dispatch, { id: league?.id });
      dispatch({ type: actions.CLOSE_LEAGUE_PASSWORD_DIALOG });
      setCurrentPassword("");
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-96 w-[400px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      {type === "create"
                        ? "Set "
                        : type === "remove"
                        ? "Remove "
                        : "Need "}
                      password
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    {type === "create" ? (
                      <div className="flex flex-col space-y-3 text-xs">
                        <PasswordInput
                          className="rounded-default"
                          placeholder="Type league password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordInput
                          className="rounded-default"
                          placeholder="Confirm password"
                          value={passwordConfirm}
                          onChange={(e) => setPassowrdConfirm(e.target.value)}
                        />
                      </div>
                    ) : type === "remove" ? (
                      <>
                        <PasswordInput
                          className="fournded-default text-xs"
                          placeholder="Current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </>
                    ) : (
                      <PasswordInput
                        className="rounded-default text-xs"
                        placeholder="Type league password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}

                    <button
                      onClick={type === "create" ? addPassword : type==="remove"?removePassword:applyWithPassword}
                      className="bg-primary rounded-default w-full hover:bg-sky-600 text-white h-button"
                    >
                      Confirm
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

export default LeaguePasswordModal;
