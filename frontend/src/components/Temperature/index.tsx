import { useCallback } from "react";
import { getColor } from "./functions";

interface ITemperatureProps {
  targetTemperature: number;
  temperature: number | undefined;
}
export const Temperature = (props: ITemperatureProps) => {
  const getTemperatureColor = useCallback(
    () => getColor(props.temperature, props.targetTemperature),
    [props.temperature, props.targetTemperature]
  );

  return (
    <p className={`text-xl font-bold w-28 text-right ${getTemperatureColor()}`}>
      {props.temperature ? props.temperature : props.targetTemperature}℃
    </p>
  );
};
