import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import GamingPage from './gamingPage/gamingPage';
import Sign_Up_Page from "./Sign_Up_Page/Sign_Up_Page"
import Intro_page from "./Intro_Page/Intro_Page"
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/stage" element={<GamingPage />} />
        <Route path="/sign_up" element={<Sign_Up_Page />} />
        <Route path="/intro" element={<Intro_page />} />
      </Routes>
    </Router>
  );
};

export default App;
