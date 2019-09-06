import React from 'react';
import { useForm } from 'sunflower-antd';
import { Input, Button, Form, Spin } from 'antd';


export default Form.create()(props => {
  const { form } = props;
  const { formProps, formValues, formResult, formLoading } = useForm({
    form,
    async submit({ username, email }) {
      console.log('submit')
      await new Promise(r => setTimeout(r, 1000));
      console.log('fewfew')
      return 'ok';
    },
  });
  return <div>
    <p>submit: username {formValues.username} email {formValues.email}</p>
    <p>result: {formResult}</p>
    <p>formLoading: {formLoading && <Spin />}</p>
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

  </div>
});
