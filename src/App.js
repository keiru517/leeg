import './App.css';
import MyLeagues from './pages/leagues';
import Schedule from './pages/schedule';
import Signin1 from './pages/signin/signin1';
import Signin from './pages/signin';
import Signup from './pages/signup';
import OTP from './pages/otp';
// import SignupSuccess from './pages/signup/signupSuccess';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/nav';
import AuthLayout from './components/Layouts/AuthLayout';

function App() {
  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route exact path='/signin1' element={<Signin1 />}></Route>
          <Route exact path='/signin' element={<Signin />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/otp' element={<OTP />}></Route>
          <Route exact path='/myleagues' element={<MyLeagues />}></Route>
          <Route exact path='/schedule' element={<Schedule />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
