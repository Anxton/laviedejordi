import { useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import Chat from "../chat/Chat";
import Game from "../game/Game";
import NameForm from "../nameform/NameForm";
import "./Content.css";

const Content = () => {
  const { username } = useContext(UserContext);

  const client = useRef<Socket | null>(null);

  // Connect to the server
  useEffect(() => {
    console.log("Connecting to the server");
    const socket = io("https://laviedejordi.alcoolis.me:3000");
    client.current = socket;

    client.current.on("connect", () => {
      console.log("Connected to the server");
    });

    client.current.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Cleanup function
    return () => {
      if (client.current) {
        client.current.offAny();
        client.current.disconnect();
        console.log("Disconnected from the server");
      }
    };
  }, []);

  return (
    <div className="content">
      {!username ? (
        // no name
        <NameForm />
      ) : (
        // name is set
        <>
          <Game client={client.current} />
          <Chat client={client.current} />
        </>
      )}
    </div>
  );
};

export default Content;
