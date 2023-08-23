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

axios.defaults.baseURL = "http://localhost:3001/api";

function App() {
  const dispatch = useDispatch();


  // const getMatches = () => {
  //   const matches = [
  //     {
  //       id: 1,
  //       leagueId: 1,
  //       date: "Monday, June 19th 2023",
  //       location: "Etihad Stadium",
  //       time: "8:00 PM",
  //       home_team_id: 7,
  //       away_team_id: 8,
  //       result: "--",
  //       status: "In Progress",
  //     },
  //     {
  //       id: 2,
  //       leagueId: 1,
  //       date: "Monday, June 19th 2023",
  //       location: "Anfield",
  //       time: "8:00 PM",
  //       home_team_id: 8,
  //       away_team_id: 7,
  //       result: "65 - 77",
  //       status: "Ended",
  //     },
  //   ];

  //   dispatch({ type: actions.GET_MATCHES, payload: matches });
  // };

  const getPlayers = () => {
    const players = [
      {
        id: 17,
        team_id: 1,
        avatar: avatar,
        name: "Christiano Ronaldo",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 2,
            away_team_id: 1,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 3,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 3,
            away_team_id: 1,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 18,
        team_id: 1,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 19,
        team_id: 1,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 110,
        team_id: 2,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 111,
        team_id: 2,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 112,
        team_id: 1,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 113,
        team_id: 1,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 114,
        team_id: 1,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 115,
        team_id: 2,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 2,
            away_team_id: 1,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 3,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 3,
            away_team_id: 1,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 116,
        team_id: 1,
        avatar: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        matchups: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 2,
            away_team_id: 1,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 3,
            away_team_id: 1,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_team_id: 1,
            away_team_id: 3,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
    ];

    dispatch({ type: actions.GET_PLAYERS, payload: players });
  };

  const getAdmins = () => {
    const admins = [
      { id: 1, player_id: 17 },
      { id: 2, player_id: 19 },
    ];

    dispatch({ type: actions.GET_ADMINS, payload: admins });
  };

  useEffect(() => {
    actions.getLeagues(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    // getLeagues();
    // getTeams();
    // getMatches();
    getPlayers();
    getAdmins();
  }, []);

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
            path="league/:leagueId/team/:id"
            element={<Team />}
          ></Route>
          <Route
            exact
            path="/league/:leagueId/player/:id"
            element={<Player />}
          ></Route>
          <Route
            exact
            path="/league/:leagueId/matchup/:match_id"
            element={<Matchup />}
          ></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
