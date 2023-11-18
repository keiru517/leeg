import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import League from "./pages/home/league";
import Team from "./pages/Team";
import Matchup from "./pages/home/matchup";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import SignupSuccess from "./pages/signup/signupSuccess";
import OTP from "./pages/otp";
import OTPSent from "./pages/otp/otpSent";
import ForgotPwd from "./pages/password";
import Profile from "./pages/profile";
import AuthLayout from "./components/Layouts/AuthLayout";
import Player from "./pages/home/player";
import React from "react";
import PersonalDetails from "./pages/signup/personalDetails";
import ResetPassword from "./pages/password/resetPassword";
import SignupWithEmail from "./pages/signup/signupWithEmail";

function App() {
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
          <Route
            exact
            path="/personalDetails"
            element={<PersonalDetails />}
          ></Route>
          <Route exact path="/otp" element={<OTP />}></Route>
          <Route exact path="/otpsent" element={<OTPSent />}></Route>
          <Route exact path="/forgotpwd" element={<ForgotPwd />}></Route>
          {/* <Route exact path="/emailSent" element={<EmailSent />}></Route> */}
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
            path="/league/:leagueId/player/:userId"
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
