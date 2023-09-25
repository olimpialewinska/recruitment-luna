import { useEffect, useState } from "react";
import { server } from "../constants/serverLink";
import { Link } from "react-router-dom";
import { IData } from "../constants/interfaces";

export default function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState<IData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(server + "/modules");
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
      <h2 className="text-3xl font-bold mb-10">Modules</h2>
      <div className="flex flex-col gap-6">
        {data.map((item) => (
          <Link
            to={`/${item.id}`}
            key={item.id}
            className="bg-slate-200 shadow-lg rounded-md px-10 py-4 flex flex-row gap-6 justify-between cursor-pointer hover:bg-slate-100 transition-all ease-in-out"
          >
            <h1 className="text-xl">{item.name}</h1>
            <p className="text-xl font-bold">{item.targetTemperature}℃</p>
            {/* <p>{item.available}</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
