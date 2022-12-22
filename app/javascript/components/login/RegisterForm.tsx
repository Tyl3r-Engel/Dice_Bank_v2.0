import { FormControl, FormHelperText, Input, InputLabel, Button, Typography } from "@mui/material"
import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useApiCall from "../../hooks/useApiCall"
import useApp from "../../hooks/useApp"

interface PropTypes { handleClose?: () => void }
export default function RegisterForm({ handleClose }: PropTypes) {
  const { setUser } = useApp()
  const navigate = useNavigate()
  const apiCall = useApiCall()

  const usernameInputRef = useRef<HTMLInputElement>()
  const [usernameError, setUsernameError] = useState<boolean>(false)

  const displayNameInputRef = useRef<HTMLInputElement>()
  const [displayNameError, setDisplayNameError] = useState<boolean>(false)

  const passwordInputRef = useRef<HTMLInputElement>()
  const [passwordError, setPasswordError] = useState<boolean>(false)

  const [responseError, setResponseError] = useState<string>("")

  const handleUsernameChange = e => usernameInputRef.current.value = e.target.value
  const handlePasswordChange = e => passwordInputRef.current.value = e.target.value
  const handleDisplayNameChange = e => displayNameInputRef.current.value = e.target.value

  const checkNotNil = (val, cb: CallableFunction)  => {
    if (val === "" || !val) {
      cb(true)
      return true
    }
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(checkNotNil(usernameInputRef.current.value, setUsernameError)) return
    if(checkNotNil(displayNameInputRef.current.value, setDisplayNameError)) return
    if(checkNotNil(passwordInputRef.current.value, setPasswordError)) return

    const [data] = await apiCall({
      method: "post",
      route: "/register",
      options: {
          isPrivate: true,
          body: {
            "user_name": usernameInputRef.current.value,
            "display_name": displayNameInputRef.current.value,
            "password": passwordInputRef.current.value
          }
        }
      }
    )

    if(data.error) return setResponseError(data.error)
    const { id, attributes: { display_name, primary_account_num } } = data

    if(handleClose) handleClose()
    setUser({ id, displayName: display_name, primaryAccountNumber: primary_account_num, auth: "authorized"})
    sessionStorage.setItem("userId", id)
    navigate(`/${displayNameInputRef.current.value}/dashboard`)
  }

  return (
    <form onSubmit={handleSubmit} className="login-modal-form">
      <FormControl error={usernameError}>
        <InputLabel htmlFor="username-input">Username</InputLabel>
        <Input
          required
          ref={usernameInputRef}
          onChange={handleUsernameChange}
          id="username-input"
          type="input"
          aria-describedby="username-helper-text"
        />
        <FormHelperText id="username-helper-text">
          {"Enter your username. This will be required for login!"}
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl error={displayNameError}>
        <InputLabel htmlFor="display-name-input">Display Name</InputLabel>
        <Input
          required
          ref={displayNameInputRef}
          onChange={handleDisplayNameChange}
          id="display-name-input"
          type="input"
          aria-describedby="display-name-helper-text"
        />
        <FormHelperText id="display-name-helper-text">
          {"Enter a display name. This can be changed later."}
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl error={passwordError}>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input
          required
          ref={passwordInputRef}
          onChange={handlePasswordChange}
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
      <Button type="submit">Register</Button>
    </form>
  )
}