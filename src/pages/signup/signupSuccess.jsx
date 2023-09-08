import React, { useState, useEffect } from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import otpLine from "../../assets/img/dark_mode/otp-line.png";

const SignupSuccess = () => {
  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
        <div className="w-[164px] h-[185px] mx-auto">
          <img src={logo} alt="logo" className="mx-auto" />
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-[#ADADAD] text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-slate w-full h-[179px] mt-16 rounded-main p-default flex flex-col">
          <div>
            <p className="text-white text-2xl font-bold">
              Your account created
            </p>
            <p className="text-[#BBBBBB] text-base mt-3">
              Thanks for joining Leeg.io!
            </p>
          </div>

          <div className="flex justify-between mb-4">
            <button className="w-[377px] h-button bg-primary rounded-lg text-white font-bold hover:bg-opacity-70">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
