import React, { useState } from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Form, Table } from 'antd';
import request from './request';


export default Form.create()(props => {
  const { form } = props;
  const { formProps, tableProps, sorter, filters } = useFormTable({
    form,
    async search({ currentPage, pageSize, filters, sorter, username, email }) {
      const { list, total } = await request({ currentPage, pageSize, filters, sorter, username, email });
      return {
        list,
        total,
      };
    },
  });

  return <div>
    <Form layout="inline" {...formProps}>
      <Form.Item label="Username">
        {
          form.getFieldDecorator('username')(
            <Input placeholder="Username" />
          )
        } 
      </Form.Item>

      <Form.Item label="Email">
        {
          form.getFieldDecorator('email')(
            <Input placeholder="Email" />
          )
        } 
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
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
      }}
    />
  </div>
});
