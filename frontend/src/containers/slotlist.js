import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import React from "react";
import { slotLists } from "../apis";
import Modal from "antd/lib/modal/Modal";
class SlotList extends React.Component {
  state = {
    existingLive: [],
    isModalVisible: false,
  };
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  componentDidMount() {
    slotLists()
      .then((response) => {
        // console.log(response);
        this.setState({ existingLive: response });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.state.isModalVisible}
          closable
          onCancel={this.handleCancel}
          className="login-modal"
        >
          <h2>Login First</h2>
        </Modal>
        ,
        {this.state.existingLive.length ? (
          <Row gutter={16}>
            {this.state.existingLive.map((live, i) => (
              <Col key={i} span={8}>
                <Card
                  style={{ width: 300 }}
                  actions={[
                    <Button
                      onClick={() => {
                        if (localStorage.getItem("user") !== null)
                          return this.props.history.push(`/slot/${live._id}`);
                        else return this.showModal();
                      }}
                    >
                      Book
                    </Button>,
                  ]}
                >
                  <Meta
                    title={`Live with ${live.influencerName}`}
                    description={`Date: ${moment(live.date).format(
                      "DD/MM/YY"
                    )}`}
                  />
                  <Meta
                    description={`Begin time: ${moment(live.beginTime).format(
                      "HH:mm"
                    )}`}
                  />
                  <Meta
                    description={`End time: ${moment(live.endTime).format(
                      "HH:mm"
                    )}`}
                  />
                  <Meta description={`Slots: ${live.slots}`} />
                  <Meta description={`Insider Points: ${live.insiderPoints}`} />
                  <Meta description={`Youtube URL: ${live.url}`} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div>No live sessions scheduled. Create one.</div>
        )}
      </div>
    );
  }
}

export default SlotList;
