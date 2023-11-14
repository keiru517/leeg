import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from 'react-router-dom';
import Input from "../../components/Input";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import PasswordInput from "../../components/Input/password";
import apis from "../../utils/apis";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const [token, setToken] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get('token'));
  }, [location]);

  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const handleSubmit = () => {
    // setStep(3);
    if (password === passwordConfirm) {
      axios.post(apis.resetPassword, {resetPassLink:token, newPassword:password}).then((res)=>{
        alert(res.data.message);
      }).catch(error=>{
        alert(error.response.data.message)
      })
    } else {
      alert("Password does not match!");
    }
  };


  return (
    <div className="">
      <div className="sm:w-auth sm:mx-auto">
        <div className="bg-white dark:bg-slate w-full h-[315px] mt-16 rounded-main p-default flex flex-col">
          <div className="h-[55px] mb-3">
            <p className="text-black dark:text-white text-2xl font-bold">Reset password!</p>
            <p className="text-font-light-gray mt-3">
              Please type your password.
            </p>
          </div>
          <div className="my-6 space-y-4">
            <PasswordInput
                className="rounded-default text-font-dark-gray text-xs"
                placeholder="Type Your Password*"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            ></PasswordInput>
            <PasswordInput
                className="rounded-default text-font-dark-gray text-xs"
                placeholder="Retype Your Password*"
                value={passwordConfirm}
                name="password confirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
            ></PasswordInput>
          </div>
          <div className="flex justify-between mb-4">
            <button onClick={handleSubmit} className="w-full h-[48px] bg-primary rounded-lg text-white font-bold hover:bg-opacity-70">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
