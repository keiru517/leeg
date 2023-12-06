import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import TimePicker from "../Timer/TimePicker";

const MatchupSettingModal = (props) => {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null);

  let { matchId } = useParams();
  const isOpen = useSelector((state) => state.home.matchup_setting_dialog.open);
  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );

  const closeDialog = () => {
    dispatch({ type: actions.OPEN_MATCHUP_SETTING_DIALOG, payload: false });
  };

  const [period, setPeriod] = useState();
  const [time, setTime] = useState();
  useEffect(() => {
    console.log("EFF")
    console.log(match?.timer)
    setPeriod(match?.period);
    setTime(match?.timer);
  }, [match]);

  useEffect(() => {
    console.log(time)
  }, [time]);

  const handleSubmit = (e) => {
    console.log(time)
     axios.post(apis.updateMatchSettings, {matchId, period, time}).then((res)=>{
      alert(res.data.message);
      actions.getMatches(dispatch);
      dispatch({type:actions.OPEN_MATCHUP_SETTING_DIALOG, payload:false});
     }).catch((error)=>{
      alert("Error occurred!");
     })
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Settings
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex justify-between overflow-y-auto h-[500px]">
                    <div className="flex space-x-3 items-center">
                      <label htmlFor="" className="text-white">Period:</label>
                      <input
                        type="number"
                        className="w-full flex space-x-2 border border-dark-gray items-center px-3 bg-transparent outline-none text-black dark:text-white flex-grow h-button rounded-default text-xs"
                        placeholder="Number of Period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                      />
                      <label htmlFor="" className="text-white">Timer:</label>
                      <TimePicker initialTime={time} setTime={setTime} className="w-full bg-[#303335] rounded-default"></TimePicker>
                    </div>
                    <button className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white"
                    onClick={handleSubmit}
                    >
                      Save
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

export default MatchupSettingModal;
