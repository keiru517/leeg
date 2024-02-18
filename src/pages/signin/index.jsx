import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import axios from "axios";
import { setAuthToken } from "../../utils/authService";
import { useDispatch } from "react-redux";
import * as actions from "../../actions";
import PasswordInput from "../../components/Input/password";
import { isExpired, decodeToken } from "react-jwt";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //   document.documentElement.classList.add('dark')
  // } else {
  //   document.documentElement.classList.remove('dark')
  // }
  
  const handleLogin = () => {
    axios
      .post(apis.signin, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", decodeToken(res.data.token).id);

        setAuthToken(res.data.token);
        actions.getUserInfo(dispatch, decodeToken(res.data.token).id);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        if(error.response && error.response.status !== 502) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <div className="sm:w-auth sm:mx-auto mt-32">
      <div className="bg-white dark:bg-slate w-full rounded-main p-default flex flex-col">
        <div>
          <div>
            <p className="text-black dark:text-white text-2xl font-bold">
              Sign in
            </p>
            <p className="text-font-light-gray mt-3">
              Sign in to access your account.
            </p>
          </div>
          <div className="my-6 space-y-4">
            <input
              className="w-full flex space-x-2 border border-dark-gray items-center px-3 bg-transparent outline-none  dark:text-white flex-grow h-[42px] rounded-default text-font-dark-gray text-xs"
              placeholder="Email Address*"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            ></input>
            <PasswordInput
              className="bg-transparent rounded-default text-font-dark-gray text-xs"
              placeholder="Type Your Password*"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></PasswordInput>
            <p className="dark:text-white text-sm hover:opacity-70">
              <Link to={"/forgotpwd"}>Forgot password?</Link>
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-4">
            <button
              onClick={handleLogin}
              className="w-full h-button text-white font-bold text-sm bg-primary rounded-default hover:bg-opacity-70"
            >
              Login
            </button>
          </div>
          <p className="font-dark-gray text-center">
            Don't have an account?
            {/* <Link to={"/signup"}> */}
            <Link to={"/signupWithEmail"}>
              <span className="text-sky-500 font-bold text-sm"> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
