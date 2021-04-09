import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, Input } from "antd";

let socket;
const ENDPOINT = "https://myntraweforshe.herokuapp.com/";
const ENDPOINT2 = "localhost:8000";
const BuddyChatSocket = ({}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT2);

    const userId = localStorage.getItem("user");
    setRoom(userId);
    setName(userId);
    let room = userId;
    socket.emit("join", { userId, room }, (error) => {});
  }, []);
  useEffect(() => {
    socket.on("message", (message) => {
      if (message.text === "Chat Ended") {
        setMessages([]);
      } else {
        setMessages([...messages, message]);
      }
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  const leaveChat = () => {
    socket.emit("sendMessage", "Chat Ended", () => setMessage(""));
    setMessages([]);
  };
  const listItems = messages.map((number, index) => (
    <li key={index}>{number.text}</li>
  ));
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
      <div>{listItems}</div>
      <Button onClick={(e) => leaveChat()}>Leave Chat</Button>
    </React.Fragment>
  );
};

export default BuddyChatSocket;
