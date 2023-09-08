import React, { useState, useEffect, useRef } from "react";
import Input from "../../components/Input";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import upload from "../../assets/img/dark_mode/upload_photo.png";
import calendar from "../../assets/img/dark_mode/calendar.png";
import Select from "../../components/Select";
import logo from "../../assets/img/dark_mode/logo.png";

const countries = [
  { id: 0, name: "United States" },
  { id: 1, name: "France" },
];
const states = [
  { id: 0, name: "New York" },
  { id: 1, name: "Los Angelos" },
];
const cities = [
  { id: 0, name: "New York" },
  { id: 1, name: "Los Angelos" },
];
const Signup = () => {
  const [step, setStep] = useState(1);
  const [panelHeight, setPanelHeight] = useState("617px");
  const handleNext = () => {
    setStep(2);
    setPanelHeight("315px");
  };

  const handleBack = () => {
    setStep(1);
    setPanelHeight("617px");
  };

  const [country, setCountry] = useState("Select Country*");
  const selectCountry = (value) => {
    setCountry(value);
  };
  const [state, setState] = useState("Select State*");
  const selectState = (value) => {
    setState(value);
  };
  const [city, setCity] = useState("Select City*");
  const selectCity = (value) => {
    setCity(value);
  };

  const fileUploadRef = useRef(undefined);
  const [chosenFile, setChosenFile] = useState();

  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
      <div className="w-[164px] h-[185px] mx-auto">
          <div className="flex w-[112px] h-[112px] bg-white dark:bg-slate rounded-full items-center mx-auto">
            <img src={logo} alt="logo" className="mx-auto w-[38px] h-[38px]" />
          </div>
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-font-light-gray text-sm text-center">LEEG.IO</p>
        </div>
        <div
          className={`bg-white dark:bg-slate w-full h-[${panelHeight}] mt-16 rounded-main p-default flex flex-col`}
        >
          <div>
            <p className="text-white text-2xl font-bold">Personal Details</p>
            <p className="text-font-light-gray mt-3">
              Sign up to access our admin account.
            </p>
          </div>
          <div className="">
            {step === 1 ? (
              <div className="mt-6">
                <div
                  className="flex bg-charcoal items-center h-[86px] p-4 rounded-default cursor-pointer"
                  onClick={() => {
                    fileUploadRef.current?.click();
                  }}
                >
                  <img src={upload} alt="" />
                  <p className="text-white text-sm ml-[10px]">Upload Picture</p>
                  <input type="file" ref={fileUploadRef} hidden />
                </div>
                <div className="my-6 space-y-4 ">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      className="bg-transparent rounded-default text-font-dark-gray text-xs"
                      placeholder="Type Your First Name*"
                    ></Input>
                    <Input
                      className="bg-transparent rounded-default text-font-dark-gray text-xs"
                      placeholder="Type Your Last Name*"
                    ></Input>
                  </div>
                  <Input
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    option={calendar}
                    placeholder="Enter Date of Birth"
                  ></Input>
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      className="rounded-default h-12 w-full text-xs"
                      options={countries}
                      handleClick={(e) => selectCountry(e.name)}
                      value={country}
                    >
                      Select Country*
                    </Select>
                    <Select
                      className="rounded-default h-12 w-full text-xs"
                      options={states}
                      handleClick={(e) => selectState(e.name)}
                      value={state}
                    >
                      Select State*
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                    ></Input>
                  </div>
                  <Input
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    placeholder="Type Your Zip Code*"
                  ></Input>

                </div>
                <div className="flex justify-between mb-4">
                  <button
                    onClick={handleNext}
                    className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="my-6 space-y-4 ">
                  <Input
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    type="password"
                    placeholder="Type Your Password*"
                    option={eyeDisable}
                  ></Input>
                  <Input
                    className="bg-transparent rounded-default text-font-dark-gray text-xs"
                    type="password"
                    placeholder="Retype Your Passowrd*"
                    option={eyeDisable}
                  ></Input>
                </div>
                <div className="flex justify-between mb-4 space-x-3">
                  <button onClick={handleBack} className="w-[377px] h-[48px] bg-[#e5e5e5] dark:bg-[#313435] rounded-lg text-white font-bold hover:bg-opacity-70">
                    Back
                  </button>
                  <button className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70">
                    Create Account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
