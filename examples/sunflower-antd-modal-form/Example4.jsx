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
    form: formInstance,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    async submit({username, email}) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  return (
    <div>
      <Modal
        {...modalProps}
        title="useModalForm"
        okText="submit"
        width={740}
      >
        <Spin spinning={formLoading}>
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
              <Button onClick={() => formInstance.resetFileds()}>
                Reset
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  )
});
