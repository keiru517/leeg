import './App.css';
import Home from './pages/home';
import League from './pages/home/league';
import SigninOption from './pages/signin/signinOption';
import Signin from './pages/signin';
import Signup from './pages/signup';
import OTP from './pages/otp';
import OTPSent from './pages/otp/otpSent';
import ForgotPwd from './pages/password';
// import SignupSuccess from './pages/signup/signupSuccess';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthLayout from './components/Layouts/AuthLayout';
import PlayerProfile from './pages/profile/playerProfile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import logo from "./assets/img/dark_mode/team-logo.png";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const leagues = [
      {
        id: 1,
        logo: logo,
        name: "2023 TABC Summer League",
        start_date: "Firday, July 2023",
        end_date: "N/A",
        description:
          'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.',
      },
      {
        id: 2,
        logo: logo,
        name: "2024 TABC Winter League",
        start_date: "Firday, July 2023",
        end_date: "N/A",
        description:
          'introducing the "Gravity Hoops League" - where hardwood battles and soaring dunks collide in a symphony of athleticism and teamwork.',
      },
    ];

    dispatch({type: actions.GET_LEAGUES, payload:leagues})
  }, [])

  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route exact path='/signinOption' element={<SigninOption />}></Route>
          <Route exact path='/signin' element={<Signin />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/otp' element={<OTP />}></Route>
          <Route exact path='/otpsent' element={<OTPSent />}></Route>
          <Route exact path='/forgotpwd' element={<ForgotPwd />}></Route>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/league/:id' element={<League />}></Route>
          {/* <Route exact path='/league' element={<League />}></Route> */}
          <Route exact path='/player-profile' element={<PlayerProfile />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
