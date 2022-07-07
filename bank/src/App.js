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
import AccountSignUp from './components/accountSignUp/AccountSignUp';
import { AccountSignUpProvider } from './context/AccountSignUpProvider';

function App() {
  const { auth } = useAuth()
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<PersistLogin />} >
            <Route
              path="/checkingAndSavings"
              element={
                <AccountSignUpProvider>
                  <CheckingAndSavings />
                </AccountSignUpProvider>
              }
              replace
            />

            <Route
              path="/creditCard"
              element={
                <AccountSignUpProvider>
                  <CreditCard />
                </AccountSignUpProvider>
              }
              replace
            />

            <Route
              path="/loan"
              element={
                <AccountSignUpProvider>
                  <Loan />
                </AccountSignUpProvider>
              }
              replace
            />

            <Route
              path="/trading"
              element={
                <AccountSignUpProvider>
                  <Trading />
                </AccountSignUpProvider>
              }
              replace
            />

            <Route
              path="/accountSignUp"
              element={
                <AccountSignUpProvider>
                  <AccountSignUp />
                </AccountSignUpProvider>
              }
            />

            <Route
              path="/"
              element={
                auth?.isAuth
                ? <Navigate to="/dashboard" replace />
                : <HomePage />
              }
            />

            <Route
              path="/register"
              element={
                auth?.isAuth
                ? <Navigate to="/dashboard" replace />
                : <Register />
              }
            />

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
