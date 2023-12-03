import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import Input from "../../components/Input";
import PasswordInput from "../../components/Input/password";
import apis from "../../utils/apis";

const Password = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState();

  const location = useLocation();
  const [token, setToken] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get("token"));
  }, [location]);

  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const handleSend = () => {
    setStep(2);
    axios
      .post(apis.forgotPassword, { email })
      .then((res) => {
        // alert(`We sent an email to ${email} with a link to reset password.`);
        // navigate('/emailSent')
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="">
      <div className="sm:w-auth sm:mx-auto">
        {step === 1 && (
          <div className="bg-white dark:bg-slate w-full h-[251px] mt-16 rounded-main p-default flex flex-col">
            <div className="h-[55px]">
              <p className="text-black dark:text-white text-2xl font-bold">
                Forgot password?
              </p>
              <p className="text-font-light-gray mt-3">
                Please type your email address.
              </p>
            </div>
            <div className="mt-6">
              <Input
                className="rounded-default text-font-dark-gray text-xs mb-5"
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <button
                onClick={handleSend}
                className="w-full h-12 bg-primary font-bold dark:text-white rounded-default hover:bg-opacity-70 mb-3"
              >
                Send
              </button>
              <p className="font-dark-gray text-center">
                Go back to
                {/* <Link to={"/signup"}> */}
                <Link to={"/signin"}>
                  <span className="text-sky-500 font-bold text-sm">
                    {" "}
                    Sign In
                  </span>
                </Link>
              </p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="bg-white dark:bg-slate w-full h-[160px] mt-16 rounded-main p-default flex flex-col">
            <div className="h-full flex flex-col justify-between">
              <div>
                <p className="text-white text-2xl font-bold">Email Sent</p>
                <p className="text-font-light-gray mt-3">
                  We sent and email to {email} with a link to reset password.
                </p>
              </div>
              <p className="font-dark-gray text-center">
                Don't receive the Code?
                <span
                  onClick={() => {
                    setStep(1);
                  }}
                  className="text-primary font-semibold cursor-pointer hover:opacity-70"
                >
                  {" "}
                  Resend Code
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Password;
