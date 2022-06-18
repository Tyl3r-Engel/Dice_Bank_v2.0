import React from 'react';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>

    </Router>
  );
}

export default App;
