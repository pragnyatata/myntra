import React from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Input from "antd/lib/input/Input";
import { Button, Form, notification } from "antd";
import { getUserInfo, slotform } from "../apis";
class SlotForm extends React.Component {
  state = {
    query: "",
    email: "",
    phone: "",
    points: "",
    conduct: false,
    userPoints: null,
  };
  componentDidMount() {
    let id = localStorage.getItem("user");
    getUserInfo(id)
      .then((response) => {
        this.setState({ userPoints: response.insiderPoints });
      })
      .catch((err) => console.log(err));
  }
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
        if (response.message !== undefined)
          this.openNotification(response.message);
        else
          this.openNotification(
            "Your slot has been booked successfully, further details have been emailed to you"
          );
        setTimeout(() => {
          window.location = "/slot";
        }, 3000);
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
    const { userPoints } = this.state;
    const tailLayout = {
      wrapperCol: { offset: 3, span: 21 },
    };
    const tailLayout2 = {
      wrapperCol: { offset: 10, span: 14 },
    };

    const reqPoints = this.props.points;
    return (
      <div>
        {this.state.userPoints && (
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
                    {
                      required: true,
                      message: "Please input your mobile number!",
                    },
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
        )}
      </div>
    );
  }
}

export default SlotForm;
