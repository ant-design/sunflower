import React, { useState } from 'react';
import { useFormTable } from '@sunflower-antd/form-table';
import { Input, Button } from 'antd';
import request from './request';


export default () => {
  const {
    Form,
    Table,
  } = useFormTable({
    search(values) {
      console.log('request values', values);
      return request(values);
    },
  });

  const [bordered, toggleTableBordered] = useState(false);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 8,
      offset: 4,
    },
  };

  return <div>

    <Form {...formItemLayout}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>

    <div style={{ marginBottom: 20 }}>
      <Button onClick={() => toggleTableBordered(!bordered)}>
        change table bordered
      </Button>
    </div>

    <Table
      columns={[
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
      ]}
      rowKey="id"
      bordered={bordered}
    />

  </div>;
};
