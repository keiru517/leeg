import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import logo from "../../assets/img/dark_mode/logo.png";
import avatar from "../../assets/img/dark_mode/Avatar.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import gmail from "../../assets/img/dark_mode/gmail.png";
import lock from "../../assets/img/dark_mode/lock.png";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";

const Signin = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  return (
    <div className="">
      <div className="w-auth mx-auto mt-32">
        <div className="w-[164px] h-[185px] mx-auto">
          <div className="flex w-[112px] h-[112px] bg-white dark:bg-slate rounded-full items-center mx-auto">
            <img src={avatar} alt="logo" className="mx-auto w-[38px] h-[38px]" />
          </div>
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-font-light-gray text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-white dark:bg-slate w-full h-[390px] mt-16 rounded-main p-default flex flex-col">
          <div>
            <div>
              <p className="text-black dark:text-white text-2xl font-bold">Sign in</p>
              <p className="text-font-light-gray mt-3">
                Sign in to access your account.
              </p>
            </div>
            <div className="my-6 space-y-4">
              <Input
                className="rounded-default text-font-dark-gray text-xs"
                placeholder="Email Address*"
              ></Input>
              <Input
                className="rounded-default text-font-dark-gray text-xs"
                type="password"
                placeholder="Password*"
                option={eyeDisable}
              ></Input>
              <p className="text-white text-sm">Forgot password?</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <button className="w-[377px] h-button text-white font-bold text-sm bg-primary rounded-default hover:bg-opacity-70">
                Login
              </button>
            </div>
            <p className="font-dark-gray text-center">
              Don't have an account?
              <Link to={"/signup"}>
                <span className="text-sky-500 font-bold text-sm"> Sing Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
