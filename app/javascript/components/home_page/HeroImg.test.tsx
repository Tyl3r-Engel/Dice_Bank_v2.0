import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import HeroImg from "./HeroImg"

describe("Homepage Hero Img", () => {
  test("renders successfully", () => {
    render(<HeroImg />)
    expect(screen.getByAltText("hero-img")).toBeInTheDocument()
  })
})