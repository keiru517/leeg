import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import PasswordInput from "../../components/Input/password";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import upload from "../../assets/img/dark_mode/upload_photo.png";
import logo from "../../assets/img/dark_mode/logo.png";
import apis from "../../utils/apis";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  let { email } = useParams();
  console.log(email);

  const [panelHeight, setPanelHeight] = useState("617px");

  const handleBack = () => {
    navigate('/signupWithEmail');
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
      setIsMatch(false);
      setPanelHeight("355px");
    } else {
      setIsMatch(true);
      if (!chosenFile || !firstName || !lastName || !email || !password || !passwordConfirm)
      {
        alert("Please fill in all data!")
      } else {
        const formData = new FormData();
        formData.append("avatar", chosenFile);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        // formData.append("birthday", birthday);
        formData.append("password", password);
        formData.append("passwordConfirm", passwordConfirm);
        // formData.append("zipCode", zipCode);
        // formData.append("country", country);
        // formData.append("state", state);
        // formData.append("city", city);
        // formData.append("address", address);
    
        axios
          .post(apis.signup, formData)
          .then((res) => {
            navigate("/signupSuccess");
          })
          .catch((error) => {
            // navigate('/signupSuccess');
            alert(error.response.data.message);
          });
      }
    }
  };

  // password confirmation handler
  const [isMatch, setIsMatch] = useState(true);
  useEffect(() => {

  }, [passwordConfirm]);

  return (
    <div className="">
      <div className="sm:w-auth sm:mx-auto">
        {/* <div className="w-[164px] h-[185px] mx-auto">
          <div className="flex w-[112px] h-[112px] bg-white dark:bg-slate rounded-full items-center mx-auto">
            <img src={logo} alt="logo" className="mx-auto w-[38px] h-[38px]" />
          </div>
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-font-light-gray text-sm text-center">LEEG.IO</p>
        </div> */}
        <div
          className={`bg-white dark:bg-slate w-full h-[${panelHeight}] mt-16 rounded-main p-default flex flex-col`}
        >
          <div>
            <p className="text-black dark:text-white text-2xl font-bold">
              Personal Details
            </p>
            <p className="text-font-light-gray mt-3">
              Sign up to access our admin account.
            </p>
          </div>
          <div className="">
            <div className="mt-6">
              <div
                className="flex bg-[#F4F4F4] dark:bg-charcoal items-center h-[86px] p-4 rounded-default cursor-pointer"
                onClick={() => {
                  fileUploadRef.current?.click();
                }}
              >
                {
                  previewURL?
                  <img src={previewURL} className="rounded-full w-[58px] h-[58px] mx-2" alt="" />
                  :
                <img src={upload} alt="" />
                }
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
                      setPreviewURL(URL.createObjectURL(file))
                    }
                  }}
                />
              </div>
              <div className="my-6 space-y-4 ">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    placeholder="Type Your First Name*"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></Input>
                  <Input
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    placeholder="Type Your Last Name*"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></Input>
                  {/* <Input
                      className="bg-transparent rounded-default text-font-dark-gray text-xs"
                      placeholder="Type Your Eamil Address*"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></Input> */}
                  {/* <Input
                      className="bg-transparent rounded-default text-font-dark-gray text-xs"
                      placeholder="Type Your Zip Code*"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                      }}
                    ></Input> */}
                </div>
                {/* <Input
                  className="bg-transparent rounded-default text-font-dark-gray text-xs"
                  option={calendar}
                  placeholder="Enter Date of Birth*"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                  }}
                ></Input> */}
                <div className="grid grid-cols-2 gap-4">
                  <PasswordInput
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    type="password"
                    placeholder="Type Your Password*"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></PasswordInput>
                  <PasswordInput
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    type="password"
                    placeholder="Retype Your Passowrd*"
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                  ></PasswordInput>
                </div>
                {/* <div className="grid grid-cols-2 gap-4">
                    <Select
                      className="rounded-default h-12 w-full text-xs"
                      options={cities}
                      handleClick={(e) => selectCity(e.name)}
                      value={city}
                    >
                      Select Country*
                    </Select>
                    <Input
                      className="bg-transparent rounded-default text-font-dark-gray text-xs"
                      placeholder="Type Your Address*"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    ></Input>
                  </div> */}
              </div>
                {isMatch ? (
                  ""
                ) : (
                  <p className="text-red-700 mt-4">Password does not match</p>
                )}
              <div className="flex justify-between mt-6 space-x-3">
                <button
                  onClick={handleBack}
                  className="w-[377px] h-[48px] bg-[#e5e5e5] dark:bg-[#313435] rounded-lg text-black dark:text-white font-bold hover:bg-opacity-70"
                >
                  Back
                </button>
                <button
                  onClick={handleSignup}
                  className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70 disabled:opacity-10"
                >
                  Create Account
                </button>
              </div>
              {/* <div className="flex justify-between mb-4">
                  <button
                    onClick={handleNext}
                    className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70"
                  >
                    Next
                  </button>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
