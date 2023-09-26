import { getColor } from ".";

describe("getTemperatureColor Function", () => {
  it("returns 'text-black' when temperature is undefined", () => {
    const color = getColor(undefined, 25);
    expect(color).toBe("text-black");
  });

  it("returns 'text-green-400' when temperature is within the acceptable range", () => {
    const color = getColor(24.8, 25);
    expect(color).toBe("text-green-400");
  });

  it("returns 'text-red-400' when temperature is outside the acceptable range", () => {
    const color = getColor(26.2, 25);
    expect(color).toBe("text-red-400");
  });
});
