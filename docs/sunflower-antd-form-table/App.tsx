import React, { useState } from 'react';
import { useFormTable } from '@sunflower-antd/form-table';
import { Input, Button, Row, Col, Alert, Select } from 'antd';
import request from './request';


export default () => {
  const {
    Form,
    Table,
    form,
    responseData,
    defaultFormValuesLoading,
  } = useFormTable({
    search(values) {
      console.log('request values', values);
      return request(values);
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

  const [bordered, toggleTableBordered] = useState(false);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  return <div>
    {
      defaultFormValuesLoading && 'defaultFormValuesLoading...'
    }
    <Form {...formItemLayout}>
      <Row>
        <Col span={8}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input placeholder="Username" />
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

    <div style={{ marginBottom: 20 }}>
      <Button onClick={() => toggleTableBordered(!bordered)}>
        change table bordered
      </Button>
    </div>

    <Alert
      message={`total num: ${responseData.total || 0}`}
      style={{marginBottom: 20}}
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
      bordered={bordered}
    />

  </div>;
};
