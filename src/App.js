import './App.css';
import MyLeagues from './pages/leagues';
import League from './pages/leagues/league';
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

function App() {
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
          <Route exact path='/myleagues' element={<MyLeagues />}></Route>
          <Route exact path='/league' element={<League />}></Route>
          <Route exact path='/player-profile' element={<PlayerProfile />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
