import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input } from "antd";

let socket;
const ENDPOINT = "localhost:8000";
const BuddyChatSocket = ({}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT);

    console.log(socket);

    const userId = localStorage.getItem("user");
    setRoom(userId);
    setName(userId);
    let room = userId;
    socket.emit("join", { userId, room }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);
  return (
    <React.Fragment>
      <div>Chat</div>
      <Input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
    </React.Fragment>
  );
};

export default BuddyChatSocket;
