import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Popover, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { slotLists } from "../apis";
import CreateSlotModal from "../components/createslotmodal";
// import ModifySlotModal from "../components/modifyslotmodal";

class CreateSlot extends React.Component {
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
        console.log(response);
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
        <Button type="primary" onClick={this.showModal}>
          Create Live
        </Button>
        <Modal
          visible={this.state.isModalVisible}
          closable
          onCancel={this.handleCancel}
        >
          <CreateSlotModal />
        </Modal>
        <Modal
          visible={this.state.isModalModifyVisible}
          closable
          onCancel={this.handleCancelModify}
        >
          Hello
          {/* <ModifySlotModal /> */}
        </Modal>
        <div>
          {this.state.existingLive.length ? (
            <Row gutter={16}>
              {this.state.existingLive.map((live, i) => (
                <Col key={i} span={8}>
                  <Card
                    style={{ width: 300 }}
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => this.modalShow(live._id)}
                      />,
                      <Popover
                        content={
                          <div>
                            <p>
                              Are you sure you want to delete the scheduled
                              live?
                            </p>
                            <Button
                              type="primary"
                              onClick={() => this.deleteLive(live._id)}
                            >
                              Yes
                            </Button>
                            <Button onClick={() => this.hide(i)}>No</Button>
                          </div>
                        }
                        trigger="click"
                        visible={this.state.visible[i]}
                        onVisibleChange={(visible) =>
                          this.handleVisibleChange(visible, i)
                        }
                      >
                        <CloseOutlined key="delete" />
                      </Popover>,
                    ]}
                  >
                    <Meta
                      title={`Live with ${live.influencerName}`}
                      description={`Date: ${live.date}`}
                    />
                    <Meta description={`Begin time: ${live.beginTime}`} />
                    <Meta description={`End time: ${live.endTime}`} />
                    <Meta description={`Slots: ${live.slots}`} />
                    <Meta
                      description={`Insider Points: ${live.insiderPoints}`}
                    />
                    <Meta description={`Youtube URL: ${live.url}`} />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div>No live sessions scheduled. Create one.</div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateSlot;
