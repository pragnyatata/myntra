import { Button } from "antd/lib";
import React, { Component } from "react";

export default class UserChat extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.history.push("/chat")}>
          Chat with us!
        </Button>
      </div>
    );
  }
}
