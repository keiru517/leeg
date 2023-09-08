import React, { useState, useEffect } from "react";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import logo from "../../assets/img/dark_mode/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";

const EmailSent = () => {
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
        <div className="bg-slate w-full h-[251px] mt-16 rounded-main p-default flex flex-col">
          <div className="h-[55px]">
            <p className="text-white text-2xl font-bold">Email Sent</p>
            <p className="text-font-light-gray mt-3">
              We sent and email to Gigi@gmail.com with a link to reset password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
