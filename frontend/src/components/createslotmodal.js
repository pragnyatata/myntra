import React from "react";
import Input from "antd/lib/input/Input";
import { Button, DatePicker, Form, TimePicker } from "antd";

class CreateSlotModal extends React.Component {
  onFormChange = (values) => {
    console.log(values);
  };
  render() {
    const config = {
      rules: [
        {
          type: "object",
          required: true,
          message: "Please select time!",
        },
      ],
    };
    return (
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={this.onFormChange}
      >
        <Form.Item
          label="Date of live"
          name="date"
          rules={[
            { required: true, message: "Please input date of live session" },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="beginTime" label="Begin Time" {...config}>
          <TimePicker />
        </Form.Item>
        <Form.Item name="endTime" label="End Time" {...config}>
          <TimePicker />
        </Form.Item>
        <Form.Item
          label="Influencer Email"
          name="emailInfluencer"
          rules={[
            { required: true, message: "Please input influencer email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Insider Points Required"
          name="points"
          rules={[
            {
              required: true,
              message: "Please input insider points required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Youtube URL ID of Live"
          name="url"
          rules={[
            { required: true, message: "Please input url of live session!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CreateSlotModal;
