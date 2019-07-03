import React, { useState } from 'react';
import { useFormTable } from '@sunflower-antd/form-table';
import { Input, Button, Row, Col, Alert, Select, Spin } from 'antd';
import request from './request';


export default () => {
  const {
    Form,
    Table,
    form,
    total,
    currentPage,
    pageSize,
    formValues,
    defaultFormValuesLoading,
  } = useFormTable({
    search(requestData) {
      const { currentPage, pageSize, ...formValues } = requestData;
      console.log('requestData', requestData);
      return request({ currentPage, pageSize, ...formValues });
    },
    defaultFormValues: () => {
      return new Promise(r => setTimeout(() => {
        r({
          field5: 'jack',
          username: 'a',
        });
      }, 2000));
    },
  });

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return <div>
    {
      defaultFormValuesLoading
      ?
      <div>
        <Spin /> default form values loading
      </div>
      :
      null
    }
    <Form {...formItemLayout}>
      <Row>
        <Col span={8}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input placeholder="Username" onChange={e => {
              console.log(e.target.value);
            }} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Field 1"
            name="field1"
          >
            <Input placeholder="Field 1" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Field 2"
            name="field2"
          >
            <Input placeholder="Field 2" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Field 3"
            name="field3"
          >
            <Input placeholder="Field 3" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Field 4"
            name="field4"
          >
            <Input placeholder="Field 4" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Field 5"
            name="field5"
          >
            <Select>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24} style={{ textAlign: 'right' }}>
          <Button style={{marginRight: 12}} onClick={() => form.resetFields()}>
            reset
          </Button>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>

    <Alert
      message={
        `total num: ${total || 0},
         currentPage: ${currentPage || 1},
         pageSize: ${pageSize || 10},
         Username: ${formValues.username || ''}
      `}
      style={{margin: '20px 0 20px 0'}}
    />

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
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />

  </div>;
};
