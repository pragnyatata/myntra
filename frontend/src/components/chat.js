import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input } from "antd";
import "../css/chat.css";

let socket;
const ENDPOINT = "https://myntraweforshe.herokuapp.com/";
const ENDPOINT2 = "localhost:8000";
const Chat = ({ location, match }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
    var objDiv = document.getElementById("chat-history");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  const listItems = messages.map((number, index) => {
    let me = number.user === JSON.parse(localStorage.getItem("data")).name;
    // console.log(me);
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
      // <li key={index}>{number.text}</li> other-message float-right align-right clearfix
    );
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
          {/* <button onClick={sendMessage(e)}>Send</button> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
