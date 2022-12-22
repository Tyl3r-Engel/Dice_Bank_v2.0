import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Header from "./Header"
import AppContext, { appContextDefaults } from "../../contexts/AppProvider"
/*

test that the component renders with no errors
test component renders with props

test component in different states
test component's reaction to events

*/

describe("Header", () => {
  const TestHeader = () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  const _TestHeader = () => (
    <MemoryRouter>
     <AppContext.Provider
        value={
          {
            ...appContextDefaults,
            user: {
              id: 1,
              displayName: "test",
              primaryAccountNumber: null,
              auth: "authorized"
            }
          }
        }
      >
         <Header />
      </AppContext.Provider>
    </MemoryRouter>
  )

  describe("logged in", () => {
    test("renders correctly", () => {
      render(<_TestHeader />)

      const logoElement = screen.getByAltText("logo")
      expect(logoElement).toBeInTheDocument()

      const menuElement = screen.getByRole("button")
      expect(menuElement).toBeInTheDocument()
    })

    test("clicking menu renders the menu", () => {
      render(<_TestHeader />)

      const menuElement = screen.getByRole("button")
      fireEvent.click(menuElement)
      const menu = screen.getByRole("menu")
      expect(menu).toBeInTheDocument()
    })
  })

  describe("logged out", () => {
    test("renders correctly", () => {
      render(<TestHeader />)

      const logoElement = screen.getByAltText("logo")
      expect(logoElement).toBeInTheDocument()

      const loginElement = screen.getByText("Login")
      expect(loginElement).toBeInTheDocument()
    })

    test("clicking login renders login modal", () => {
      render(<TestHeader />)

      const loginElement = screen.getByText("Login")
      fireEvent.click(loginElement)
      const loginUsername = screen.getByLabelText("Username")
      const loginPassword = screen.getByLabelText("Password")
      expect(loginUsername).toBeInTheDocument()
      expect(loginPassword).toBeInTheDocument()
    })
  })

  describe("logo redirect", () => {
    const mockedUsedNavigate = jest.fn()
    beforeEach(() => {
      jest.spyOn(jest.requireActual("react-router"), "useNavigate").mockImplementation(() => mockedUsedNavigate)
    })

    test("clicking redirects to \\home when not logged in", () => {
      render(<TestHeader />)
      const logoElement = screen.getByAltText("logo")
      fireEvent.click(logoElement)
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/home")
    })

    test("clicking redirects to `user.display_name`\\dashboard when logged in", () => {
      render(<_TestHeader />)
      const logoElement = screen.getByAltText("logo")
      fireEvent.click(logoElement)
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/test/dashboard")
    })
  })

})