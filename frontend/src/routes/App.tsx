import { useEffect, useState } from "react";
import { server } from "../constants/serverLink";
import { Link } from "react-router-dom";
import { IData } from "../constants/interfaces";
import Available from "../assets/available.svg";
import Unavailable from "../assets/unavailable.svg";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(server + "/modules");
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

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
              <p className="text-xl font-bold">{item.targetTemperature}℃</p>
            </Link>
          ))
        ) : (
          <p className="text-xl font-bold">No modules found</p>
        )}
      </div>
    </div>
  );
}
