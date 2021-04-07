import React from "react";
import Input from "antd/lib/input/Input";
import { Button, DatePicker, Form, TimePicker } from "antd";
import moment from "moment";

class ModifySlotModal extends React.Component {
  onFormChange = (values) => {
    console.log(values);
  };
  render() {
    const liv = this.props.live[0];
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
        initialValues={{
          date: moment(liv.date),
          beginTime: moment(liv.beginTime, "HH:mm:ss"),
          endTime: moment(liv.endTime, "HH:mm:ss"),
          emailInfluencer: liv.influencerEmail,
          name: liv.influencerName,
          points: liv.insiderPoints,
          slots: liv.slots,
          url: liv.url,
        }}
      >
        <Form.Item
          label="Date of live"
          name="date"
          rules={[
            { required: true, message: "Please input date of live session" },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" />
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
          label="Influencer Name"
          name="name"
          rules={[{ required: true, message: "Please input influencer name!" }]}
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
          label="Number of slots"
          name="slots"
          rules={[
            {
              required: true,
              message: "Number of slots is required!",
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

export default ModifySlotModal;
