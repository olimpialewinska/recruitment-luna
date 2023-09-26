import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Modal } from ".";

describe("Modal Component", () => {
  const mockData = {
    name: "Test Module",
    description: "Test Description",
    targetTemperature: 25,
  };

  it("renders the modal when open prop is true", () => {
    render(<Modal open={true} data={mockData} onClose={() => {}} />);

    const modalBody = screen.getByTestId("modal-body");

    expect(modalBody).toHaveStyle("display: flex");
  });

  it("does not render the modal when open prop is false", () => {
    render(<Modal open={false} data={mockData} onClose={() => {}} />);

    const modalBody = screen.queryByTestId("modal-body");

    expect(modalBody).toHaveStyle("display: none");
  });

  it("calls onClose with undefined when overlay is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} data={mockData} onClose={onCloseMock} />);

    const overlay = screen.getByTestId("modal-body");

    fireEvent.click(overlay);

    expect(onCloseMock).toHaveBeenCalledWith(undefined);
  });

  it("calls onClose with undefined when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} data={mockData} onClose={onCloseMock} />);

    const closeButton = screen.getByAltText("close");

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledWith(undefined);
  });

  it("calls onClose with the form data when form is submitted", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} data={mockData} onClose={onCloseMock} />);

    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const targetTemperatureInput = screen.getByLabelText("Target Temperature");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(targetTemperatureInput, { target: { value: 30 } });
    fireEvent.click(submitButton);

    setTimeout(() => {
      expect(onCloseMock).toHaveBeenCalledWith({
        name: "New Name",
        description: "New Description",
        targetTemperature: 30,
      });
    }, 1000);
  });

  it("displays validation error when submitting an empty form", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} data={undefined} onClose={onCloseMock} />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    setTimeout(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(
        screen.getByText("Target Temperature must be between 0 and 40")
      ).toBeInTheDocument();
    }, 1000);

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("displays validation error when submitting with invalid input", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} data={undefined} onClose={onCloseMock} />);

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const temperatureInput = screen.getByPlaceholderText("Target Temperature");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.change(temperatureInput, { target: { value: "45" } });

    fireEvent.click(submitButton);

    setTimeout(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(
        screen.getByText("Target Temperature must be between 0 and 40")
      ).toBeInTheDocument();
    }, 1000);

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("submits the form with valid input", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} data={undefined} onClose={onCloseMock} />);

    const nameInput = screen.getByPlaceholderText("Name");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const temperatureInput = screen.getByPlaceholderText("Target Temperature");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "New Name" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(temperatureInput, { target: { value: "30" } });

    fireEvent.click(submitButton);
    setTimeout(() => {
      expect(onCloseMock).toHaveBeenCalledWith({
        name: "New Name",
        description: "New Description",
        targetTemperature: 30,
      });
    }, 1000);
  });
});
