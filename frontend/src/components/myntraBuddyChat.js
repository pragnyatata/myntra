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
  const listItems = messages.map((number, index) => {
    let me = number.user === JSON.parse(localStorage.getItem("data")).name;
    if (number.text !== undefined)
      return (
        <li key={index} className={me && "clearfix"}>
          <div className={me ? "message-data float-right" : "message-data "}>
            <span className="message-data-time">
              {new Date().toLocaleTimeString()}
            </span>{" "}
            &nbsp; &nbsp;
            <span className="message-data-name">
              {number.user.toUpperCase()}
            </span>{" "}
            <i className={me ? "fa fa-circle me" : "fa fa-circle online"}></i>
          </div>
          <div
            className={
              !me ? " message my-message" : " message other-message float-right"
            }
          >
            {number.text}
          </div>
        </li>
      );
    else return <img key={index} src={number.file}></img>;
  });
  return (
    <div className="chat-wrapper">
      <div className="chat">
        <div className="chat-header clearfix">
          {/* <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
            alt="avatar"
          /> */}

          <div className="chat-about">
            <div className="chat-with">Chat with Myntra Buddy</div>
            <div className="chat-num-messages">available now</div>
          </div>
          <i className="fa fa-star"></i>
        </div>
        <div className="chat-history" id="chat-history">
          <ul>{listItems}</ul>
        </div>
        <div className="chat-message clearfix">
          {/* <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea> */}
          <Input
            placeholder="Type your message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i className="fa fa-file-image-o"></i>
          <button onClick={(e) => leaveChat()}>Leave Chat</button>
        </div>
      </div>
    </div>
  );
};

export default BuddyChatSocket;
