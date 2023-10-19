import React from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="sm:w-auth sm:mx-auto sm:mt-32">
      <div className="w-[164px] h-[185px] mx-auto">
          <div className="flex w-[112px] h-[112px] bg-white dark:bg-slate rounded-full items-center mx-auto">
            <img src={logo} alt="logo" className="mx-auto w-[38px] h-[38px]" />
          </div>
          <img src={hrLine} alt="" className="my-7" />
          <p className="text-font-light-gray text-sm text-center">LEEG.IO</p>
        </div>
        <div className="bg-white dark:bg-slate w-full h-[179px] mt-16 rounded-main p-default flex flex-col">
          <div>
            <p className="text-black dark:text-white text-2xl font-bold">
              Your account created
            </p>
            <p className="text-black dark:text-[#BBBBBB] text-base mt-3">
              Thanks for joining Leeg.io!
            </p>
          </div>

          <div className="flex justify-between my-3">
            <button onClick={()=>{navigate('/signin')}} className="w-[377px] h-button bg-primary rounded-lg text-white font-bold hover:bg-opacity-70">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
