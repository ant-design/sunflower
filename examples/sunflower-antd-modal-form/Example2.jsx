import React from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin } from 'antd';


export default Form.create()(props => {
  const { form } = props;
  const { 
    modalProps,
    formProps, 
    show, 
    formLoading,
    defaultFormValuesLoading,
    initialValues,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    form,
    async submit({username, email}) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', `username:${username}, email:${email}`);
      return 'ok';
    },
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 3000));
      return {
        username: 'lily',
      }
    },
  });
  return (
    <div>
      <Modal
        {...modalProps}
        title="useModalForm"
        okText="submit"
        width={600}
      >
        <Spin spinning={formLoading || defaultFormValuesLoading}>
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
                form.getFieldDecorator('email', {
                  initialValue: initialValues.email
                })(
                  <Input placeholder="Email" />
                )
              } 
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  )
});
