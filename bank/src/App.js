import React from 'react';
import HomePage from './components/HomePage/HomePage';
import CheckingAndSavings from './components/serviceInfo/CheckingAndSavings';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/register/Register';
import DashBoard from './components/dashBoard/DashBoard';
import useAuth from './components/hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { DashBoardProvider } from './context/DashBoardProvider';
import PersistLogin from './components/PersistLogin';
import CreditCard from './components/serviceInfo/CreditCard';
import Loan from './components/serviceInfo/Loan';
import Trading from './components/serviceInfo/Trading';

function App() {
  const { auth } = useAuth()
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<PersistLogin />} >
            <Route path="/" element={!auth.isAuth ? <HomePage /> :  <Navigate to="/dashboard" replace /> }/>
            <Route path="/register" element={!auth.isAuth ? <Register /> : <Navigate to="/" replace /> }/>

            <Route path="/checkingAndSavings" element={<CheckingAndSavings />} replace/>
            <Route path="/creditCard" element={<CreditCard />} replace/>
            <Route path="/loan" element={<Loan />} replace/>
            <Route path="/trading" element={<Trading />} replace/>

            <Route element={<ProtectedRoute auth={auth} />}>
              <Route
                path='/dashboard'
                element={
                  <DashBoardProvider>
                    <DashBoard />
                  </DashBoardProvider>
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
