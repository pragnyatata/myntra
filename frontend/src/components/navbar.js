import React from "react";
import { Button, Input, Menu, notification, Radio } from "antd";
import logo from "../assets/logo.png";
import { Header } from "antd/lib/layout/layout";
import { withRouter } from "react-router";
import Modal from "antd/lib/modal/Modal";
import { login, register } from "../apis";
import "../css/navbar.css";
import Form from "antd/lib/form/Form";

class NavBar extends React.Component {
  state = {
    isLoginModalVisible: false,
    isRegisterModalVisible: false,
    email: "",
    regEmail: "",
    name: "",
    error: null,
  };
  showModal = (name) => {
    this.setState({ [name]: true });
  };

  handleCancelLogin = () => {
    this.setState({ isLoginModalVisible: false });
  };

  handleCancelRegister = () => {
    this.setState({ isRegisterModalVisible: false });
  };
  openNotification = () => {
    notification.open({
      message: "Hey there user!",
      description: "Please login to continue.",
      duration: 2,
      className: "popup",
    });
  };
  handleClick = (e) => {
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
        if (localStorage.getItem("user") !== null)
          this.props.history.push("/user/chat");
        else this.openNotification();
        break;
      }
      case "5": {
        this.showModal("isLoginModalVisible");
        break;
      }
      case "6": {
        localStorage.clear();
        window.location = "/";
        break;
      }
      case "7": {
        window.location = "/slot/create";
        break;
      }
      case "8": {
        this.showModal("isRegisterModalVisible");
        break;
      }
    }
  };
  handleSubmit = ({ email }) => {
    login(email)
      .then((response) => {
        if (response.user !== undefined) {
          if (response.user.role === "user") {
            window.location = "/";
          } else if (response.user.role === "buddy") {
            window.location = "/buddy/chat";
          } else {
            window.location = "/slot/create";
          }
          localStorage.setItem("user", response.user._id);
          localStorage.setItem("data", JSON.stringify(response.user));
        } else {
          this.setState({ error: "User not found" });
        }
      })
      .catch((err) => console.log(err));
  };

  handleRegisterSubmit = ({ regEmail, name, role }) => {
    register(regEmail, name, role)
      .then((response) => {
        console.log(response);
        if (response.msg !== undefined) {
          this.handleSubmit({ email: regEmail });
        } else {
          this.setState({ error: response.error });
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
          {localStorage.getItem("role") === "moderator" && (
            <Menu.Item key={7}>CREATE LIVE</Menu.Item>
          )}
          {localStorage.getItem("user") && (
            <Menu.Item key={6}>LOGOUT</Menu.Item>
          )}
          {!localStorage.getItem("user") && (
            <React.Fragment>
              <Menu.Item key={8}>REGISTER</Menu.Item>
              <Menu.Item key={5}>LOGIN</Menu.Item>
            </React.Fragment>
          )}
          <Modal
            visible={this.state.isLoginModalVisible}
            closable
            onCancel={this.handleCancelLogin}
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
          <Modal
            visible={this.state.isRegisterModalVisible}
            closable
            onCancel={this.handleCancelRegister}
            className="login-modal"
          >
            <h3>Register</h3>
            <Form layout="horizontal" onFinish={this.handleRegisterSubmit}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input placeholder="Fav User Singh" />
              </Form.Item>
              <Form.Item
                name="regEmail"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email address!",
                  },
                ]}
              >
                <Input
                  style={{ marginTop: 0 }}
                  placeholder="superstaruser@myntra.com"
                />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Please select a role!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="user">Customer</Radio>
                  <Radio value="buddy">Buddy</Radio>
                  <Radio value="moderator">Moderator</Radio>
                </Radio.Group>
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
