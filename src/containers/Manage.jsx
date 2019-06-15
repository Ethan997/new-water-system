import { Layout } from "antd";
import React, { Component } from 'react';
import MyHeader from '../components/MyHeader';
import MyContent from '../components/MyContent';
import MyFooter from '../components/MyFooter';


class App extends Component {
  render() {
    return (
      <Layout style={{minHeight: '100% !important'}} >
        <MyHeader /> 
        <MyContent /> 
        <MyFooter /> 
      </Layout>
    );
  }
}

export default App;
