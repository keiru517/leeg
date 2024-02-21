import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import axios from "axios";
import close from "../../assets/img/dark_mode/close.png";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import apis from "../../utils/apis";
import Select from "../Select";
import ImageCropperModal from "../../components/Modal/ImageCropperModal";
import deleteIconDark from "../../assets/img/dark_mode/delete-icon-dark.svg";
import deleteIconLight from "../../assets/img/dark_mode/delete-icon-light.svg";
// import DefaultSubstituteAvatar from "../../assets/img/dark_mode/cropper.jpg";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.svg";

const EditPlayerModal = (props) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.home.dark_mode);

  const { playerId, isOpen, setIsOpen } = props;
  const player = useSelector((state) => state.home.players).find(
    (player) => player.id == playerId
  );


  const positions = [
    { id: 0, name: "Center" },
    { id: 1, name: "Power Forward" },
    { id: 2, name: "Small Forward" },
    { id: 3, name: "Point Guard" },
    { id: 4, name: "Shooting Guard" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [chosenFile, setChosenFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [firstName, setFirstName] = useState(player?.firstName);
  const [lastName, setLastName] = useState(player?.lastName);
  const [jerseyNumber, setJerseyNumber] = useState(0);
  const [position, setPosition] = useState(player?.position ? player?.position : "Select Position");

  useEffect(() => {
    setFirstName(player?.firstName);
    setLastName(player?.lastName)
    setJerseyNumber(player?.jerseyNumber);
    setPosition(player?.position ? player?.position : "Select Position")
  }, [player]);

  const cancelButtonRef = useRef(null);

  const closeDialog = () => {
    setIsOpen(false);
    setChosenFile(null);
    // setPosition("Select Position")
    setPreviewURL("")
  };

  const handleEdit = () => {
    setIsOpen(false);
    const formData = new FormData();
    formData.append("playerId", playerId);
    formData.append("avatar", chosenFile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("jerseyNumber", jerseyNumber);
    formData.append("position", position);
    actions.updatePlayer(dispatch, playerId, chosenFile, firstName, lastName, jerseyNumber, position)
  };

  const base64toBlob = (base64Data) => {
    const byteString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: 'image/jpeg' });
  }

  const handleDeleteAvatar = () => {
    // setChosenFile(null)
    // const base64Data = DefaultSubstituteAvatar.split(',')[1]
    // const blob = base64toBlob(base64Data);
    // const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

    setChosenFile(null)
    setPreviewURL(DefaultSubstituteAvatar)

  }

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-96 sm:h-[609px] w-[400px] sm:w-[500px] md:w-[735px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-2xl text-black dark:text-white font-bold">
                      Edit Player
                    </p>
                    <div className="flex items-center">
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex-col p-default flex flex-grow justify-between">
                    <div>
                      <>
                        <div className="flex items-center justify-between bg-light-charcoal dark:bg-dark-gray w-full h-14 rounded-default py-1.5 px-4">
                          <div className="flex">
                            <img
                              src={previewURL ? previewURL : (player?.avatar ? player?.avatar : DefaultSubstituteAvatar)}
                              className="w-10 h-10 mr-3 rounded-full border border-gray-500 cursor-pointer"
                              alt="avatar"
                              onClick={() => {
                                if (!player?.userId) {
                                  setModalOpen(true)
                                }
                              }}
                            />
                            <div>
                              <p className="text-black dark:text-white text-base underline">
                                {player?.firstName} {player?.lastName}
                              </p>
                              <div className="flex">
                                <p className="text-black dark:text-white text-xs font-dark-gray">
                                  {player?.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <img
                            src={darkMode ? deleteIconDark : deleteIconLight}
                            alt=""
                            className="w-[18px] h-[18px] hover:opacity-70 cursor-pointer"
                            onClick={handleDeleteAvatar}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                          {
                            !player?.userId &&
                            <>
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
                            </>
                          }
                          <div>
                            <label
                              htmlFor="jerseyNumber"
                              className="text-xs text-dark dark:text-white"
                            >
                              Jersey Number :
                            </label>
                            <Input
                              id="jerseyNumber"
                              name="jerseyNumber"
                              className={`rounded-default text-xs`}
                              placeholder="Type Jersey Number*"
                              value={jerseyNumber}
                              onChange={(e) => setJerseyNumber(e.target.value)}
                            ></Input>
                          </div>
                          <div>
                            <label
                              htmlFor="position"
                              className="text-xs text-dark dark:text-white"
                            >
                              Position :
                            </label>
                            <Select
                              name="position"
                              className="w-full h-[42px] rounded-lg text-xs"
                              options={positions}
                              value={position}
                              handleClick={(e) => setPosition(e.name)}
                            >
                              {position}
                            </Select>
                          </div>
                        </div>
                      </>
                    </div>
                    <button
                      onClick={handleEdit}
                      className="bg-primary rounded-default w-full hover:bg-opacity-70 h-button text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <ImageCropperModal modalOpen={modalOpen} setModalOpen={setModalOpen} setPreviewURL={setPreviewURL} setChosenFile={setChosenFile} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditPlayerModal;
