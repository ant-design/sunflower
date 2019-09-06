import React from 'react';
import { useForm } from 'sunflower-antd';
import { Input, Button, Form } from 'antd';


export default Form.create()(props => {
  const { form } = props;
  const { initialValues, formProps } = useForm({
    form,
    async submit({ username, email }) {
      console.log('submit')
      await new Promise(r => setTimeout(r, 1000));
      console.log('fewfew')
      return 'ok';
    },
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 3000));
      return {
        username: 'lily',
      }
    }
  });
  return <div>
    <Form layout="inline" {...formProps}>
      <Form.Item label="Username">
        {
          form.getFieldDecorator('username', {
            initialValue: initialValues.username
          })(
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
