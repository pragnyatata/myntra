import { Button, Col, Row, notification } from "antd/lib";
import React, { Component } from "react";
import { buddyCount } from "../apis";
import "../css/userchat.css";
import img from "../assets/chat.svg";

export default class UserChat extends Component {
  onChatClick = () => {
    console.log("I was hit");
    buddyCount()
      .then((response) => {
        console.log(response);
        if (response.id) window.location = `/chat/${response.id}`;
        else if (response.error || !response.lenght) this.openNotification();
      })
      .catch((err) => console.log(err));
  };
  openNotification = () => {
    notification.open({
      message: "Hey there user!",
      description:
        "Our Myntra Buddies are all busy in helping out various queries. Please try again later.",
      duration: 3.5,
      className: "popup",
    });
  };
  render() {
    return (
      <Row className="user-chat">
        <Col md={12}>
          <div className="content-wrapper">
            <h1>Got a question?</h1>
            <div>
              {" "}
              Let's get you connected with a buddy right away. Why pick your
              brain when a 24/7 advice ready friend is in your way!
            </div>
            <Button onClick={this.onChatClick}>Chat with us!</Button>
          </div>
        </Col>
        <Col md={12}>
          <img style={{ width: "80%" }} src={img} alt="Chat with us" />
        </Col>
      </Row>
    );
  }
}
