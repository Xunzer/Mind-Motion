import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import GamingPage from './gamingPage/gamingPage';
import SignUpPage from "./signUpPage/signUpPage"
import IntroPage from "./introPage/introPage"
import DashboardLayoutBasic from './dashboard';

import './App.css';
import PoseDetection from './pose_detection/pose_detection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/stage" element={<GamingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignUpPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        <Route path="/pose_detection" element={<PoseDetection/>} />
      </Routes>
    </Router>
  );
};
export default App;
