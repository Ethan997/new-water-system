import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import axios from "axios";
import "./Login.scss";

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userState: 0,
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) {
        console.log("Received values of form: ", data);
        const me = this;
        axios
          .post("http://localhost:3001/koa/login", data)
          .then(function(response) {
            console.log("response", response);
            if (response.data.data === "login success") {
              document.userState = 1;
              me.setState({
                userState: 1,
              })
              setTimeout(()=> {
                console.log(me.state.userState);
              },2000)
            }
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
        <span>{this.state.userState}</span>
        <Row>
          <h1 className="login-title">中国计量大学送水系统</h1>
        </Row>
        <Row>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入账号!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={16}>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>Remember me</Checkbox>)}
                </Col>
                <Col span={8}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
