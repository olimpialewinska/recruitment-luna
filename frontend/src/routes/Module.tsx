import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../constants/serverLink";
import Arrow from "../assets/arrow.svg";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { IFormInput } from "../constants/interfaces";
import { useSocket } from "../utils/useSocket";
import { Temperature } from "../components/Temperature";

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
  const [open, setOpen] = useState(false);
  const message = useSocket();

  const toggleModal = () => {
    setOpen(true);
  };

  const sendData = async (formData: IFormInput) => {
    try {
      const response = await fetch(server + `/modules/${moduleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  const closeModal = (data?: IFormInput) => {
    if (data) {
      sendData(data);
    }
    setOpen(false);
  };

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
              <Temperature
                targetTemperature={data.targetTemperature}
                temperature={
                  message && message.find((i) => i.id === data.id)?.temperature
                }
              />
            </div>
            <p className="text-base">{data.description}</p>
            <Button onClick={toggleModal} available={data.available} />
            {!data.available && (
              <p className="text-sm">This module is not available</p>
            )}
            <Modal
              open={open}
              onClose={closeModal}
              data={{
                name: data?.name,
                description: data?.description,
                targetTemperature: data?.targetTemperature,
              }}
            />
          </>
        ) : (
          <h1 className="text-xl font-bold">Module not found</h1>
        )}
      </div>
    </div>
  );
}
