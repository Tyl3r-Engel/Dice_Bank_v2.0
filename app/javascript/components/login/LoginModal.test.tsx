import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import LoginModal from "./LoginModal"

const TestLoginModal = () => (
  <MemoryRouter>
    <LoginModal />
  </MemoryRouter>
)

describe("Login Modal", () => {
  beforeEach(() => {
    render(<TestLoginModal />)
    const modal = screen.getByText("Login")
    fireEvent.click(modal)
  })

  test("modal renders", () => {
    expect(screen.getByRole("presentation", { name: "loginModal" })).toBeInTheDocument()
  })

  test("`X` button closes modal", () => {
    const xButton = screen.getByRole("button", { name: "❌" } )
    fireEvent.click(xButton)
    expect(xButton).not.toBeInTheDocument()
  })

  test("clicking `here` should switch between forms", () => {
    const switch_button = screen.getByText("here")
    fireEvent.click(switch_button)
    expect(screen.getAllByText("Register").length).toBe(2)
    fireEvent.click(switch_button)
    expect(screen.getAllByText("Login").length).toBe(3)
  })
})