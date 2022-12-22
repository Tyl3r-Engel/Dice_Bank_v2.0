import React from "react"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import HomePage from "./HomePage"

describe("Homepage Hero Img", () => {
  test("renders successfully", () => {
    const { container } = render(<HomePage />)
    expect(container.getElementsByClassName("homePage fade-in").length).toBe(1)
  })
})