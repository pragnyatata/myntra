import { Button, Collapse } from "antd";
import React, { Component } from "react";
import { getLiveInfo } from "../apis";
import "../css/livedetails.css";

const { Panel } = Collapse;

class LiveDetails extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    const id = this.props.match.params.scheduleId;
    getLiveInfo(id)
      .then((response) => {
        console.log(response);
        this.setState({ users: response });
      })
      .catch((err) => console.log(err));
  }
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <div className="live-details">
        <h2>Customers who booked the slot</h2>
        <Collapse defaultActiveKey={["1"]} onChange={this.callback}>
          {this.state.users?.map((elem, i) => (
            <Panel header={elem.user.name} key={i + 1}>
              <p className="start">Phone: {elem.user.phoneNumber}</p>
              <p className="start">Email: {elem.user.email}</p>
              <p className="start">Query: {elem.details}</p>
            </Panel>
          ))}
        </Collapse>
        <div className="create-slot">
          <Button>Send details to Myntra Superstar</Button>
        </div>
      </div>
    );
  }
}

export default LiveDetails;
