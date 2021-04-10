import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Popover, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React from "react";
import { deleteSlot, slotLists } from "../apis";
import CreateSlotModal from "../components/createslotmodal";
import ModifySlotModal from "../components/modifyslotmodal";
import img from "../assets/createslot.svg";
import "../css/createslot.css";

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

  deleteLive = (id, i) => {
    deleteSlot(id)
      .then((response) => {
        let old = [...this.state.existingLive];
        let newList = old.filter((i) => i._id !== id);
        this.setState({ existingLive: newList });
        this.hide(i);
      })
      .catch((err) => console.log(err));
  };

  handleVisibleChange = (visible, i) => {
    let vis = [...this.state.visible];
    vis[i] = visible;
    this.setState({ visible: vis });
  };

  modifyList = (obj) => {
    let list = this.state.existingLive.filter((liv) => liv._id !== obj._id);
    list.push(obj);
    this.setState({ existingLive: list });
    this.handleCancelModify();
    this.handleCancel();
  };

  render() {
    return (
      <div className="create-slot">
        <Button onClick={this.showModal}>Create Live</Button>
        <Modal
          visible={this.state.isModalVisible}
          closable
          onCancel={this.handleCancel}
        >
          <CreateSlotModal updateList={(list) => this.modifyList(list)} />
        </Modal>
        <Modal
          visible={this.state.isModalModifyVisible}
          closable
          onCancel={this.handleCancelModify}
        >
          <ModifySlotModal
            live={this.state.existingLive.filter(
              (liv) => liv._id === this.state.modifyId
            )}
            updateList={(list) => this.modifyList(list)}
          />
        </Modal>
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
                        actions={[
                          <EditOutlined
                            key="edit"
                            onClick={() => this.modalShow(live._id)}
                            className="action-button"
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
                                  onClick={() => {
                                    this.deleteLive(live._id, i);
                                  }}
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
                            <CloseOutlined
                              key="delete"
                              className="action-button"
                            />
                          </Popover>,
                        ]}
                      >
                        <Meta
                          className="card-title"
                          title={`Live with ${live.influencerName}`}
                        />
                        <Meta
                          className="date"
                          description={`Date: ${moment(live.date).format(
                            "DD/MM/YY"
                          )}`}
                        />
                        <Meta
                          className="start"
                          description={`Begin time: ${moment(
                            live.beginTime
                          ).format("HH:mm")}`}
                        />
                        <Meta
                          className="end"
                          description={`End time: ${moment(live.endTime).format(
                            "HH:mm"
                          )}`}
                        />
                        <Meta
                          className="start"
                          description={`Slots: ${live.slots}`}
                        />
                        <Meta
                          className="end"
                          description={`Insider Points: ${live.insiderPoints}`}
                        />
                        <Meta
                          className="end"
                          description={`Youtube URL: ${live.url}`}
                        />
                        <Meta
                          className="end"
                          description={`Restream URL: ${live.restreamUrl}`}
                        />
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
      </div>
    );
  }
}

export default CreateSlot;
