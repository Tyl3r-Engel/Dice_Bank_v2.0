import { FormControl, InputLabel, Input, FormHelperText, Button, Typography } from "@mui/material"
import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useApiCall from "../../hooks/useApiCall"
import useApp from "../../hooks/useApp"

interface PropTypes { handleClose?: () => void }
export default function LoginForm({ handleClose }: PropTypes) {
  const { setUser } = useApp()
  const navigate = useNavigate()
  const apiCall = useApiCall()

  const usernameInputRef = useRef<HTMLInputElement>()
  const [usernameError, setUsernameError] = useState<boolean>(false)

  const passwordInputRef = useRef<HTMLInputElement>()
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const [responseError, setResponseError] = useState<string>("")

  const handleUsernameChange = e => usernameInputRef.current.value = e.target.value
  const handlePasswordChange = e => passwordInputRef.current.value = e.target.value

  const checkNotNil = (val, cb: CallableFunction)  => {
    if (val === "" || !val) {
      cb(true)
      return true
    }
    return false
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(checkNotNil(usernameInputRef.current.value, setUsernameError)) return
    if(checkNotNil(passwordInputRef.current.value, setPasswordError)) return

    const [data] = await apiCall({
      method: "post",
      route: "/login",
      options: {
      body: {
        "user_name": usernameInputRef.current.value,
        "password": passwordInputRef.current.value
      }
    }})

    if (data?.error) return setResponseError(data?.error)
    const { id, attributes: { display_name, primary_account_num } } = data

    if(handleClose) handleClose()
    setUser({ id, displayName: display_name, primaryAccountNumber: primary_account_num, auth: "authorized"})
    sessionStorage.setItem("userId", id)
    navigate(`/${display_name}/dashboard`)
  }

  return (
    <form onSubmit={handleSubmit} className="login-modal-form">
      <FormControl error={usernameError}>
        <InputLabel htmlFor="username-input">Username</InputLabel>
        <Input
          required
          onChange={handleUsernameChange}
          ref={usernameInputRef}
          id="username-input"
          type="input"
          aria-describedby="username-helper-text"
        />
        <FormHelperText id="username-helper-text">
          {"Enter Username."}
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl error={passwordError}>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input
          required
          onChange={handlePasswordChange}
          ref={passwordInputRef}
          id="password-input"
          type="password"
          aria-describedby="password-helper-text"
        />
        <FormHelperText id="password-helper-text">
          {"Enter a password."}
        </FormHelperText>
      </FormControl>
      <br />
      {
        responseError !== "" && (
          <Typography
            sx={{
              textAlign: "center",
              color: "red",
              textDecoration: "underline"
            }}
          >
            {responseError}
          </Typography>
        )
      }
      <Button type="submit">Login</Button>
    </form>
  )
}