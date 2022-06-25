import React, { useEffect, useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/register/Register';
import DashBoard from './components/dashBoard/DashBoard';
import useAuth from './components/hooks/useAuth';
import axios from './api/axios'
import ProtectedRoute from './api/ProtectedRoute';

function App() {
  const { auth, setAuth } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const session = async () => {
      try {
        const { data: {accessToken, username: userName} } = await axios.get('/refresh', { withCredentials : true })
        setAuth({
          isAuth : true,
          userName,
          accessToken
        })
      } catch(e) {

      } finally {
        setIsLoading(false)
      }
    }

    session()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(isLoading) return <p>Page Loading</p>
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!auth.isAuth ? <HomePage /> :  <Navigate to="/dashboard" replace /> }/>
          <Route path="/register" element={!auth.isAuth ? <Register /> : <Navigate to="/" replace /> }/>
          <Route element={<ProtectedRoute auth={auth} />}>
            <Route path='/dashboard' element={<DashBoard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
