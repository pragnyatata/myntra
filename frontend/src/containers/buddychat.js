import { Switch } from "antd";
import React from "react";
import "../css/buddychat.css";

class BuddyChat extends React.Component {
  state = {
    available: false,
  };
  onChange = (checked) => {
    console.log(`switch to ${checked}`);
    this.setState({ available: checked });
  };
  render() {
    return (
      <div className="buddy-chat">
        <div className="toggle-availability">
          {this.state.available ? (
            <span>Let's start working! </span>
          ) : (
            <span>You are presently offline </span>
          )}
          <Switch checked={this.state.available} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default BuddyChat;
