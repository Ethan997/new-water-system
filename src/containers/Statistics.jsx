import React, { Component } from "react";
import { Layout } from "antd";
import ManageSlide from "../components/ManageSlide";
import ManageContent from "../components/ManageContent";
// import axios from "axios";

// import MyFooter from '../components/MyFooter';

import "./Manage.scss";

const { Footer } = Layout;

class Manage extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className="manage">
        <Layout style={{ minHeight: "100vh" }}>
        <ManageSlide  routerLink={this.props} />
          <Layout>
            <div>
              <ManageContent className="manage-content" />
            </div>
            <Footer className="manage-footer">
              中国计量大学送水平台 ©2019 Created by 申浩良
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Manage;
