import React, { useState } from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button } from 'antd';
import request from './request';


export default () => {
  const { Form, Table, form, sorter, filters } = useFormTable({
    async search({ currentPage, pageSize, filters, sorter, username, email }) {
      const { list, total } = await request({ currentPage, pageSize, filters, sorter, username, email });
      return {
        list,
        total,
      };
    },
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
          sorter: true,
          sortOrder: sorter && sorter.order,
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          filters: [{
            text: 'male',
            value: 'male'
          }, {
            text: 'female',
            value: 'female'
          }],
          filterMultiple: false,
          filteredValue: filters && filters.gender || null,
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
