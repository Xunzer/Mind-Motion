import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import GamingPage from './gamingPage/gamingPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/stage" element={<GamingPage />} />

      </Routes>
    </Router>
  );
};

export default App;
