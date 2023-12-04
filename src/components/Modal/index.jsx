import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Datepicker from "tailwind-datepicker-react";
import close from "../../assets/img/dark_mode/close.png";
import btn1 from "../../assets/img/dark_mode/btn1.png";
import btn1Selected from "../../assets/img/dark_mode/btn1-selected.png";
import btn2 from "../../assets/img/dark_mode/btn2.png";
import btn2Selected from "../../assets/img/dark_mode/btn2-selected.png";
import btn3 from "../../assets/img/dark_mode/btn3.png";
import uploadCircle from "../../assets/img/dark_mode/upload-circle.png";
import Select from "../Select";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import apis from "../../utils/apis";
import moment from "moment";

const Modal = (props) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.home.league_dialog.open);
  const user = useSelector((state) => state.home.user);
  
  // const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  const cancelButtonRef = useRef(null);
  
  const sportOptions = [
    { id: 0, name: "Basketball" },
    // { id: 1, name: "Rugby" },
    // { id: 2, name: "Hockey" },
    // { id: 3, name: "Baseball" },
  ];

  const currentDate = new Date()
    .toLocaleDateString("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/ /g, "/")
    .replace(",", "");
  
  const closeDialog = () => {
    setStep(1);
    setSport("Select Sport*");
    setLeagueName("");
    setLeagueDescription("");
    setStartDate(currentDate);
    setEndDate(currentDate);
    setChosenFile(null);
    setPreviewURL("");
    dispatch({ type: actions.OPEN_CREATE_LEAGUE_DIALOG, payload: false });
  };

  const goToStep1 = () => {
    setStep(1);
  };

  const goToStep2 = () => {
    if (sport === "Select Sport*") {
      alert("Please select Sport!")
    } else {
      setStep(2);
    }
  };

  const goToStep3 = () => {
    if (!leagueName) {
      alert("Please fill in the league name");
    } else {
      setStep(3);
    }
  };

  const [sport, setSport] = useState("Select Sport*");
  const [leagueName, setLeagueName] = useState("");
  const [leagueDescription, setLeagueDescription] = useState("");
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const fileUploadRef = useRef(null);

  const [chosenFile, setChosenFile] = useState(null);

  const [previewURL, setPreviewURL] = useState("");

  const [logoWarning, setLogoWarning] = useState(false);

  const createLeague = () => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("sport", sport);
    formData.append("name", leagueName);
    formData.append("description", leagueDescription);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("logo", chosenFile);

    axios
      .post(apis.createLeague, formData)
      .then((res) => {
        actions.getLeagues(dispatch);
        dispatch({ type: actions.CLOSE_LEAGUE_DIALOG });
        setSport("Select Sport*");
        setLeagueName("");
        setLeagueDescription("");
        setStartDate("");
        setEndDate("");
        setChosenFile(null);
        setPreviewURL("");
        goToStep1();
        alert(res.data.message);

        // Navigate(-1);
      })
      .catch((error) => console.log(error.response.data.message));
  };

  const options1 = {
    title: "Enter Season Start Date",
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-700 dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "opacity-30",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span className="text-xs">&lt;</span>,
      next: () => <span className="text-xs">&gt;</span>,
    },
    datepickerClassNames: "text-xs top-12 right-5",
    language: "en",
  };

  const options2 = {
    title: "Enter Season End Date",
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-700 dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "opacity-30",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span className="text-xs">&lt;</span>,
      next: () => <span className="text-xs">&gt;</span>,
    },
    datepickerClassNames: "text-xs top-12 right-5",
    language: "en",
  };

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleChange1 = (selectedDate) => {
    const dateObj = new Date(selectedDate);
    const formattedDate = moment(dateObj).format('DD/MM/YYYY');
    console.log(formattedDate.toString());
    setStartDate(formattedDate.toString());
  };
  const handleChange2 = (selectedDate) => {
    const dateObj = new Date(selectedDate);
    const formattedDate =  moment(dateObj).format('DD/MM/YYYY');
    console.log(formattedDate.toString());
    setEndDate(formattedDate.toString());
  };
  const handleClose1 = (state) => {
    setShow1(state);
  };
  const handleClose2 = (state) => {
    setShow2(state);
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

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main pb-4 text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[609px] md:w-[735px] mx-3">
                <div className="divide-y divide-solid divide-font-dark-gray dark:divide-[#3A3A3A]">
                  <div className="flex items-center text-left h-[88px] justify-between px-[26px]">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Create League
                    </p>
                    <img
                      src={close}
                      onClick={closeDialog}
                      className="cursor-pointer hover:opacity-70"
                    ></img>
                  </div>
                  <div className="flex divide-x divide-solid divide-font-dark-gray dark:divide-[#3A3A3A]">
                    <div className="flex flex-col space-y-8 sm:w-[290px] h-[521px] p-default">
                      <div
                        className={
                          step == 1
                            ? "flex sm:w-[238px] w-[49px]  h-12 bg-primary rounded-full items-center text-white text-sm font-medium"
                            : "flex sm:w-[238px] w-[49px]  h-12 rounded-full items-center text-black dark:text-white text-sm font-bold"
                        }
                      >
                        {step == 1 ? (
                          <img src={btn1} alt="" className="px-2" />
                        ) : (
                          <img src={btn1Selected} alt="" className="px-2" />
                        )}
                        <span className="hidden sm:inline">Select Sport</span>
                      </div>
                      <div
                        className={
                          step == 2
                            ? "flex sm:w-[238px] w-[49px] h-12 bg-primary rounded-full items-center text-white text-sm font-medium"
                            : step == 3
                            ? "flex sm:w-[238px] w-[49px] h-12 rounded-full items-center text-black dark:text-white text-sm font-bold"
                            : "flex sm:w-[238px] w-[49px]  h-12 rounded-full items-center text-font-dark-gray text-sm font-bold"
                        }
                      >
                        {step == 3 ? (
                          <img src={btn2Selected} alt="" className="px-2" />
                        ) : (
                          <img src={btn2} alt="" className="px-2" />
                        )}
                        <span className="hidden sm:inline">Basic Details</span>
                      </div>
                      <div
                        className={
                          step == 3
                            ? "flex sm:w-[238px] w-[49px]  h-12 bg-primary rounded-full items-center text-white text-sm font-medium"
                            : "flex sm:w-[238px] w-[49px]  h-12 rounded-full items-center text-font-dark-gray text-sm font-bold"
                        }
                      >
                        <img src={btn3} alt="" className="px-2" />
                        <span className="hidden sm:inline">Schedule</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:w-[444px] w-[320px] p-default">
                      {step == 1 ? (
                        <>
                          <Select
                            className="w-full h-[48px] rounded-default text-xs"
                            options={sportOptions}
                            handleClick={(e) => setSport(e.name)}
                            value={sport}
                          >
                            {sport}
                          </Select>
                          <button
                            onClick={goToStep2}
                            className="bg-primary w-full h-button rounded-default mt-auto text-white font-bold text-sm hover:bg-sky-600 focus:ring-2"
                          >
                            Next: Basic Details
                          </button>
                        </>
                      ) : step == 2 ? (
                        <>
                          <div className="space-y-3">
                            <div
                              className={`${
                                logoWarning ? "border-2 border-red-500" : ""
                              } flex w-full h-[86px] bg-light-charcoal dark:bg-charcoal rounded-default items-center cursor-pointer`}
                              onClick={() => {
                                fileUploadRef.current?.click();
                              }}
                            >
                              {previewURL ? (
                                <div>
                                  <img
                                    src={previewURL}
                                    className="rounded-full w-[58px] h-[58px] mx-2"
                                    alt="Preview"
                                  />
                                </div>
                              ) : (
                                <img
                                  src={uploadCircle}
                                  alt=""
                                  className="mx-2"
                                />
                              )}
                              <input
                                type="file"
                                ref={fileUploadRef}
                                hidden
                                onChange={(e) => {
                                  const files = e.target.files;
                                  if (files.length) {
                                    const file = files[0];
                                    setChosenFile(file);
                                    console.log(file);
                                    setPreviewURL(URL.createObjectURL(file));
                                  }
                                }}
                              />
                              <p className="text-black dark:text-white font-bold text-sm">
                                Upload League Logo
                              </p>
                            </div>
                            <input
                              className="border border-charcoal items-center px-3 bg-transparent outline-none text-black dark:text-white flex-grow h-button text-xs w-full rounded-default"
                              placeholder="Type League Name*"
                              value={leagueName}
                              onChange={(e) => setLeagueName(e.target.value)}
                              maxLength={100}
                            ></input>

                            <textarea
                              id="message"
                              rows="6"
                              className="block p-2.5 w-full text-xs text-gray-900 rounded-default border border-charcoal focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-charcoal dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none outline-none"
                              placeholder="Describe your League"
                              value={leagueDescription}
                              onChange={(e) =>
                                setLeagueDescription(e.target.value)
                              }
                              maxLength={500}
                            ></textarea>
                          </div>
                          <div className="flex mt-auto w-full justify-between">
                            <button
                              onClick={goToStep1}
                              className="bg-[#e5e5e5] dark:bg-[#3A3A3A] w-28 sm:w-[169px] h-button rounded-default mt-auto text-black dark:text-white font-semibold text-sm dark:hover:bg-middle-gray focus:ring-2"
                            >
                              Back to Step 1
                            </button>
                            <button
                              onClick={goToStep3}
                              className="bg-primary w-28 sm:w-[169px] h-button rounded-default mt-auto text-white font-semibold text-sm hover:bg-sky-600 focus:ring-2"
                            >
                              Next: Schedule
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative space-y-3">
                            {/* <Input
                              className="text-xs rounded-default mb-5"
                              // option={calendar}
                              placeholder="Enter Season Start Date*"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            /> */}
                            <Datepicker
                              classNames=""
                              options={options1}
                              onChange={handleChange1}
                              show={show1}
                              setShow={handleClose1}
                            />

                            <Datepicker
                              classNames=""
                              options={options2}
                              onChange={handleChange2}
                              show={show2}
                              setShow={handleClose2}
                            />
                            {/* <Input
                              className="text-xs rounded-default"
                              // option={calendar}
                              placeholder="Enter Season End Date*"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            /> */}
                          </div>
                          <div className="flex mt-auto w-full justify-between">
                            <button
                              onClick={goToStep2}
                              className="bg-[#e5e5e5] dark:bg-[#3A3A3A] w-28 sm:w-[169px] h-button rounded-default mt-auto text-black dark:text-white font-semibold text-sm hover:bg-gray-700 focus:ring-2"
                            >
                              Back to Step 2
                            </button>
                            <button
                              onClick={createLeague}
                              className="bg-primary w-28 sm:w-[169px] h-button rounded-default mt-auto text-white font-semibold text-sm hover:bg-sky-600 focus:ring-2"
                            >
                              Create League
                            </button>
                          </div>
                        </>
                      )}
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

export default Modal;
