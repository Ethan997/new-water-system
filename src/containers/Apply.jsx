import React, { Component } from "react";
import axios from "axios";
import { Form, Icon, Input, Button, Row, InputNumber } from "antd";
import "./Apply.scss";

class NormalApplyForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) {
        console.log("申请参数为 ", data);
        axios
          .post("http://localhost:3001/koa/apply", data)
          .then(function(response) {
            console.log("response", response);
          })
          .catch(function(error) {
            console.log(error);
          });
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
            <Form.Item className="apply-form-number">
              {getFieldDecorator("number", {
                rules: [{ required: true, message: "请输入数量!" }]
              })(<InputNumber min={1} max={10} placeholder="数量" />)}
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
              <Button type="primary" htmlType="submit">
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
