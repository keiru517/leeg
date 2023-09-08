import React, { useState, useEffect } from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import otpLine from "../../assets/img/dark_mode/otp-line.png";

const OTP = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

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
        <div className="bg-slate w-full h-[305px] mt-16 rounded-main p-default flex flex-col">
          <div>
            <p className="text-white text-2xl font-bold">
              Verify Email Address
            </p>
            <p className="text-font-light-gray text-base mt-3">
              Enter the Code sent to{" "}
              <span className="text-white">Gio.chichua9@gmail.com</span>
            </p>
          </div>
          <div className="flex mb-5 mt-2 space-x-[26px]">
            <div>
              <input
                type="number"
                className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                pattern="^\d{0-9}$"
                maxLength={1}
                max={9}
              />
              <img src={otpLine} alt="" />
            </div>
            <div>
              <input
                type="number"
                className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                maxLength={1}
                max={9}
              />
              <img src={otpLine} alt="" />
            </div>
            <div>
              <input
                type="number"
                className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                maxLength={1}
                max={9}
              />
              <img src={otpLine} alt="" />
            </div>
            <div>
              <input
                type="number"
                className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                maxLength={1}
                max="9"
              />
              <img src={otpLine} alt="" />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <button className="w-[377px] h-button bg-primary rounded-default font-bold text-white hover:bg-opacity-70">Verify</button>
          </div>
          <p className="font-dark-gray text-center">
            Don't receive the Code?
            <span className="text-primary font-semibold "> Resend Code</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTP;
