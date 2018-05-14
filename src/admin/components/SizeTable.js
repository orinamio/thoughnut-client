import React, { Component } from "react";
import { Table, Input, Icon, Button, Popconfirm } from "antd";
import { Mutation } from "react-apollo";

import { DELETE_SIZE, GET_SIZES } from "../../api/size";

class SizeTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Size name",
        dataIndex: "name"
      },
      {
        title: "Quantity",
        dataIndex: "quantity"
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
          return props.sizes.length > 1 ? (
            <Button.Group>
              <Button style={{ color: "green" }} onClick={props.showModal}>
                Update
              </Button>
              <Mutation
                mutation={DELETE_SIZE}
                update={(cache, { data: { deleteSize } }) => {
                  const { sizes } = cache.readQuery({ query: GET_SIZES });
                  const sizeList = sizes.filter(i => i.id !== record.id);
                  cache.writeQuery({
                    query: GET_SIZES,
                    data: { sizes: sizeList }
                  });
                }}
              >
                {(deleteSize, { loading, error }) => (
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() =>
                      deleteSize({ variables: { id: record.id } })
                    }
                  >
                    <Button style={{ color: "red" }}>Delete</Button>
                  </Popconfirm>
                )}
              </Mutation>
            </Button.Group>
          ) : null;
        }
      }
    ];
  }
  render() {
    const columns = this.columns;
    return (
      <Table
        bordered
        loading={this.props.loading}
        dataSource={this.props.sizes}
        columns={columns}
      />
    );
  }
}

export default SizeTable;