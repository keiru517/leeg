import React, { useState, useEffect } from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
const Password = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
        <div className="w-46 h-[185px] mx-auto">
          <img src={logo} alt="logo" className="mx-auto" />
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-[#A7A7A7] text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-slate w-full h-[251px] mt-16 rounded-main p-default flex flex-col">
          <div className="h-[55px]">
            <p className="text-white text-2xl font-bold">Forgot password?</p>
            <p className="text-font-light-gray mt-3">
              Please type your email address.
            </p>
          </div>
          <div className="mt-6">
          <Input
            className="rounded-default text-font-dark-gray text-xs mb-6"
            placeholder="Email Address*"
          ></Input>
            <Button className="w-full h-12 dark:bg-primary font-bold">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
