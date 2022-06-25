import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
export default function ProtectedRoute({ auth, children}) {
  if (!auth.isAuth) {
    return <Navigate to={'/'} replace />
  }

  return children ? children : <Outlet />
};