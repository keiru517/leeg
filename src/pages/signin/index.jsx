import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import logo from "../../assets/img/dark_mode/logo.png";
import hrLine from "../../assets/img/dark_mode/hr-line.png";
import eyeDisable from "../../assets/img/dark_mode/eye-disable.png";
import apis from "../../utils/apis";
import axios from "axios";
import { setAuthToken } from "../../utils/authService";
import { useDispatch } from "react-redux";
import * as actions from '../../actions';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post(apis.signin, {
      email: email,
      password: password
    }).then(res=>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id)
      setAuthToken(res.data.token);
      dispatch({type:actions.GET_USER, payload:res.data.user})
      
      navigate('/', {replace:true})

    }).catch(error=>{
      console.log(error.message)
    })
  }

  return (
      <div className="w-auth mx-auto mt-32">
        <div className="w-[164px] h-[185px] mx-auto">
          <div className="flex w-[112px] h-[112px] bg-white dark:bg-slate rounded-full items-center mx-auto">
            <img src={logo} alt="logo" className="mx-auto w-[38px] h-[38px]" />
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
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Input>
              <Input
                className="rounded-default text-font-dark-gray text-xs"
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                option={eyeDisable}
              ></Input>
              <p className="text-white text-sm">Forgot password?</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <button onClick={handleLogin} className="w-[377px] h-button text-white font-bold text-sm bg-primary rounded-default hover:bg-opacity-70">
                Login
              </button>
            </div>
            <p className="font-dark-gray text-center">
              Don't have an account?
              {/* <Link to={"/signup"}> */}
              <Link to={"/singupWithEmail"}>
                <span className="text-sky-500 font-bold text-sm"> Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Signin;
