import React from 'react';
import { useModal } from '../../packages/sunflower-antd-modal/src';
import { Modal, Input, Button, Form, message } from 'antd';


export default Form.create()(props => {
  const { form } = props;
  const { modalProps, show, close } = useModal({
    defaultVisible: false,
  });
  const onSubmit = () => {
    form.validateFields(async(err, values) => {
      if (!err) {
        await new Promise(r => setTimeout(r, 1000));
        form.resetFields();
        message.success('提交成功');
        close();
      }
    });
  }
  return (
    <div>
      <Modal
        {...modalProps}
        title="useModal"
        okText="submit"
        onOk={onSubmit}
        width={600}
      >
        <Form layout="inline">
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
        </Form>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  )
});
