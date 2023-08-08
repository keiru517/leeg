import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./pages/home";
import League from "./pages/home/league";
import Team from "./pages/Team";
import SigninOption from "./pages/signin/signinOption";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import OTP from "./pages/otp";
import OTPSent from "./pages/otp/otpSent";
import ForgotPwd from "./pages/password";
// import SignupSuccess from './pages/signup/signupSuccess';

import AuthLayout from "./components/Layouts/AuthLayout";
import Player from "./pages/home/player";
import * as actions from "./actions";
import leagueLogo from "./assets/img/dark_mode/league-logo.png";
import avatar from './assets/img/dark_mode/ronaldo.jpg';
import realMadrid from './assets/img/dark_mode/real-madrid.png';
import FCBarcelona from './assets/img/dark_mode/fc-barcelona.jpg';
import teamLogo from './assets/img/dark_mode/team-logo.png';

function App() {
  const dispatch = useDispatch();

  const getLeagues = () => {
    const leagues = [
      {
        id: 1,
        logo: leagueLogo,
        name: "2023 TABC Summer League",
        start_date: "Firday, July 2023",
        end_date: "N/A",
        description:
          'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.',
      },
      {
        id: 2,
        logo: leagueLogo,
        name: "2024 TABC Winter League",
        start_date: "Firday, July 2023",
        end_date: "N/A",
        description:
          'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.',
      },
    ];

    dispatch({ type: actions.GET_LEAGUES, payload: leagues });
  };

  const getTeams = () => {
    // axios.get WHERE league_id=id
    const teams = [
      {
        id: 1,
        league_id: 1,
        logo: realMadrid,
        name: "Real Madrid",
        position: 2,
        max: 12,
        min: 3,
        waitlist: 10,
        statistics: {
          w: 12,
          l: 6,
          ps: 167,
          pa: 142,
          diff: 27,
        },
      },
      {
        id: 2,
        league_id: 1,
        logo: FCBarcelona,
        name: "FC Barcelona",
        position: 1,
        max: 12,
        min: 3,
        waitlist: 9,
        statistics: {
          w: 10,
          l: 8,
          ps: 142,
          pa: 127,
          diff: 15,
        },
      },
      {
        id: 3,
        league_id: 1,
        logo: teamLogo,
        name: "Manchester City",
        position: 3,
        max: 12,
        min: 3,
        waitlist: 9,
        statistics: {
          w: 10,
          l: 8,
          ps: 142,
          pa: 127,
          diff: 15,
        },
      },
    ];

    dispatch({ type: actions.GET_TEAMS, payload: teams });
  };

  const getMatches = () => {
    const matches = [
      {
        id: 1,
        league_id: 1,
        date: "Monday, June 19th 2023",
        location: "Etihad Stadium",
        time: "8:00 PM",
        home: "Manchester City",
        home_logo: teamLogo,
        away: "Real Madrid",
        away_logo: teamLogo,
        results: "--",
      },
      {
        id: 2,
        league_id: 1,
        date: "Monday, June 19th 2023",
        location: "Anfield",
        time: "8:00 PM",
        home: "Liverpool",
        home_logo: teamLogo,
        away: "Manchester United",
        away_logo: teamLogo,
        results: "--",
      },
    ];

    dispatch({ type: actions.GET_MATCHES, payload: matches });
  };


  const getPlayers = () => {
    const players = [
      {
        id: 17,
        team_id: 1,
        logo: avatar,
        name: "Christiano Ronaldo",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 18,
        team_id: 1,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 19,
        team_id: 1,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 110,
        team_id: 2,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 111,
        team_id: 2,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 112,
        team_id: 1,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 113,
        team_id: 1,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 114,
        team_id: 1,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 115,
        team_id: 2,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
      {
        id: 116,
        team_id: 1,
        logo: avatar,
        name: "2024 TABC Winter League",
        pts: 12,
        jersey_number: 147,
        height: '6"9"(2.06m)',
        weight: "255lb(116kg)",
        country: "Georgia",
        age: "25",
        birthdate: "May 17, 1997",
        statistics: [
          {
            id: 1,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 2,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 3,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
          {
            id: 4,
            game_date: "Thursday, July 13, 2023",
            home_id: 1,
            away_id: 2,
            ps: 17,
            gp: 12,
            ppg: 127,
          },
        ],
      },
    ];

    dispatch({ type: actions.GET_PLAYERS, payload: players });
  };

  useEffect(() => {
    getLeagues();
    getTeams();
    getMatches();
    getPlayers();
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
          <Route exact path="/league/:id" element={<League />}></Route>
          <Route exact path="/team/:id" element={<Team />}></Route>
          <Route exact path="/player/:id" element={<Player />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
