import React, { Component } from "react";

export default class LiveDetails extends Component {
  render() {
    return (
      <div>
        <div>Hello to {this.props.match.params.scheduleId} live</div>
      </div>
    );
  }
}
