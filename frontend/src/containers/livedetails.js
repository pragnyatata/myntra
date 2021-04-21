import React, { Component } from "react";
import { getLiveInfo } from "../apis";

export default class LiveDetails extends Component {
  // componentDidMount() {
  // const id = this.props.match.params.scheduleId;
  // getLiveInfo(id)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => console.log(err));
  // }
  render() {
    return (
      <div>
        <div>Hello to {this.props.match.params.scheduleId} live</div>
      </div>
    );
  }
}
