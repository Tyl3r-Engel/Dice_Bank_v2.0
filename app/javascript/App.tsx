import React from "react"
import Header from "./components/header/Header"
import HomePage from "./components/home_page/HomePage"
import { HomePageProvider } from "./contexts/HomePageProvider"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import ServicePage from "./components/services/ServicePage"
import Footer from "./components/footer/Footer"
import useApp from "./hooks/useApp"
import Dashboard from "./components/user/dashboard/Dashboard"
import { DashboardProvider } from "./contexts/DashboardProvider"
import { NotificationProvider } from "./contexts/NotificationProvider"

export default function App() {
  return (
    <div>
      <Header />
        <div className="app-main-container">
          <Routes>
            <Route element={<NonLoggedIn />}>
              <Route
                path="/home"
                element={
                  <HomePageProvider>
                    <HomePage />
                  </HomePageProvider>
                }
              />

              <Route
                path="/service/:title"
                element={
                  <ServicePage />
                }
              />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/:displayName/dashboard"
                element={
                  <DashboardProvider>
                    <Dashboard />
                  </DashboardProvider>
                }
              />
            </Route>
            <Route path="*" element={<Root />} />
          </Routes>
        </div>
      <Footer />
    </div>
  )
}

function Root() {
  const { user } = useApp()
  const navigate = useNavigate()
  if (user.displayName !== "") navigate(`/${user.displayName}/dashboard`)
  else navigate("/home")
  return <></>
}

function PrivateRoute() {
  const { user } = useApp()
  const navigate = useNavigate()

  switch (user.auth) {
    case "authorized":
      return (
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
      )
    break

    case "unauthorized":
      navigate("home")
      return null //todo add a loading effect
    break
  }
  return null //todo add a loading effect
}

function NonLoggedIn() {
  const { user } = useApp()
  const navigate = useNavigate()

  switch (user.auth) {
    case "unauthorized":
      return <Outlet />
    break

    case "authorized":
      navigate(`/${user.displayName}/dashboard`)
      return null //todo add a loading effect
    break
  }
  return null //todo add a loading effect
}