import React, { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';

export default function DashBoard() {
  const { auth } = useContext(AuthContext)
  if(!auth?.isAuth) return <Navigate to='/' />
  return(
    <div>
        <NavBar />
      {`this is ${auth.userName} Dash Board`}
    </div>
  )
}