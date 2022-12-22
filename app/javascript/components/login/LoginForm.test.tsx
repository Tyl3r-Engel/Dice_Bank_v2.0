import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import LoginForm from "./LoginForm"
import { privateAxios } from "../../hooks/useApiCall"

const TestLoginForm = () => (
  <MemoryRouter>
    <LoginForm />
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

const login = () => {
  const username = screen.getByLabelText("Username")
  const password = screen.getByLabelText("Password")
  fireEvent.change(username, { target: { value: "test" }})
  fireEvent.change(password, { target: { value: "test" }})
  const submitButton = screen.getByRole("button", { name: "Login" } )
  fireEvent.click(submitButton)
}

describe("Login Form", () => {
  beforeEach(() => render(<TestLoginForm />))
  test("login form renders correctly", () => {
    const username = screen.getByLabelText("Username")
    const password = screen.getByLabelText("Password")
    const button = screen.getByRole("button")
    expect(username).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test("login form should not allow empty values", () => {
    const submitButton = screen.getByRole("button", { name: "Login" } )

    const loginSpy = jest.spyOn(privateAxios, "post")
    fireEvent.click(submitButton)
    expect(loginSpy).not.toHaveBeenCalled()
  })

  test("login should make an api request", async () => {
    jest.spyOn(privateAxios, "post").mockImplementation(() => Promise.resolve(mockData))
    login()

    const loginSpy = jest.spyOn(privateAxios, "post")
    expect(loginSpy).toHaveBeenCalled()
  })

  //todo test("login should log user in", () => {
  //todo
  //todo })

  const mockedUsedNavigate = jest.fn()
  beforeEach(() => {
    jest.spyOn(jest.requireActual("react-router"), "useNavigate").mockImplementation(() => mockedUsedNavigate)
  })

  test("Logging in should redirect", () => {
    jest.spyOn(privateAxios, "post").mockImplementation(() => Promise.resolve(mockData))
    login()

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/test/dashboard")
  })
})
