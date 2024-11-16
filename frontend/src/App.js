import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import GamingPage from './gamingPage/gamingPage';
import SignUpPage from "./signUpPage/signUpPage"
import IntroPage from "./introPage/introPage"
import DashboardLayoutBasic from './dashboard';

import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/exercise" element={<GamingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/dashboard" element={<DashboardLayoutBasic />} />
      </Routes>
    </Router>
  );
};
export default App;
