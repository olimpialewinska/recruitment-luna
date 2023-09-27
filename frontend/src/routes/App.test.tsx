import React from "react";
import "core-js";
import { act, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("App Component", () => {
  it("should render App component", async () => {
    render(<App />);
    const linkElement = screen.getByText("Loading...");

    await act(async () => {
      expect(linkElement).toBeInTheDocument();
    });
  });

  it("should display info when fetch fails", async () => {
    fetchMock.mockReject();

    render(<App />);

    await waitFor(() => {
      const errorElement = screen.getByText("No modules found");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("should display data when fetch succeeded", async () => {
    const mockSuccessResponse = [
      {
        id: "1",
        name: "test",
        description: "test",
        image: "test",
      },
      {
        id: "2",
        name: "abc",
        description: "test",
        image: "test",
      },
    ];

    fetchMock.mockResponse(JSON.stringify(mockSuccessResponse));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      const moduleElement1 = screen.getByText("test");
      const moduleElement2 = screen.getByText("abc");

      expect(moduleElement1 && moduleElement2).toBeInTheDocument();
    });
  });
});
