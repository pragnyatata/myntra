import { Button } from "antd/lib";
import React, { Component } from "react";
import { buddyCount } from "../apis";

export default class UserChat extends Component {
  state = {
    error: null,
  };
  onChatClick() {
    buddyCount()
      .then((response) => {
        if (response.length === 0)
          this.setState({ error: "Please try later no executive avilable" });
        else window.location = `/chat/${response.id}`;
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.onChatClick}>Chat with us!</Button>
        <div>{this.state.error}</div>
      </div>
    );
  }
}
