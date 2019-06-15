import React, { Component } from "react";
import { Form, Icon, Input, Button, Row } from "antd";
import "./Apply.scss";

class NormalApplyForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <h1 className="apply-title">申请送水系统</h1>
        </Row>
        <Row>
          <Form onSubmit={this.handleSubmit} className="apply-form">
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入姓名!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="姓名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("address", {
                rules: [{ required: true, message: "请输入地址!" }]
              })(
                <Input
                  prefix={
                    <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="地址"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "请输入电话!" }]
              })(
                <Input
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="电话"
                />
              )}
            </Form.Item>
            <Form.Item className="apply-form-button">
              <Button
                type="primary"
                htmlType="submit"
              >
                申请
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}

const WrappedNormalApplyForm = Form.create({ name: "normal_Apply" })(
  NormalApplyForm
);

export default WrappedNormalApplyForm;
