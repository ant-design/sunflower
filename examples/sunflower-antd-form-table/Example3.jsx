import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Table, Form } from 'antd';
import request from './request';


export default Form.create()(props => {
  const { form } = props;
  const { formProps, tableProps,  } = useFormTable({
    form,
    async search(values) {
      const res = await request(values);
      return {
        list: res.list,
        total: res.total,
      };
    },
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 200));
      return {
        username: 'j',
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
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        }
      ]}
      rowKey="id"
      {...tableProps}
    />
  </div>
});
