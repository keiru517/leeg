import logo from './logo.svg';
import './App.css';
import MainNavication from './components/mainNavigation';
import Songs from './components/songs';
import DarkTable from './components/darkTable';
import MyLeagues from './pages/leagues/myleagues';
import Schedule from './pages/schedule/schedule';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/nav';

function App() {
  return (
    <Router>
      <div className="main justify-center">
        <Nav />
        {/* <PageTitle /> */}
        <Routes>
          <Route exact path='/' element={<MainNavication />}></Route>
          <Route exact path='/songs' element={<Songs />}></Route>
          <Route exact path='/table' element={<DarkTable />}></Route>
          <Route exact path='/myleagues' element={<MyLeagues />}></Route>
          <Route exact path='/schedule' element={<Schedule />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
