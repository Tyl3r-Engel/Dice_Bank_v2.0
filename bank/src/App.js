import React from 'react';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/register/Register';
import DashBoard from './components/dashBoard/DashBoard';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>

    </Router>
  );
}

export default App;
