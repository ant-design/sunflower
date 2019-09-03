import React from 'react';
import { useForm } from 'sunflower-antd';
import { Input, Form, message, Button, Spin } from 'antd';


export default Form.create()(props => {
  const { form } = props;
  const { formProps, loading } = useForm({
    form,
    defaultFormValues: { username: 'Lily', email: '10164626@qq.com' },
    async submit(values) {
      await new Promise(r => setTimeout(r, 1000));
      message.success(`${JSON.stringify(values)}提交成功`);
    },
  })
  return (
    <div>
      <Spin spinning={loading}>
        <Form layout="inline" {...formProps}>
          <Form.Item label="Username">
            {
              form.getFieldDecorator('username', {
                rules: [{ required: true, message: '该字段不能为空' }],
              })(
                <Input placeholder="Username" />
              )
            } 
          </Form.Item>

          <Form.Item label="Email">
            {
              form.getFieldDecorator('email', {
                rules: [{ required: true, message: '该字段不能为空' }],
              })(
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
      </Spin>
    </div>
  )
});
