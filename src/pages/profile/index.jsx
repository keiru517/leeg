import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MD5 } from "crypto-js";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import * as actions from "../../actions";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";
import horizontalLine from "../../assets/img/dark_mode/horizontal-line.png";
import AdminTable from "../../components/Table/Admin";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import toggleOn from "../../assets/img/dark_mode/toggle-on.png";
import axios from "axios";
import apis from "../../utils/apis";
import PasswordInput from "../../components/Input/password";

const Profile = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.home.dark_mode);

  const admins = useSelector((state) => state.home.admins);
  const user = useSelector((state) => state.home.user);

  const breadcrumList = [
    "Personal Information",
    "Admin Access",
    "Stats Tracking",
  ];
  const [value, setValue] = useState("");

  const [status, setStatus] = useState("information");
  const goToPassword = () => {
    setStatus("password");
  };

  const goToInformation = () => {
    setStatus("information");
  };

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const updateInformation = () => {
    console.log("clicked update information");
  };

  const updatePassword = () => {
    console.log("clicked update Password");
  };

  const inviteAdmin = () => {
    console.log("invite Admin clicked! The admin email is:", value);
    setValue("");
  };

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
  }, []);

  useEffect(() => {
    setEmail(user?.email);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
  }, [user]);

  const fileUploadRef = useRef();
  const [chosenFile, setChosenFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleSubmit = () => {
    if (status === "information") {
      const formData = new FormData();
      formData.append("avatar", chosenFile);
      formData.append("userId", user?.id);
      // formData.append("email", email);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      axios.post(apis.updateInfo, formData).then((res) => {
        actions.getUsers(dispatch);
        actions.getUserInfo(dispatch, localStorage.getItem("userId"));
        alert("updated");
      });
    } else {
      const hashedPassword = MD5(oldPassword).toString();
      if (user?.password !== hashedPassword) {
        console.log(user?.password, hashedPassword);
        alert("Please type the old password correctly!");
      } else if (newPassword !== passwordConfirm) {
        alert("Password doesn't match!");
      } else if (newPassword.length < 1) {
        alert("New password is required");
      } else {
        axios
          .post(apis.updatePassword, {
            userId: user?.id,
            password: newPassword,
          })
          .then((res) => {
            actions.getUsers(dispatch);
            actions.getUserInfo(dispatch, localStorage.getItem("userId"));
            alert("updated");
            setOldPassword("");
            setNewPassword("");
            setPasswordConfirm("");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    }
  };

  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <div className="flex flex-col flex-grow">
      <PageTitle
        backIcon={darkMode ? backIconDark : backIconLight}
        createAction={actions.OPEN_CREATE_LEAGUE_DIALOG}
      >
        Settings
      </PageTitle>
      <p className="text-sm text-font-dark-gray my-[20px]">
        <span className="">Settings</span>
        <span className="text-sky-500"> &gt; Personal Information</span>
      </p>
      <div className="flex flex-grow rounded-main bg-white dark:bg-slate overflow-auto p-default">

        {step === 1 ? (
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col flex-grow space-y-5">
              <div className="flex items-center space-x-3">
                <img
                  src={previewURL ? previewURL : user?.avatar}
                  className="w-24 h-24 rounded-full border border-gray-500"
                  alt=""
                />
                <div
                  className="bg-primary h-button rounded-default text-black dark:text-white font-bold text-sm mr-3 w-[180px] hover:opacity-70 cursor-pointer flex justify-center items-center"
                  onClick={() => {
                    fileUploadRef.current?.click();
                  }}
                >
                  Upload New Picture
                </div>
                <input
                  type="file"
                  hidden
                  ref={fileUploadRef}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files.length > 0) {
                      const file = files[0];
                      setChosenFile(file);
                      setPreviewURL(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
              {status === "information" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      className="text-xs rounded-default"
                      placeholder="Type Your First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Input>
                    <Input
                      className="text-xs rounded-default"
                      placeholder="Type Your Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Input>
                    <Input
                      className="text-xs rounded-default"
                      placeholder="Type Email Address*"
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <PasswordInput
                    type="password"
                    className="text-xs rounded-default"
                    placeholder="Type Your Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></PasswordInput>
                  <PasswordInput
                    className="rounded-default text-font-dark-gray text-xs"
                    placeholder="Type Your Password*"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></PasswordInput>
                  <PasswordInput
                    className="rounded-default text-font-dark-gray text-xs"
                    placeholder="Type Your Password*"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  ></PasswordInput>
                  {/* <Input
                    type="password"
                    className="text-xs rounded-default"
                    placeholder="Type Your New Passowrd"
                    option={eyeDisable}
                    required
                  ></Input> */}
                  {/* <Input
                    type="password"
                    className="text-xs rounded-default"
                    placeholder="Retype Your New Passowrd"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    option={eyeDisable}
                  ></Input> */}
                </div>
              )}
              <div className="space-y-5">
                <p
                  onClick={
                    status === "information" ? goToPassword : goToInformation
                  }
                  className="text-black dark:text-white font-medium text-sm cursor-pointer hover:opacity-70 w-fit"
                >
                  {status === "information"
                    ? "Update Password"
                    : "Update Information"}
                </p>
                <button
                  // onClick={
                  //   status === "information"
                  //     ? updateInformation
                  //     : updatePassword
                  // }
                  onClick={handleSubmit}
                  className="bg-primary h-12 text-white font-bold text-sm w-[76px] rounded-default hover:opacity-70"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="flex flex-col flex-grow">
            <AdminTable></AdminTable>
            <img src={horizontalLine} alt="" className="my-5" />
            <div className="flex space-x-3">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex flex-grow rounded-default text-xs"
                placeholder="Type Admin Email Address"
              ></Input>
              <button
                onClick={inviteAdmin}
                className="text-white bg-primary font-bold text-sm w-[78px] h-12 rounded-default"
              >
                Invite
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow">
            {admins.map((admin, idx) => (
              <>
                <div className="flex justify-between">
                  <p className="text-white font-semibold text-sm">
                    Stats tracking {idx + 1}
                  </p>
                  <img src={toggleOn} alt="" className="w-[50px]" />
                </div>

                <hr className="h-px my-4 bg-charcoal border-0" />
              </>
            ))}
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
};

export default Profile;
