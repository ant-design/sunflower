import React from 'react';
import { useFormTable } from '@sunflower-antd/form-table';
import { Input, Button } from 'antd';
import request from './request';


export default () => {
  const { Form, Table, form } = useFormTable({
    search: (values) => request(values),
    defaultPageSize: 5,
  });
  return <div>
    <Form layout="inline">
      <Form.Item
        label="Username"
        name="username"
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button onClick={() => form.resetFields()}>
            Reset
          </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>

    <Table
      style={{marginTop: 20}}
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
        }
      ]}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
      }}
    />
  </div>
};
