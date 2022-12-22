import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import RegisterForm from "./RegisterForm"
import { privateAxios } from "../../hooks/useApiCall"

const TestRegisterForm = () => (
  <MemoryRouter>
    <RegisterForm />
  </MemoryRouter>
)

const mockData = {
  data: {
    data: {
      "id": "4",
      "type": "user",
      "attributes": {
          "user_name": "test",
          "display_name": "test",
          "primary_account_num": null
      }
    }
  }
}

export const register = () => {
  const username = screen.getByLabelText("Username")
  const displayName = screen.getByLabelText("Display Name")
  const password = screen.getByLabelText("Password")
  fireEvent.change(username, { target: { value: "test" }})
  fireEvent.change(displayName, { target: { value: "test" }})
  fireEvent.change(password, { target: { value: "test" }})
  const submitButton = screen.getByRole("button", { name: "Register" } )
  fireEvent.click(submitButton)
}

describe("Register Form", () => {
  beforeEach(() => render(<TestRegisterForm />))
  test("register form renders correctly", () => {
    const username = screen.getByLabelText("Username")
    const displayName = screen.getByLabelText("Display Name")
    const password = screen.getByLabelText("Password")
    const button = screen.getByRole("button")
    expect(username).toBeInTheDocument()
    expect(displayName).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test("register form should not allow empty values", () => {
    const submitButton = screen.getByRole("button", { name: "Register" } )

    const loginSpy = jest.spyOn(privateAxios, "post")
    fireEvent.click(submitButton)
    expect(loginSpy).not.toHaveBeenCalled()
  })

  test("register should make an api request", () => {
    jest.spyOn(privateAxios, "post").mockImplementation(() => Promise.resolve(mockData))
    register()

    const regSpy = jest.spyOn(privateAxios, "post")
    expect(regSpy).toHaveBeenCalledWith("/register", {"display_name": "test", "password": "test", "user_name": "test"})
  })

  //todo test("register should log user in", () => {
  //todo
  //todo })

  const mockedUsedNavigate = jest.fn()
  beforeEach(() => {
    jest.spyOn(jest.requireActual("react-router"), "useNavigate").mockImplementation(() => mockedUsedNavigate)
  })

  test("Logging in should redirect", () => {
    jest.spyOn(privateAxios, "post").mockImplementation(() => Promise.resolve(mockData))
    register()

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/test/dashboard")
  })
})