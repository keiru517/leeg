import React, { useState, useEffect } from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import otpLine from "../../assets/img/dark_mode/otp-line.png";

const OTPSent = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
        <div className="w-[164px] h-[185px] mx-auto">
          <img src={logo} alt="logo" className="mx-auto" />
          <img src={hrLine} alt="" className="my-7" />
          <p className="font-dark-gray text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-slate w-full h-[251px] mt-16 rounded-main p-[26px] flex flex-col">
          <div>
            <p className="text-white text-2xl font-bold">
              Email Sent
            </p>
            <p className="text-font-light-gray text-base mt-3">
              We sent an email to 
              <span className="text-white">Gio.chichua9@gmail.com</span>
              with a link to reset password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPSent;
