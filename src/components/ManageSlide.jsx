import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./ManageSlide.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

class ManageSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  selectedItem = e => {
    console.log(this.props.routerLink)
    console.log("click ", e);
    switch (e.key) {
      case "1":
        this.props.routerLink.history.push("manage");
        break;
      case "2":
        this.props.routerLink.history.push("manage_ok");
        break;
      case "3":
        this.props.routerLink.history.push("statistics");
        break;
    }
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider
        className="ManageSlide"
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        {/* <div className="logo" /> */}
        <div className="logo">{collapsed ? "" : "中国计量大学送水系统"}</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={this.selectedItem}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="solution" />
                <span>订单</span>
              </span>
            }
          >
            <Menu.Item key="1">未处理</Menu.Item>
            <Menu.Item key="2">已处理</Menu.Item>
          </SubMenu>
          <Menu.Item key="3">
            <Icon type="bars" />
            <span>统计</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default ManageSlide;
