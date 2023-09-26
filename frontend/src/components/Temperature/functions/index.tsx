export const getColor = (
  temperature: number | undefined,
  targetTemperature: number
) => {
  if (temperature === undefined) {
    return "text-black";
  }
  if (
    temperature >= targetTemperature - 0.5 &&
    temperature <= targetTemperature + 0.5
  ) {
    return "text-green-400";
  } else {
    return "text-red-400";
  }
};
