import React from "react";
import "core-js";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders app component", () => {
  render(<App />);
  const linkElement = screen.getByText("Loading...");

  expect(linkElement).toBeInTheDocument();
});

test("fetch fail", async () => {
  fetchMock.mockReject();

  render(<App />);

  await waitFor(() => {
    const errorElement = screen.getByText("No modules found");
    expect(errorElement).toBeInTheDocument();
  });
});

test("fetch success", async () => {
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
    const moduleElement = screen.getByText("test");
    expect(moduleElement).toBeInTheDocument();
  });
});
