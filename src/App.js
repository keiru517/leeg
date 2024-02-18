import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import League from "./pages/home/league";
import PublicLeague from "./pages/home/publicLeague";
import Matchup from "./pages/Matchup";
import Team from "./pages/Team";
import PublicTeam from "./pages/Team/publicTeam";
import Blog from "./pages/Blog";
import PublicBlog from "./pages/Blog/publicBlog";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import SignupSuccess from "./pages/signup/signupSuccess";
import OTP from "./pages/otp";
import OTPSent from "./pages/otp/otpSent";
import ForgotPwd from "./pages/password";
import Profile from "./pages/profile";
import AuthLayout from "./components/Layouts/AuthLayout";
import Player from "./pages/home/player";
import PublicPlayer from "./pages/home/publicPlayer";
import ResetPassword from "./pages/password/resetPassword";
import SignupWithEmail from "./pages/signup/signupWithEmail";
import PageNotFound from "./pages/404";
import ImageCropper from "./components/ImageCropper";
import * as actions from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getTeams(dispatch);
    actions.getLeagues(dispatch)
    actions.getPlayers(dispatch);
  }, [])

  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route
            exact
            path="/signupWithEmail"
            element={<SignupWithEmail />}
          ></Route>
          <Route exact path="/signup/:email" element={<Signup />}></Route>
          <Route
            exact
            path="/signupSuccess"
            element={<SignupSuccess />}
          ></Route>
          <Route exact path="/otp" element={<OTP />}></Route>
          <Route exact path="/otpsent" element={<OTPSent />}></Route>
          <Route exact path="/forgotpwd" element={<ForgotPwd />}></Route>
          <Route exact path="/resetpass" element={<ResetPassword />}></Route>
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
          <Route exact path="/league/:leagueId/blog/:blogId" element={<Blog />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/imageCropper" element={<ImageCropper />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          {/* Public link */}
          <Route exact path="/public_league/:leagueId" element={<PublicLeague />}></Route>
          <Route
            exact
            path="/public_league/:leagueId/team/:teamId"
            element={<PublicTeam />}
          ></Route>
          <Route
            exact
            path="/public_league/:leagueId/player/:playerId"
            element={<PublicPlayer />}
          ></Route>
          <Route exact path="/public_league/:leagueId/blog/:blogId" element={<PublicBlog />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
