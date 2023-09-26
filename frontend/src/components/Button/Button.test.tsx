import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Button } from ".";

describe("Button Component", () => {
  it("renders a clickable button when available is true", () => {
    const onClickMock = jest.fn();
    render(<Button available={true} onClick={onClickMock} />);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders a disabled button when available is false", () => {
    const onClickMock = jest.fn();
    render(<Button available={false} onClick={onClickMock} />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("renders a custom button text when provided", () => {
    render(<Button available={true} onClick={() => {}} text="Custom Text" />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveTextContent("Custom Text");
  });

  it("renders the default 'Edit' text when no text is provided", () => {
    render(<Button available={true} onClick={() => {}} />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveTextContent("Edit");
  });
});
