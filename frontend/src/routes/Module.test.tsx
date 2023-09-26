import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Module from "./Module";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockModuleId = "1";
const mockData = {
  id: mockModuleId,
  name: "Test Module",
  description: "This is a test module",
  targetTemperature: 25,
  available: true,
};
const mockMessage = [
  {
    id: mockModuleId,
    temperature: 24,
  },
];

jest.mock("../constants/useSocket", () => ({
  useSocket: jest.fn(() => mockMessage),
}));

jest.mock("../constants/interfaces", () => ({
  IFormInput: {
    name: "",
    description: "",
    targetTemperature: 0,
  },
}));

test("renders loading state", () => {
  render(
    <MemoryRouter initialEntries={[`/modules/${mockModuleId}`]}>
      <Routes>
        <Route path="/modules/:moduleId" element={<Module />}></Route>
      </Routes>
    </MemoryRouter>
  );

  const loadingText = screen.getByText("Loading...");
  expect(loadingText).toBeInTheDocument();
});

test("renders module data", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  render(
    <MemoryRouter initialEntries={[`/modules/${mockModuleId}`]}>
      <Routes>
        <Route path="/modules/:moduleId" element={<Module />}></Route>
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    const descriptionElement = screen.getByText("This is a test module");
    expect(descriptionElement).toBeInTheDocument();
  });
});

test("renders error state", async () => {
  fetchMock.mockRejectOnce();

  render(
    <MemoryRouter initialEntries={[`/modules/${mockModuleId}`]}>
      <Routes>
        <Route path="/modules/:moduleId" element={<Module />}></Route>
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    const errorElement = screen.getByText("Module not found");
    expect(errorElement).toBeInTheDocument();
  });
});

test("opens and closes modal", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  render(
    <MemoryRouter initialEntries={[`/modules/${mockModuleId}`]}>
      <Routes>
        <Route path="/modules/:moduleId" element={<Module />}></Route>
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    screen.getByText("Edit");
  });

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  const modal = screen.getByTestId("modal-body");
  expect(modal).toHaveStyle("display: flex");

  const closeButton = screen.getByAltText("close");
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(modal).toHaveStyle("display: none");
  });
});
