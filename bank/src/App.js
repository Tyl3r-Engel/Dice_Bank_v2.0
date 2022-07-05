import React from 'react';
import HomePage from './components/HomePage/HomePage';
import CheckingAndSavings from './components/serviceInfo/checkingAndSavings/CheckingAndSavings';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/register/Register';
import DashBoard from './components/dashBoard/DashBoard';
import useAuth from './components/hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { DashBoardProvider } from './context/DashBoardProvider';
import PersistLogin from './components/PersistLogin';
import CreditCard from './components/serviceInfo/creditCard/CreditCard';
import Loan from './components/serviceInfo/loan/Loan';
import Trading from './components/serviceInfo/trading/Trading';

function App() {
  const { auth } = useAuth()
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/checkingAndSavings" element={<CheckingAndSavings />} replace/>
          <Route path="/creditCard" element={<CreditCard />} replace/>
          <Route path="/loan" element={<Loan />} replace/>
          <Route path="/trading" element={<Trading />} replace/>

          <Route element={<PersistLogin />} >
            <Route path="/" element={ auth?.isAuth ? <Navigate to="/dashboard" replace /> : <HomePage /> }/>
            <Route path="/register" element={ auth?.isAuth ? <Navigate to="/dashboard" replace /> : <Register /> }/>

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
