import React from "react";
import { Button, Input, Menu } from "antd";
import logo from "../assets/logo.png";
import { Header } from "antd/lib/layout/layout";
import { withRouter } from "react-router";
import Modal from "antd/lib/modal/Modal";
import { login } from "../apis";
import "../css/navbar.css";
import Form from "antd/lib/form/Form";

class NavBar extends React.Component {
  state = {
    isModalVisible: false,
    email: "",
    error: null,
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
        this.props.history.push("/user/chat");
        break;
      }
      case "5": {
        this.showModal();
        break;
      }
      case "6": {
        localStorage.clear();
        window.location = "/";
        break;
      }
    }
  };
  handleSubmit = ({ email }) => {
    console.log(this.state.email);
    login(email)
      .then((response) => {
        console.log(response.user);
        if (response.user !== undefined) {
          if (response.user.role === "user") {
            window.location = "/";
          } else {
            window.location = "/buddy/chat";
          }
          localStorage.setItem("user", response.user._id);
          localStorage.setItem("data", JSON.stringify(response.user));
        } else {
          this.setState({ error: "User not found" });
        }
      })
      .catch((err) => console.log(err));
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
          {localStorage.getItem("user") && (
            <Menu.Item key={6}>LOGOUT</Menu.Item>
          )}
          {!localStorage.getItem("user") && (
            <Menu.Item key={5}>LOGIN</Menu.Item>
          )}
          <Modal
            visible={this.state.isModalVisible}
            closable
            onCancel={this.handleCancel}
            className="login-modal"
          >
            <h3>SIGN IN</h3>
            <Form layout="horizontal" onFinish={this.handleSubmit}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                  },
                ]}
              >
                <Input placeholder="superstaruser@myntra.com" />
              </Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form>
            <div className="err">{this.state.error}</div>
          </Modal>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(NavBar);
