import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "./actions";
import Home from "./pages/home";
import League from "./pages/home/league";
import Team from "./pages/Team";
import Matchup from "./pages/home/matchup";
import SigninOption from "./pages/signin/signinOption";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import OTP from "./pages/otp";
import OTPSent from "./pages/otp/otpSent";
import ForgotPwd from "./pages/password";
import Profile from "./pages/profile";
// import SignupSuccess from './pages/signup/signupSuccess';

import AuthLayout from "./components/Layouts/AuthLayout";
import Player from "./pages/home/player";
import avatar from "./assets/img/dark_mode/ronaldo.jpg";
import realMadrid from "./assets/img/dark_mode/real-madrid.png";
import FCBarcelona from "./assets/img/dark_mode/fc-barcelona.jpg";
import teamLogo from "./assets/img/dark_mode/team-logo.png";
import React from "react";

// axios.defaults.baseURL = "http://localhost:3001/api";

function App() {
  const dispatch = useDispatch();

  const getAdmins = () => {
    const admins = [
      { id: 1, playerId:5 },
      { id: 2, playerId: 7 },
    ];

    dispatch({ type: actions.GET_ADMINS, payload: admins });
  };

  actions.getLeagues(dispatch);
  actions.getTeams(dispatch);
  actions.getMatches(dispatch);
  actions.getPlayers(dispatch);

  useEffect(()=>{
    // dispatch(actions.getLeagues(dispatch))

  }, [])
    getAdmins();
  
  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route exact path="/signinOption" element={<SigninOption />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/otp" element={<OTP />}></Route>
          <Route exact path="/otpsent" element={<OTPSent />}></Route>
          <Route exact path="/forgotpwd" element={<ForgotPwd />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/league/:leagueId" element={<League />}></Route>
          <Route
            exact
            path="league/:leagueId/team/:teamId"
            element={<Team />}
          ></Route>
          <Route
            exact
            path="/league/:leagueId/player/:playerId"
            element={<Player />}
          ></Route>
          <Route
            exact
            path="/league/:leagueId/matchup/:matchId"
            element={<Matchup />}
          ></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
