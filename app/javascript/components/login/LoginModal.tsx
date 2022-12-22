import { Button, Modal, Paper, Typography } from "@mui/material"
import React, { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function LoginModal({ reg }: {reg?: boolean}) {
  const [open, setOpen] = useState<boolean>(false)
  const [switched, setSwitched] = useState<boolean>(reg && true || false)

  const handleSwitch = () => setSwitched(!switched)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div
        className="link-text hover"
        style={{color: "black", textDecoration: "none"}}
        onClick={() => setOpen(true)}
      >
        Login
      </div>
      <Modal
        open={open}
        aria-label="loginModal"
        onClose={handleClose}
        hideBackdrop
      >
        <div className="login-container">
          <div className="login-content-container fade-in">
            <Paper elevation={24}>
              <div className="login-header">
                <div className="login-title">{switched ? "Register" : "Login"}</div>
                <Button className="login-close-button" onClick={handleClose}>❌</Button>
              </div>
              {
                switched ? (
                  <RegisterForm handleClose={handleClose}/>
                ) : (
                  <LoginForm handleClose={handleClose}/>
                )
              }
              <Typography textAlign="center" sx={{ paddingBottom : "1em", display: "inline"}}>
                {switched ? "Have" : "Don't have"} an account?
                <br />
                {switched ? "Login " : "Register "}
              </Typography>
              <div className="link-text hover" style={{display: "inline"}} onClick={handleSwitch}>here</div>
            </Paper>
          </div>
          <div className="login-background-container">
            <div className="login-background-top" onClick={handleClose}></div>
            <div className="login-background-bottom" onClick={handleClose}></div>
          </div>

        </div>
      </Modal>
    </>
  )
}