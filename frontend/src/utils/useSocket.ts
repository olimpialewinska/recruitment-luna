import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { server } from "../constants/serverLink";

interface IMessage {
  id: string;
  temperature: number;
}

export const useSocket = () => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const socket = io(server);
  useEffect(() => {
    socket.on("moduleUpdate", (message) => {
      setMessage(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return message;
};
