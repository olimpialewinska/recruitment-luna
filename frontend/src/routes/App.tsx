import { useEffect, useState } from "react";
import { server } from "../constants/serverLink";
import { IData } from "../constants/interfaces";
import { Link } from "react-router-dom";
import Available from "../assets/available.svg";
import Unavailable from "../assets/unavailable.svg";
import { Temperature } from "../components/Temperature";
import { useSocket } from "../utils/useSocket";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(server + "/modules");
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  const message = useSocket();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-slate-300 flex flex-col items-center py-10">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-300 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-10">Modules</h2>
      <div className="flex flex-col gap-6">
        {data ? (
          data.map((item) => (
            <Link
              to={`/${item.id}`}
              key={item.id}
              className="bg-slate-200 shadow-lg rounded-md px-10 py-4 flex flex-row gap-10 justify-between cursor-pointer items-center hover:bg-slate-100 transition-all ease-in-out"
            >
              <div className="flex flex-row gap-1 items-center">
                <img
                  src={item.available ? Available : Unavailable}
                  alt="available"
                />
                <h1 className="text-xl">{item.name}</h1>
              </div>
              <Temperature
                targetTemperature={item.targetTemperature}
                temperature={message.find((i) => i.id === item.id)?.temperature}
              />
            </Link>
          ))
        ) : (
          <p className="text-xl font-bold">No modules found</p>
        )}
      </div>
    </div>
  );
}
