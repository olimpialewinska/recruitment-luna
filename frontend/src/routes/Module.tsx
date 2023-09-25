import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../constants/serverLink";

interface IData {
  id: string;
  name: string;
  description: string;
  targetTemperature: number;
  available: boolean;
}

export default function Module() {
  let { moduleId } = useParams();
  const [data, setData] = useState<IData>();

  const fetchData = async () => {
    try {
      const response = await fetch(server + `/modules/${moduleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen bg-slate-300 flex flex-col items-center py-10">
      <div className="bg-slate-200 shadow-lg rounded-md p-10 flex flex-col gap-6 justify-between max-w-lg m-4">
        <h1 className="text-xl font-bold">{data?.name}</h1>
        <p className="text-xl">{data?.description}</p>
        <p className="text-xl font-bold">{data?.targetTemperature}℃</p>

        {/* <p>{item.available}</p> */}
      </div>
    </div>
  );
}
