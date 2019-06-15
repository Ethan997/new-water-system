import { Layout, Breadcrumb, Table, Button } from "antd";
import React, { Component } from "react";

const { Content } = Layout;

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    sid: `Edward King ${i}`,
    phone: 32,
    number: i+2,
    address: `London, Park Lane no. ${i}`,
  });
}


class MyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      columns: [
        {
          title: '学号',
          dataIndex: 'sid',
        },
        {
          title: '数量',
          dataIndex: 'number',
        },
        {
          title: '地址',
          dataIndex: 'address',
        },
        {
          title: '电话',
          dataIndex: 'phone',
        },
      ]
    };
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
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
    const { loading, selectedRowKeys, columns } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>订单</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
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
            dataSource={data}
          />
        </div>
      </Content>
    );
  }
}

export default MyContent;
