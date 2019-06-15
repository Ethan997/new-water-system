import React, { Component } from 'react';
import { Layout,  Menu } from "antd";
import './MyHeader.scss';

const { Header } = Layout;

class MyHeader extends Component {
    render() {
        return (
            <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">订单</Menu.Item>
              <Menu.Item key="2">统计</Menu.Item>
            </Menu>
          </Header>
        )
    }
}

export default MyHeader;