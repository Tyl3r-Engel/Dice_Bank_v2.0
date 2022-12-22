import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ServiceBlurbs from "./ServiceBlurbs"

const TestServiceBlurbs = () => (
  <MemoryRouter>
    <ServiceBlurbs />
  </MemoryRouter>
)

describe("Service Blurbs", () => {
  beforeEach(() => render(<TestServiceBlurbs />))
  test("renders successfully", () => {
    //todo
  })
})