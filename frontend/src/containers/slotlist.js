import { Card, Col, Row, notification } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import React from "react";
import { slotLists } from "../apis";
import img from "../assets/slotlist.svg";
import "../css/slotlist.css";

class SlotList extends React.Component {
  state = {
    existingLive: [],
  };
  componentDidMount() {
    slotLists()
      .then((response) => {
        this.setState({ existingLive: response });
      })
      .catch((err) => console.log(err));
  }

  openNotification = () => {
    notification.open({
      message: "Hey there user!",
      description: "Please login to continue.",
      duration: 2,
      className: "popup",
    });
  };

  render() {
    const today = new Date();

    return (
      <div>
        {this.state.existingLive.length ? (
          <Row className="slot-list">
            <Col md={12} sm={24}>
              <Row>
                {this.state.existingLive.map((live, i) => (
                  <Col key={i} md={12} sm={24}>
                    <Card
                      style={{ width: 250 }}
                      className="slot-card"
                      actions={
                        moment(live.date).format("M/D/YYYY") !==
                        today.toLocaleDateString()
                          ? [
                              <div
                                className="action-button"
                                onClick={() => {
                                  if (localStorage.getItem("user") !== null)
                                    return this.props.history.push(
                                      `/slot/${live._id}`
                                    );
                                  else return this.openNotification();
                                }}
                              >
                                Book
                              </div>,
                            ]
                          : [
                              <div
                                className="action-button"
                                onClick={() =>
                                  this.props.history.push(`/live/${live.url}`)
                                }
                                style={{ color: "#f667ca" }}
                              >
                                Join the live!!
                              </div>,
                            ]
                      }
                    >
                      <Meta
                        className="card-title"
                        title={`Live with ${live.influencerName}`}
                      ></Meta>
                      <Meta
                        description={`Join on ${moment(live.date).format(
                          "D/M/YY"
                        )}`}
                        className="date"
                      />
                      <Meta
                        description={`Start: ${moment(live.beginTime).format(
                          "HH:mm"
                        )}`}
                        className="start"
                      />
                      <Meta
                        description={`End: ${moment(live.endTime).format(
                          "HH:mm"
                        )}`}
                        className="end"
                      />
                      <Meta
                        className="start"
                        description={`Slots: ${live.slots}`}
                      />
                      <Meta
                        className="end"
                        description={`Insider Points: ${live.insiderPoints}`}
                      />
                      {/* <Meta description={`Youtube URL: ${live.url}`} /> */}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={12} sm={24} style={{ display: "flex" }}>
              <img
                style={{ width: "80%", margin: "0 auto" }}
                src={img}
                alt="Online Colloboration"
              />
            </Col>
          </Row>
        ) : (
          <div>No live sessions scheduled. Create one.</div>
        )}
      </div>
    );
  }
}

export default SlotList;
