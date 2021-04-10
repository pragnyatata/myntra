import React from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Input from "antd/lib/input/Input";
import { Button, Form, notification } from "antd";
import { slotform } from "../apis";

class SlotForm extends React.Component {
  state = {
    query: "",
    email: "",
    phone: "",
    points: "",
    conduct: false,
  };

  openNotification = (msg) => {
    notification.open({
      message: "Hey there user!",
      description: msg,
      duration: 2,
      className: "popup",
    });
  };

  onFormChange = ({ query, email, phone, conduct }) => {
    const body = {};
    body.details = query;
    body.phoneNumber = phone;
    slotform(this.props.id, localStorage.getItem("user"), body)
      .then((response) => {
        this.openNotification(response.message);
      })
      .catch((err) => console.log(err));
    this.setState({
      query,
      email,
      phone,
      conduct,
    });
  };

  render() {
    const tailLayout = {
      wrapperCol: { offset: 3, span: 21 },
    };
    const tailLayout2 = {
      wrapperCol: { offset: 10, span: 14 },
    };
    const userPoints = JSON.parse(localStorage.getItem("data")).insiderPoints;
    const reqPoints = this.props.points;
    return (
      <div className="slot-form">
        <div className="start">
          Required Insider Points:{" "}
          <span
            style={
              reqPoints > userPoints ? { color: "red" } : { color: "green" }
            }
          >
            {reqPoints}
          </span>
        </div>
        <div className="end">
          User's Insider Points:{" "}
          <span
            style={
              reqPoints > userPoints ? { color: "red" } : { color: "green" }
            }
          >
            {userPoints}
          </span>
        </div>
        {!(reqPoints > userPoints) ? (
          <Form
            name="basic"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 9 }}
            layout="horizontal"
            onFinish={this.onFormChange}
          >
            <Form.Item
              label="Mobile No."
              name="phone"
              rules={[
                { required: true, message: "Please input your mobile number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Queries to superstars" name="query">
              <Input />
            </Form.Item>
            {console.log(localStorage.getItem("user"))}
            <Form.Item
              name="conduct"
              valuePropName="checked"
              rules={[{ required: true, message: "Agree to continue" }]}
              {...tailLayout}
            >
              <Checkbox>
                I agree to maintain code of conduct during the live session
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout2}>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="start" style={{ color: "red" }}>
            Due to less Insider Points, you cannot book this live. Try again
            later.
          </div>
        )}
      </div>
    );
  }
}

export default SlotForm;
