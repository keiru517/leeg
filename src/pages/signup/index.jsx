import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import lock from "../../assets/img/dark_mode/lock.png";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import upload from "../../assets/img/dark_mode/upload_photo.png";
import calendar from "../../assets/img/dark_mode/calendar.png";
import updown from "../../assets/img/dark_mode/updown.png";
import user from "../../assets/img/dark_mode/user.png";
import Select from "../../components/Select";

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

  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
        <div className="w-[164px] h-[185px] mx-auto">
          <img src={logo} alt="logo" className="mx-auto" />
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-[#ADADAD] text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-slate w-full h-[617px] mt-16 rounded-main p-default flex flex-col">
          <div>
            <p className="text-white text-2xl font-bold">Personal Details</p>
            <p className="text-font-light-gray mt-3">
              Sign up to access our admin account.
            </p>
          </div>
          <div className="mt-6">
            <div className="flex bg-charcoal items-center h-[86px] p-4 rounded-default">
              <img src={upload} alt="" />
              <p className="text-white text-sm ml-[10px]">Upload Picture</p>
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
{/* 
              <Input
                className="bg-transparent rounded-default text-font-dark-gray text-xs"
                type="password"
                placeholder="Password"
                option={eyeDisable}
              ></Input>
              <Input
                className="bg-transparent rounded-default text-font-dark-gray text-xs"
                type="text"
                placeholder="Type Email Address*"
              ></Input>
              <Input
                className="bg-transparent rounded-default text-font-dark-gray text-xs"
                type="text"
                placeholder="Enter Date of Birth"
                option={calendar}
              ></Input> */}
            </div>
            <div className="flex justify-between mb-4">
              <button className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
