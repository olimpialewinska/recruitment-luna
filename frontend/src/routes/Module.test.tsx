import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Module from "./Module";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

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

jest.mock("../utils/useSocket", () => ({
  useSocket: jest.fn(() => mockMessage),
}));

jest.mock("../constants/interfaces", () => ({
  IFormInput: {
    name: "",
    description: "",
    targetTemperature: 0,
  },
}));

describe("Module Component", () => {
  it("should render loading state", async () => {
    render(
      <MemoryRouter initialEntries={[`/modules/${mockModuleId}`]}>
        <Routes>
          <Route path="/modules/:moduleId" element={<Module />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      const loadingText = await screen.findByText("Loading...");
      expect(loadingText).toBeInTheDocument();
    });
  });

  it("should render module data", async () => {
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

  it("should render error state", async () => {
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

  it("should open and close modal", async () => {
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
});
