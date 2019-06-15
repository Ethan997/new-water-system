import { Layout } from "antd";
import React, { Component } from 'react';

const { Footer } = Layout;

class MyFooter extends Component {
  render() {
    return (
        <Footer style={{ textAlign: "center" }}>
          课程设计 by SHL小组
        </Footer>
    );
  }
}

export default MyFooter;
