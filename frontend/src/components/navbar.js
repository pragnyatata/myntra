import React from "react";
import { Button, Input, Menu } from "antd";
import logo from "../assets/logo.png";
import { Header } from "antd/lib/layout/layout";
import { withRouter } from "react-router";
import Modal from "antd/lib/modal/Modal";

class NavBar extends React.Component {
  state = {
    isModalVisible: false,
    email: "",
  };
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleClick = (e) => {
    // console.log("click ", typeof e.key);
    switch (e.key) {
      case "1":
      case "2":
      case "logo":
      default: {
        this.props.history.push("/");
        break;
      }
      case "3": {
        this.props.history.push("/slot");
        break;
      }
      case "4": {
        this.props.history.push("/chat");
        break;
      }
      case "5": {
        this.showModal();
        break;
      }
    }
  };
  handleSubmit = () => {
    console.log(this.state.email);
  };
  render() {
    return (
      <Header className="home-header">
        <Menu
          className="home-menu"
          onClick={this.handleClick}
          mode="horizontal"
        >
          <Menu.Item key="logo">
            <img className="logo" src={logo} alt="myntra logo" />
          </Menu.Item>
          <Menu.Item key={1}>SHOP BY CATEGORIES</Menu.Item>
          <Menu.Item key={2}>THEME STORES</Menu.Item>
          <Menu.Item key={3}>LIVE</Menu.Item>
          <Menu.Item key={4}>CONNECT WITH BUDDY</Menu.Item>
          <Menu.Item key={5}>
            LOGIN
            {/* <Button onClick={this.showModal}>LOGIN</Button> */}
          </Menu.Item>
          <Modal
            visible={this.state.isModalVisible}
            closable
            onCancel={this.handleCancel}
            className="login-modal"
          >
            <h2>Enter email id to login</h2>
            <Input
              name="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="superstaruser@myntra.com"
            />
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Modal>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(NavBar);
