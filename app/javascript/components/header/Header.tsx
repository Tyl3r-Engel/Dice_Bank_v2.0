import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import HeaderMenu from "./HeaderMenu"
import LoginModal from "../login/LoginModal"
import { useNavigate } from "react-router-dom"
import useApp from "../../hooks/useApp"

export default function Header() {
  const { user } = useApp()
  const navigate = useNavigate()

  return (
      <AppBar sx={{ background: "rgb(239, 235, 235)", marginBottom: "30px" }} position="sticky">
        <Toolbar>
          <img
            className="header-logo-img hover"
            src="http://localhost:3000/api/assets/images/logo2.png"
            alt="logo"
            loading="lazy"
            onClick={() => user.displayName ? navigate(`/${user.displayName}/dashboard`) : navigate("/home")}
          />
          <div className="header-menu-container">
            {
              user.auth === "authorized" ? (
                <HeaderMenu />
              ) : (
                <div className="header-login-container">
                  <LoginModal />
                </div>
              )
            }
          </div>
        </Toolbar>
      </AppBar>
  )
}