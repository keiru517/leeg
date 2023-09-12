import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
import otpLine from "../../assets/img/dark_mode/otp-line.png";
import apis from "../../utils/apis";

const SignupWithEmail = () => {
  const leagues = [1, 2, 3, 4, 5, 6];

  const options = ["Sort by", "Ascend", "Descend", "Recent"];

  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [fourth, setFourth] = useState();

  const [code, setCode] = useState();

  const [email, setEmail] = useState("");
  const handleClick = () => {
    setStep(2);
    sendOTP()
  }

  const sendOTP = () => {
    console.log('sent otp', apis.verifyEmail)
    axios.post(apis.verifyEmail, {
      email: email
    }).then(res=>{
      const verifyCode = res.data.code;
      setCode(verifyCode);
    }).catch((error)=>{
      console.log(error)
      alert("Error")
    });
  }

  const handleVerify = () => {
    console.log(first+second+third+fourth)
    if (code == first+second+third+fourth) {
      navigate('/signup');
    } else {
      alert("Incorrect verification code")
    }
  }


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
        {step == 1 ? (
          <div className="bg-slate w-full h-[251px] mt-16 rounded-main p-default flex flex-col">
            <div className="h-[55px]">
              <p className="text-white text-2xl font-bold">Sign up!</p>
              <p className="text-font-light-gray mt-3">
                Enter your email address.
              </p>
            </div>
            <div className="mt-6">
              <Input
                className="rounded-default text-font-dark-gray text-xs mb-6"
                placeholder="Type your email address"
                value={email}
                onChange = {(e)=>setEmail(e.target.value)}
              ></Input>
              <button
                onClick={handleClick}
                className="w-full h-12 bg-primary font-bold text-white rounded-default hover:bg-opacity-70"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : step == 2 ? (
          <div className="bg-slate w-full h-[335px] mt-16 rounded-main p-default flex flex-col">
            <div>
              <p className="text-white text-2xl font-bold">
                Verify Email Address
              </p>
              <p className="text-font-light-gray text-base mt-3">
                Enter the Code sent to{" "}
                <span className="text-white">{email}</span>
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
                  value={first}
                  onChange={(e)=>setFirst(e.target.value.toString())}
                  />
                <img src={otpLine} alt="" />
              </div>
              <div>
                <input
                  type="number"
                  className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                  maxLength={1}
                  max={9}
                  value={second}
                  onChange={(e)=>setSecond(e.target.value.toString())}
                  />
                <img src={otpLine} alt="" />
              </div>
              <div>
                <input
                  type="number"
                  className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                  maxLength={1}
                  max={9}
                  value={third}
                  onChange={(e)=>setThird(e.target.value.toString())}
                  />
                <img src={otpLine} alt="" />
              </div>
              <div>
                <input
                  type="number"
                  className="bg-transparent outline-none text-white text-[52px] w-[75px] text-center h-16 mb-4"
                  maxLength={1}
                  max="9"
                  value={fourth}
                  onChange={(e)=>setFourth(e.target.value.toString())}
                />
                <img src={otpLine} alt="" />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <button onClick={handleVerify} className="w-[377px] h-button bg-primary rounded-default font-bold text-white hover:bg-opacity-70">
                Verify
              </button>
            </div>
            <p className="font-dark-gray text-center">
              <span onClick={() => setStep(1)} className="text-primary font-semibold cursor-pointer hover:opacity-70">Change Email</span>
            </p>
            <p className="font-dark-gray text-center">
              Don't receive the Code?
              <span onClick={sendOTP} className="text-primary font-semibold cursor-pointer hover:opacity-70"> Resend Code</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SignupWithEmail;
