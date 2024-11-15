import logo from './logo.svg';
import './App.css';
import PoseDetection from './post_detection/pose_detection';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pose_detection" element={<PoseDetection/>} />
      </Routes>
    </Router>
  );
};

export default App;
