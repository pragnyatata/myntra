import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input, Button } from "antd";

let socket;
const ENDPOINT = "https://myntraweforshe.herokuapp.com/";
const ENDPOINT2 = "localhost:8000";
const Chat = ({ location, match }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    socket = io(ENDPOINT2);
    const userId = localStorage.getItem("user");
    console.log(match.params.roomId);
    let room = match.params.roomId;
    setName(userId);

    socket.emit("join", { userId, room }, () => {});
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      if (message.text === "Chat Ended") {
        console.log(message);
        setMessages([]);
        window.location = "/user/chat";
      } else setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  const listItems = messages.map((number, index) => {
    console.log(number);
    if (number.text !== undefined) return <li key={index}>{number.text}</li>;
    else return <img key={index} src={number.file}></img>;
  });
  const filechange = (e) => {
    let data = e.target.files[0];
    setImageData(data);
  };
  const readThenSendFile = (data) => {
    var reader = new FileReader();
    reader.onload = function (evt) {
      var msg = {};
      msg.file = evt.target.result;
      msg.fileName = data.name;
      socket.emit("base64 file", msg, match.params.roomId);
    };
    reader.readAsDataURL(data);
  };
  return (
    <React.Fragment>
      <div>CHat</div>
      <Input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <Input
        type="file"
        onChange={(e) => {
          filechange(e);
        }}
      />
      {imageData && (
        <Button onClick={(e) => readThenSendFile(imageData)}>
          Upload Image
        </Button>
      )}
      <div>{listItems}</div>
    </React.Fragment>
  );
};

export default Chat;
