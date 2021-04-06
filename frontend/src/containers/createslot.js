import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { slotLists } from "../apis";
import CreateSlotModal from "../components/createslotmodal";

class CreateSlot extends React.Component {
  state = {
    isModalVisible: false,
    existingLive: [],
  };
  componentDidMount() {
    slotLists()
      .then((response) => {
        this.setState({ existingLive: response });
      })
      .catch((err) => console.log(err));
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
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
        <div>
          {this.state.existingLive.length ? (
            <div></div>
          ) : (
            <div>No live sessions scheduled. Create one.</div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateSlot;
