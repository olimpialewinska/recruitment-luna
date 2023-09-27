import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Temperature } from ".";

describe("Temperature Component", () => {
  it("renders the target temperature", () => {
    render(<Temperature targetTemperature={25} temperature={undefined} />);
    const temperatureElement = screen.getByText("25℃");
    expect(temperatureElement).toBeInTheDocument();
  });

  it("renders the temperature in black when temperature is undefined", () => {
    render(<Temperature targetTemperature={25} temperature={undefined} />);

    const temperatureElement = screen.getByText("25℃");
    expect(temperatureElement).toHaveClass("text-black");
  });

  it("renders the temperature in green when within the acceptable range", () => {
    render(<Temperature targetTemperature={25} temperature={24.8} />);

    const temperatureElement = screen.getByText("24.8℃");
    expect(temperatureElement).toHaveClass("text-green-400");
  });

  it("renders the temperature in red when outside the acceptable range", () => {
    render(<Temperature targetTemperature={25} temperature={26.2} />);

    const temperatureElement = screen.getByText("26.2℃");
    expect(temperatureElement).toHaveClass("text-red-400");
  });
});
