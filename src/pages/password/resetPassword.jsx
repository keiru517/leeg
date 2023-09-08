import React, { useState, useEffect } from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Input from "../../components/Input";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";

const ResetPassword = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
        <div className="w-[164px] h-[185px] mx-auto">
          <img src={logo} alt="logo" className="mx-auto" />
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-[#ADADAD] text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-slate w-full h-[315px] mt-16 rounded-main p-default flex flex-col">
          <div className="h-[55px] mb-3">
            <p className="text-white text-2xl font-bold">Reset password!</p>
            <p className="text-font-light-gray mt-3">
              Please type your password.
            </p>
          </div>
          <div className="my-6 space-y-4">
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
          <div className="flex justify-between mb-4">
            <button className="w-[377px] h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
