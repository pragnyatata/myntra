import React from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Input from "antd/lib/input/Input";
import { Button, Form } from "antd";

class SlotForm extends React.Component {
  state = {
    query: "",
    email: "",
    phone: "",
    points: "",
    conduct: false,
  };

  onFormChange = ({ query, email, phone, conduct }) => {
    console.table(query, email, phone, conduct);
    this.setState({
      query,
      email,
      phone,
      conduct,
    });
  };

  render() {
    return (
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={this.onFormChange}
      >
        {/* <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          name="conduct"
          valuePropName="checked"
          rules={[{ required: true, message: "Agree to continue" }]}
        >
          <Checkbox>
            I agree to maintain code of conduct during the live session
          </Checkbox>
        </Form.Item>
        {/* <Form.Item label="Cascader">
          
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch">
          <Switch />
        </Form.Item> */}
        <Form.Item>
          <Button htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SlotForm;
