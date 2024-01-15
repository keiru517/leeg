import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../components/Input/password";
import upload from "../../assets/img/dark_mode/upload_photo.png";
import apis from "../../utils/apis";
import axios from "axios";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../utils/authService";
import ImageCropperModal from "../../components/Modal/ImageCropperModal";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { email } = useParams();
  const [modalOpen, setModalOpen] = useState(false)

  const [panelHeight, setPanelHeight] = useState("617px");

  const handleBack = () => {
    navigate("/signupWithEmail");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const fileUploadRef = useRef(undefined);
  const [chosenFile, setChosenFile] = useState();
  const [previewURL, setPreviewURL] = useState("");

  const handleSignup = () => {
    if (password != passwordConfirm) {
      alert("Password doesn't match!");
    } else {
      if (
        !chosenFile ||
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !passwordConfirm
      ) {
        alert("Please fill in all data!");
      } else {
        const formData = new FormData();
        formData.append("avatar", chosenFile);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("passwordConfirm", passwordConfirm);

        axios
          .post(apis.signup, formData)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);

            setAuthToken(res.data.token);
            actions.getUserInfo(dispatch, res.data.user.id);
            navigate("/", { replace: true });
          })
          .catch((error) => {
            // navigate('/signupSuccess');

            alert("Error while signup!");
          });
      }
    }
  };

  return (
    <div className="">
      <div className="sm:w-auth sm:mx-auto">
        <div
          className={`bg-white dark:bg-slate w-full h-[${panelHeight}] mt-16 rounded-main p-default flex flex-col`}
        >
          <div>
            <p className="text-black dark:text-white text-2xl font-bold">
              Personal Details
            </p>
            <p className="text-font-light-gray mt-3">
              Username: {email}
            </p>
          </div>
          <div className="">
            <div className="mt-6">
              <div
                className="flex bg-[#F4F4F4] dark:bg-charcoal items-center h-[86px] p-4 rounded-default cursor-pointer"
                onClick={() => {
                  // fileUploadRef.current?.click();
                  setModalOpen(true)
                }}
              >
                {previewURL ? (
                  <img
                    src={previewURL}
                    className="rounded-full w-[58px] h-[58px] mx-2"
                    alt=""
                  />
                ) : (
                  <img src={upload} alt="" />
                )}
                <p className="text-black dark:text-white text-sm ml-[10px]">
                  Upload Picture
                </p>
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
                    }
                  }}
                />
              </div>
              <div className="my-6 space-y-4 ">
                <div className="grid grid-cols-2 gap-4">
                  <input type="email"
                    placeholder="Email Address*"
                    className="absolute -left-full"
                    name="email"
                    value={email}
                  />
                  <input
                    className="w-full flex space-x-2 border border-dark-gray items-center px-3 bg-transparent outline-none  dark:text-white flex-grow h-[42px] rounded-default text-font-dark-gray text-[10px] sm:text-xs"
                    placeholder="Type Your First Name*"
                    value={firstName}
                    name="firstName"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></input>
                  <input
                    className="w-full flex space-x-2 border border-dark-gray items-center px-3 bg-transparent outline-none  dark:text-white flex-grow h-[42px] rounded-default text-font-dark-gray text-[10px] sm:text-xs"
                    placeholder="Type Your Last Name*"
                    value={lastName}
                    name="lastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <PasswordInput
                    className="bg-transparent rounded-default text-font-dark-gray text-[10px] sm:text-xs"
                    type="password"
                    placeholder="Type Your Password*"
                    value={password}
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></PasswordInput>
                  <PasswordInput
                    className="bg-transparent rounded-default text-font-dark-gray text-[10px] sm:text-xs"
                    type="password"
                    placeholder="Retype Your Password*"
                    value={passwordConfirm}
                    name="passwordConfirm"
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                  ></PasswordInput>
                </div>
              </div>
              <div className="flex justify-between mt-6 space-x-3">
                <button
                  onClick={handleBack}
                  className="w-[377px] h-[48px] bg-[#e5e5e5] dark:bg-[#313435] rounded-lg text-black dark:text-white font-bold hover:bg-opacity-70 text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSignup}
                  className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70 disabled:opacity-10 text-sm"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageCropperModal modalOpen={modalOpen} setModalOpen={setModalOpen} setPreviewURL={setPreviewURL} setChosenFile={setChosenFile} />
    </div>
  );
};

export default Signup;
