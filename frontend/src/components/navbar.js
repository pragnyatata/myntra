import React from "react";
import { Input, Menu } from "antd";
import logo from "../assets/logo.png";
import { Header } from "antd/lib/layout/layout";
import { SearchOutlined } from "@ant-design/icons";
import { withRouter } from "react-router";

class NavBar extends React.Component {
  handleClick = (e) => {
    console.log("click ", typeof e.key);
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
    }
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
          <Menu.Item>
            <Input
              style={{ width: 350, backgroundColor: "0e0e0e" }}
              size="large"
              placeholder="Search for products, brands and more"
              prefix={<SearchOutlined />}
            />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(NavBar);
