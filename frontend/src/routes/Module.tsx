import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../constants/serverLink";
import Arrow from "../assets/arrow.svg";
import { EditButton } from "../components/EditButton";

interface IData {
  id: string;
  name: string;
  description: string;
  targetTemperature: number;
  available: boolean;
}

export default function Module() {
  let { moduleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData | null>();

  const fetchData = async () => {
    try {
      const response = await fetch(server + `/modules/${moduleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
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
      <div className="bg-slate-200 shadow-lg rounded-md p-10 px-12 flex flex-col gap-6 justify-between max-w-lg m-4 relative items-center">
        <Link to={"/"}>
          <img src={Arrow} alt="arrow" className="absolute top-6 left-4" />
        </Link>
        {data ? (
          <>
            <div className="flex flex-row justify-between w-full">
              <h1 className="text-xl font-bold">{data.name}</h1>
              <p className="text-xl font-bold">{data.targetTemperature}℃</p>
            </div>
            <p className="text-base">{data.description}</p>
            <EditButton
              onClick={() => console.log("click")}
              available={data.available}
            />
            {!data.available && (
              <p className="text-sm">This module is not available</p>
            )}
          </>
        ) : (
          <h1 className="text-xl font-bold">Module not found</h1>
        )}
      </div>
    </div>
  );
}
