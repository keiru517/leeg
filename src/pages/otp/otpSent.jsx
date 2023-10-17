import React from "react";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";

const OTPSent = () => {


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
          <div>
            <p className="text-white text-2xl font-bold">
              Email Sent
            </p>
            <p className="text-font-light-gray text-base mt-3">
              We sent an email to 
              <span className="text-white"> Gio.chichua9@gmail.com </span>
              with a link to reset password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPSent;
