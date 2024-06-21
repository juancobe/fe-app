import { render, screen, waitFor } from "@testing-library/react"
import api from "@/api"
import "@testing-library/jest-dom"
import Home from "./page"

jest.mock("../../api", () => ({
  apiFetch: jest.fn(),
}))

describe("home page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders main page", async () => {
    ;(api.apiFetch as jest.Mock).mockResolvedValue({
      message: "testAPI - 🙋🙋🙋",
    })

    const Resolved = await Home()

    render(Resolved)

    await waitFor(async () => {
      expect(await screen.getByText(/API - 🙋🙋🙋/i)).toBeInTheDocument()
    })
  })
})
