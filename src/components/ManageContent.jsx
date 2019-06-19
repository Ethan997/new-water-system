import { Layout, Breadcrumb, Table, Button } from "antd";
import React, { Component } from "react";
import axios from "axios";

const { Content } = Layout;


class MyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      columns: [
        {
          title: "学号",
          dataIndex: "sid"
        },
        {
          title: "数量",
          dataIndex: "number"
        },
        {
          title: "地址",
          dataIndex: "address"
        },
        {
          title: "电话",
          dataIndex: "phone"
        }
      ],
      dataSource: []
    };
  }
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const me = this;
    let orderState;
    switch (window.location.hash) {
      case "#/manage":
        orderState = 0;
        break;
      case "#/manage_ok":
        orderState = 1;
        break;
      case "#/statistics":
        orderState = 3;
        break;
    }
    axios
      .post("http://localhost:3001/koa/getSource", { orderState: orderState })
      .then(function(response) {
        console.log("response", response);
        if (response.data.success) {
          response.data.data.forEach((item) => {
            item.key = item.sid;
          })
          me.setState({
            dataSource: response.data.data
          });
          console.log('response.data.data', response.data.data)
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  setOrders = (data) => {
    const me = this;
    axios
      .post("http://localhost:3001/koa/setSource", data)
      .then(function(response) {
        if (response.data.success) {
          console.log(response.data.success)
          this.getOrders();
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    this.setOrders(this.state.selectedRowKeys)
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys, columns, dataSource } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>订单</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              批准
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `共选择 ${selectedRowKeys.length} 行` : ""}
            </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </Content>
    );
  }
}

export default MyContent;
