import { Button, Card, Col, Popover, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import React from "react";
import { slotLists } from "../apis";

class SlotList extends React.Component {
  state = {
    isModalVisible: false,
    isModalModifyVisible: false,
    existingLive: [],
    visible: [],
    modifyId: "",
  };
  componentDidMount() {
    slotLists()
      .then((response) => {
        // console.log(response);
        let vis = this.state.visible;
        response.map((i) => vis.push(false));
        this.setState({ existingLive: response, visible: vis });
      })
      .catch((err) => console.log(err));
  }
  modalShow = (id) => {
    this.setState({ isModalModifyVisible: true, modifyId: id });
  };

  handleCancelModify = () => {
    this.setState({ isModalModifyVisible: false });
  };
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  hide = (i) => {
    let vis = [...this.state.visible];
    vis[i] = false;
    this.setState({
      visible: vis,
    });
  };

  deleteLive = (id) => {
    console.log(id);
  };

  handleVisibleChange = (visible, i) => {
    let vis = [...this.state.visible];
    vis[i] = visible;
    this.setState({ visible: vis });
  };

  render() {
    return (
      <div>
        {this.state.existingLive.length ? (
          <Row gutter={16}>
            {this.state.existingLive.map((live, i) => (
              <Col key={i} span={8}>
                <Card
                  style={{ width: 300 }}
                  actions={[
                    <Button
                      onClick={() =>
                        this.props.history.push(`/slot/${live._id}`)
                      }
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
