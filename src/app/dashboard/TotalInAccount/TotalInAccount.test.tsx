import React from "react"
import { render, screen } from "@testing-library/react"
import TotalInAccount from "./TotalInAccount"
import "@testing-library/jest-dom"

describe("TotalInAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the total and colors it green when money is over threshold", () => {
    render(<TotalInAccount totalAmount={3000} threshold={50} />)

    expect(screen.getByText(/3000/i)).toBeInTheDocument()
    expect(screen.getByText(/Total in your bank account:/i)).toBeInTheDocument()
    expect(screen.getByTestId("total-in-account")).toHaveClass("green")
  })

  it("renders the total and colors it yellow when money is less than threshold and over 0", () => {
    render(<TotalInAccount totalAmount={20} threshold={50} />)

    expect(screen.getByText(/20/i)).toBeInTheDocument()
    expect(screen.getByText(/Total in your bank account:/i)).toBeInTheDocument()
    expect(screen.getByTestId("total-in-account")).toHaveClass("yellow")
  })

  it("renders the total and colors it yellow when money is less than 0", () => {
    render(<TotalInAccount totalAmount={-20} threshold={50} />)

    expect(screen.getByText(/-20/i)).toBeInTheDocument()
    expect(screen.getByText(/Total in your bank account:/i)).toBeInTheDocument()
    expect(screen.getByTestId("total-in-account")).toHaveClass("red")
  })
})
