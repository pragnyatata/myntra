import React from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Input from "antd/lib/input/Input";
import { Button, Form } from "antd";
import { slotform } from "../apis";
import "../css/slotform.css";

class SlotForm extends React.Component {
  state = {
    query: "",
    email: "",
    phone: "",
    points: "",
    conduct: false,
  };

  onFormChange = ({ query, email, phone, conduct }) => {
    const body = {};
    body.details = query;
    body.phoneNumber = phone;
    slotform(
      this.props.match.params.scheduleId,
      localStorage.getItem("user"),
      body
    )
      .then((response) => {
        console.log(response);
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
    return (
      <div className="slot-form">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
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
          >
            <Checkbox>
              I agree to maintain code of conduct during the live session
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Button</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default SlotForm;
